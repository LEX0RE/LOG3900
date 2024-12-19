import { PlaceLetters } from '@app/classes/actions/place-letters/places-letter';
import { BoardHelper } from '@app/classes/board-helper/board-helper';
import { Board } from '@app/classes/board/board';
import { Dictionary } from '@app/classes/dictionary/dictionary';
import { Gaddag } from '@app/classes/gaddag/gaddag';
import { GaddagNode } from '@app/classes/gaddag/gaddag-node/gaddag-node';
import { Game } from '@app/classes/game/game';
import { Letter } from '@app/classes/letters/letter/letter';
import { LettersFactory } from '@app/classes/letters/letterFactory/letter-factory';
import { WordsFindValidators } from '@app/classes/words-find/words-find-validators/words-find-validators';
import { SPACE } from '@app/constants/command-formatting';
import { MIDDLE_POSITION } from '@app/constants/game';
import { Anchor, LetterOrientation } from '@app/interface/anchor';
import { RulesVisitorResponse } from '@app/interface/rules-visitor-response-interface';
import { Vector2D } from '@app/interface/vector-2d-interface';
import { ArcWay, PlacingContext } from '@app/interface/words-find';
import { VisibilityManagerPublicNoPass } from '@app/services/lobby/visibility-manager/public-no-password/public-no-password-manager.service';
import { stubBoard } from '@app/test/classes-stubs/board-stub';
import { stubPlayer1, stubPlayer2 } from '@app/test/classes-stubs/player-stub';
import { FAKE_CLIENT_DICTIONARY } from '@app/test/constants/fake-dictionary';
import { FAKE_COMMON_TIMER, FAKE_GAME_ID } from '@app/test/constants/fake-game';
import { FAKE_NODES } from '@app/test/constants/gaddag';
import { BOARD_SIZE } from '@common/constants/board';
import { CLASSIC } from '@common/constants/game-modes';
import { Orientation } from '@common/enums/orientation';
import { CommonGameConfig } from '@common/interfaces/common-game-config';

export const WORDS_FIND_BOARD_SCENARIO = new Board();

const FAKE_POSITIONS: Vector2D[] = [
    { x: 4, y: 8 }, // a
    { x: 5, y: 8 }, // l
    { x: 6, y: 8 }, // l
    { x: 7, y: 7 }, // b
    { x: 7, y: 8 }, // a
    { x: 7, y: 9 }, // l
    { x: 7, y: 10 }, // l
    { x: 7, y: 11 }, // o
    { x: 7, y: 12 }, // n
    { x: 8, y: 7 }, // o
    { x: 8, y: 9 }, // u
    { x: 9, y: 7 }, // n
    { x: 9, y: 9 }, // e
    { x: 10, y: 7 }, // j
    { x: 10, y: 8 }, // u
    { x: 10, y: 9 }, // s
    { x: 10, y: 10 }, // t
    { x: 10, y: 11 }, // e
    { x: 11, y: 7 }, // o
    { x: 12, y: 7 }, // u
    { x: 13, y: 7 }, // r
    { x: 13, y: 8 }, // u
    { x: 13, y: 9 }, // e
    { x: 14, y: 9 }, // t
];
const FAKE_LETTERS: Letter[] = [
    LettersFactory.a,
    LettersFactory.l,
    LettersFactory.l,
    LettersFactory.b,
    LettersFactory.a,
    LettersFactory.l,
    LettersFactory.l,
    LettersFactory.o,
    LettersFactory.n,
    LettersFactory.o,
    LettersFactory.u,
    LettersFactory.n,
    LettersFactory.e,
    LettersFactory.j,
    LettersFactory.u,
    LettersFactory.s,
    LettersFactory.t,
    LettersFactory.e,
    LettersFactory.o,
    LettersFactory.u,
    LettersFactory.r,
    LettersFactory.u,
    LettersFactory.e,
    LettersFactory.t,
];

FAKE_POSITIONS.forEach((pos, index) => {
    WORDS_FIND_BOARD_SCENARIO.tiles[pos.x][pos.y].letter = FAKE_LETTERS[index];
});

export const UNSORTED_FAKE_HINTS = [
    { action: new PlaceLetters([LettersFactory.l, LettersFactory.a], MIDDLE_POSITION, Orientation.Horizontal), score: 2 },
    { action: new PlaceLetters([LettersFactory.d, LettersFactory.e], MIDDLE_POSITION, Orientation.Vertical), score: 3 },
    {
        action: new PlaceLetters([LettersFactory.m, LettersFactory.o, LettersFactory.t, LettersFactory.s], MIDDLE_POSITION, Orientation.Vertical),
        score: 5,
    },
    { action: new PlaceLetters([LettersFactory.m, LettersFactory.o, LettersFactory.t], MIDDLE_POSITION, Orientation.Vertical), score: 4 },
];

