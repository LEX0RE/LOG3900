// Code inspiré du code suivant : https://github.com/kmp3325/Scrabble/blob/master/src/Game/BestMoveMachine.java
// Référence : https://ericsink.com/downloads/faster-scrabble-gordon.pdf
import { BoardHelper } from '@app/classes/board-helper/board-helper';
import { Board } from '@app/classes/board/board';
import { Dictionary } from '@app/classes/dictionary/dictionary';
import { Easel } from '@app/classes/easel/easel';
import { GaddagNode } from '@app/classes/gaddag/gaddag-node/gaddag-node';
import { Game } from '@app/classes/game/game';
import { WordsFindValidators } from '@app/classes/words-find/words-find-validators/words-find-validators';
import { BREAK } from '@app/constants/dictionary';
import { INDEX_NOT_FOUND } from '@app/constants/miscellaneous';
import { TriState } from '@app/constants/tri-state';
import { Anchor } from '@app/interface/anchor';
import { EndSearching } from '@app/interface/end-searching';
import { Hint } from '@app/interface/hint';
import { ArcWay, PlacingContext, PlayableWord } from '@app/interface/words-find';
import { DictionaryService } from '@app/services/dictionary/dictionary.service';
import { FAKE_DICTIONARY_FULL } from '@app/test/constants/fake-dictionary';
import { BLANK } from '@common/constants/blank';
import { Container } from 'typedi';

export class WordsFind {
    private board!: Board;
    private dictionary!: Dictionary;
    private result!: Hint[];
    private startTime!: number;
    private boardHelper!: BoardHelper;
    private wordsFindValidators!: WordsFindValidators;
    private startPosition!: number;

    async fastActions(easel: Easel, game: Game, end: EndSearching = { found: INDEX_NOT_FOUND }): Promise<Hint[]> {
        this.startTime = Date.now();
        this.board = game.board;
        const dictionary = Container.get(DictionaryService).getDictionary(game.gameConfig.dictionaryId);

        this.dictionary = dictionary ? dictionary : FAKE_DICTIONARY_FULL();
        this.boardHelper = new BoardHelper(this.board, this.dictionary);
        this.wordsFindValidators = new WordsFindValidators(this.boardHelper, game, end);
        await this.generateAllMoves(easel.hand);

        return this.result.sort((hintA, hintB) => hintB.score - hintA.score);
    }

    private async generateAllMoves(hand: string): Promise<void> {
        this.result = [];
        this.boardHelper.workHorizontal = true;
        await this.testAnchor(hand);
        this.boardHelper.workHorizontal = false;
        await this.testAnchor(hand);
    }

    private async testAnchor(hand: string): Promise<void> {
        for (const currentAnchor of this.boardHelper.anchors) {
            if (await this.wordsFindValidators.endSearch(this.startTime, this.result.length)) return;
            this.boardHelper.current = currentAnchor.position;
            if (!(await this.placeBefore(currentAnchor, hand)) && !(await this.placeAfter(currentAnchor, hand))) {
                await this.generate(0, { word: '', hand }, this.dictionary.root);
            }
        }
    }

    private async placeBefore(anchor: Anchor, hand: string): Promise<TriState> {
        const word = this.boardHelper.wordAfter(anchor.position);

        if (!word.length) return TriState.FALSE;
        const playable = { word: '', hand };

        this.boardHelper.current = this.boardHelper.currentPosition(word.length);
        this.startPosition = -word.length;

        if (!this.dictionary.root.isContaining(word)) return TriState.OTHER;
        await this.generate(-word.length, playable, this.dictionary.root.getChild(word));
        return TriState.TRUE;
    }

    private async placeAfter(anchor: Anchor, hand: string): Promise<TriState> {
        const word = this.boardHelper.wordBefore(anchor.position);

        if (!word.length) return TriState.FALSE;
        const playable = { word: '', hand };

        this.boardHelper.current = this.boardHelper.currentPosition(-word.length);
        this.startPosition = word.length;

        if (!this.dictionary.root.isContaining(word + BREAK)) return TriState.OTHER;
        await this.generate(word.length, playable, this.dictionary.root.getChild(word + BREAK));
        return TriState.TRUE;
    }