export const SORTED_FAKE_HINTS = [
    {
        action: new PlaceLetters([LettersFactory.m, LettersFactory.o, LettersFactory.t, LettersFactory.s], MIDDLE_POSITION, Orientation.Vertical),
        score: 5,
    },
    { action: new PlaceLetters([LettersFactory.m, LettersFactory.o, LettersFactory.t], MIDDLE_POSITION, Orientation.Vertical), score: 4 },
    { action: new PlaceLetters([LettersFactory.d, LettersFactory.e], MIDDLE_POSITION, Orientation.Vertical), score: 3 },
    { action: new PlaceLetters([LettersFactory.l, LettersFactory.a], MIDDLE_POSITION, Orientation.Horizontal), score: 2 },
];

const FAKE_GAME_CONFIG: CommonGameConfig = {
    gameModeName: CLASSIC,
    dictionaryId: 1,
    turnTimer: FAKE_COMMON_TIMER(),
    dictionaryTitle: SPACE,
    gameId: '321',
    chatId: '123456',
};

export const FAKE_GAME = () => new Game(FAKE_GAME_ID, FAKE_GAME_CONFIG, [stubPlayer1(), stubPlayer2()], new VisibilityManagerPublicNoPass());
export const FAKE_BOARD_HELPER = new BoardHelper(new Board(), new Gaddag(new Int32Array()));
export const FAKE_WORDS_FIND_VALIDATORS = () => new WordsFindValidators(FAKE_BOARD_HELPER, FAKE_GAME(), {});

const NEW_BOARD_RESPONSE = new Board();

export const RULES_VISITOR_RESPONSE: RulesVisitorResponse = {
    score: 2,
    gameModification: [],
    newlyFormedWordAsTile: NEW_BOARD_RESPONSE.tiles,
    newBoard: NEW_BOARD_RESPONSE,
    placedPosition: [],
};

export const FAKE_RULE_RESPONSE_EMPTY = (): RulesVisitorResponse => {
    return {
        score: 0,
        gameModification: [],
        newlyFormedWordAsTile: [],
        newBoard: stubBoard(),
        placedPosition: [],
    };
};

export const FAKE_DICTIONARY = new Dictionary(FAKE_CLIENT_DICTIONARY(), FAKE_NODES());
export const ERROR_VISITOR_RESPONSE = new Error();
export const GADDAG_SIZE = 10;
export const FAKE_GADDAG = (): Gaddag => {
    return new Gaddag(new Int32Array(GADDAG_SIZE));
};
export const FAKE_GADDAG_NODE = new GaddagNode(FAKE_GADDAG());
export const FAKE_PLACING_CONTEXT = (): PlacingContext => {
    return { letter: 'a', word: 'allo', hand: 'abcdefg' };
};
export const FAKE_MUTABLE_PLACING_CONTEXT = (): PlacingContext => {
    return { letter: 'a', word: 'allo', hand: 'abcdefg' };
};
export const FAKE_ARC_WAY = (): ArcWay => {
    return { newNode: new GaddagNode(FAKE_GADDAG()), oldNode: new GaddagNode(FAKE_GADDAG()) };
};
export const NUMBER_OF_TILES = BOARD_SIZE * BOARD_SIZE;
export const FAKE_POSITION = 0;
export const FAKE_PLAYABLE_WORD = { word: 'a', hand: 'a' };
export const FAKE_EMPTY_PLAYABLE_WORD = { word: 'a', hand: '' };
export const FAKE_PLAYABLE_WORD_BLANK = { word: 'a', hand: '*a' };
export const FAKE_START_TIME = 1000;
export const FAKE_RESULT_LENGTH = 2;
export const FAKE_WORDS_FIND_STATE = { worksHorizontal: true, current: MIDDLE_POSITION, result: [] };
export const FAKE_A_LETTER_ORIENTATION: LetterOrientation = { letter: 'a', directions: [Orientation.Horizontal, Orientation.Vertical] };
export const FAKE_B_LETTER_ORIENTATION: LetterOrientation = { letter: 'b', directions: [Orientation.Horizontal] };
export const FAKE_C_LETTER_ORIENTATION: LetterOrientation = { letter: 'c', directions: [Orientation.Vertical] };
export const FAKE_D_LETTER_ORIENTATION: LetterOrientation = { letter: 'd', directions: [Orientation.Horizontal, Orientation.Vertical] };
export const FAKE_E_LETTER_ORIENTATION: LetterOrientation = { letter: 'e', directions: [Orientation.Vertical] };
export const FAKE_ANCHOR: Anchor = { position: MIDDLE_POSITION, possibilities: [FAKE_A_LETTER_ORIENTATION] };
export const FAKE_ANCHORS = [
    { position: MIDDLE_POSITION, possibilities: [{ letter: 'a', directions: [Orientation.Horizontal] }] },
    { position: { x: 7, y: 8 }, possibilities: [{ letter: 'b', directions: [Orientation.Vertical] }] },
];

export const INCREMENT_POS = 1;
export const INCREMENT_OF_TWO_POS = 2;
export const DECREMENT_POS = -1;
export const LETTER = 'a';
export const FIRST_LETTER = 'o';
export const SECOND_LETTER = 'U';
export const LOWER_CASE_WORD = 'ou';
export const REVERSED_LOWER_CASE_WORD = 'uo';
export const NO_LETTER = '';
export const EMPTY_STRING = '';
export const FAKE_WORD = 'mot';
export const FAKE_HAND = 'hand';
export const FOURTH_CALL = 3;
export const FIFTH_CALL = 4;