    private filterAllowed(index: number, possibilities: string, arc: GaddagNode): string {
        let result = '';
        const anchorsPossibilities = this.boardHelper.getPositionPossibility(index);

        for (const letter of possibilities) {
            if (!result.includes(letter) && arc.isContaining(letter) && anchorsPossibilities.includes(letter)) result += letter;
        }

        return result;
    }

    private removeFirst(word: string, letter: string): string {
        let result = '';
        let firstFound = false;

        for (const character of word) {
            if (letter === character && !firstFound) firstFound = true;
            else result += character;
        }

        return result;
    }

    private async generate(index: number, playable: PlayableWord, arc: GaddagNode): Promise<void> {
        if (await this.wordsFindValidators.endSearch(this.startTime, this.result.length)) return;
        const letterAt = this.board.letterAt(this.boardHelper.currentPosition(index));

        if (letterAt && arc.isContaining(letterAt)) {
            const newContext = { word: playable.word, hand: playable.hand, letter: letterAt };

            await this.goOn(index, newContext, arc.makeWay(letterAt));
        } else if (playable.hand.length && !letterAt) {
            await this.generateHandleNormal(index, playable, arc);
            await this.generateHandleBlank(index, playable, arc);
        }
    }

    private async generateHandleNormal(index: number, playable: PlayableWord, arc: GaddagNode): Promise<void> {
        const filtered = this.filterAllowed(index, playable.hand, arc);

        for (const letter of filtered) {
            const newHand = this.removeFirst(playable.hand, letter);
            const placingContext = { letter, word: playable.word, hand: newHand };

            await this.goOn(index, placingContext, arc.makeWay(letter));
        }
    }

    private async generateHandleBlank(index: number, playable: PlayableWord, arc: GaddagNode): Promise<void> {
        const filtered = this.filterAllowed(index, arc.getPossibilities(), arc);

        if (playable.hand.includes(BLANK)) {
            for (const letter of filtered) {
                const newHand = this.removeFirst(playable.hand, BLANK);
                const blankLetter = letter.toUpperCase();
                const placingContext = { letter: blankLetter, word: playable.word, hand: newHand };

                await this.goOn(index, placingContext, arc.makeWay(letter));
            }
        }
    }

    private async goOn(index: number, placing: PlacingContext, way: ArcWay): Promise<void> {
        if (await this.wordsFindValidators.endSearch(this.startTime, this.result.length)) return;
        if (!this.board.letterAt(this.boardHelper.currentPosition(index)))
            placing.word = index <= 0 ? placing.letter + placing.word : placing.word + placing.letter;

        this.validate(index, placing, way);

        if (way.oldNode.index !== way.newNode.index) {
            if (index <= 0) await this.goOnLeft(index, placing, way);
            else await this.goOnRight(index, placing, way);
        }
    }

    private async goOnLeft(index: number, placing: PlacingContext, way: ArcWay): Promise<void> {
        if (this.boardHelper.hasRoom(index, true)) await this.generate(index - 1, placing, way.newNode);
        if (way.newNode.isContaining(BREAK) && !this.boardHelper.tileBefore(index) && this.boardHelper.hasRoom(0, false)) {
            this.startPosition = this.lastLetterAdded(index);
            await this.generate(1, placing, way.newNode.getChild(BREAK));
        }
    }

    private async goOnRight(index: number, placing: PlacingContext, way: ArcWay): Promise<void> {
        if (this.boardHelper.hasRoom(index, false)) await this.generate(index + 1, placing, way.newNode);
    }

    private async validate(index: number, placing: PlacingContext, way: ArcWay): Promise<void> {
        const testedTile: string = index <= 0 ? this.boardHelper.tileBefore(index) : this.boardHelper.tileAfter(index);

        if (way.oldNode.isEnd(placing.letter) && !testedTile) {
            const wordsFindState = { worksHorizontal: this.boardHelper.workHorizontal, current: this.boardHelper.current, result: this.result };
            const start = index <= 0 ? this.lastLetterAdded(index) : this.startPosition;

            await this.wordsFindValidators.tryPlacement(start, placing.word, wordsFindState);
        }
    }

    private lastLetterAdded(index: number): number {
        let newPosition = index;

        while (this.board.letterAt(this.boardHelper.currentPosition(newPosition))) newPosition++;
        return newPosition;
    }
}
