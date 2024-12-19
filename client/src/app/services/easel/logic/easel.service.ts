import { Injectable } from '@angular/core';
import { ViewLetter } from '@app/classes/view-letter';
import { INDEX_NOT_FOUND } from '@app/constants/array-manipulation';
import { EaselSelectionType } from '@app/enum/easel-selection-type';
import { GameUpdaterService } from '@app/services/game-updater/game-updater.service';
import { CommonLetter } from '@common/interfaces/game-view-related/common-letter';

@Injectable({
    providedIn: 'root',
})
export class EaselService {
    viewLetters: ViewLetter[];
    private logicOccurrences: Map<string, number>;
    private viewOccurrences: Map<string, number>;
    private readonly gameUpdate: GameUpdaterService;

    constructor(gameUpdate: GameUpdaterService) {
        this.viewLetters = [];
        this.logicOccurrences = new Map<string, number>();
        this.viewOccurrences = new Map<string, number>();
        this.gameUpdate = gameUpdate;
    }

    setLetters(viewLetters: ViewLetter[]): ViewLetter[] {
        this.viewLetters = viewLetters;
        if (!this.lettersAreStillValid()) this.updateLetters();
        return this.viewLetters;
    }

    private updateOccurrencesMap(): void {
        this.logicOccurrences = this.toOccurrencesMap(this.gameUpdate.easel.letters);
        this.viewOccurrences = this.toOccurrencesMap(ViewLetter.viewToCommon(this.viewLetters));
    }

    private updateLetters(): void {
        if (!this.viewLetters.length) this.viewLetters = ViewLetter.commonToView(JSON.parse(JSON.stringify(this.gameUpdate.easel.letters)));
        this.updateOccurrencesMap();
        const truthSource: CommonLetter[] = JSON.parse(JSON.stringify(this.gameUpdate.easel.letters));
        const newLetters = this.intersectionOfOccurrencesMap();

        this.viewLetters.reverse();
        this.viewLetters = this.reMapLetters(truthSource, newLetters).reverse();
    }

    private reMapLetters(truthSource: CommonLetter[], newLetters: CommonLetter[]): ViewLetter[] {
        return this.viewLetters
            .map((letter: ViewLetter) => {
                const index = truthSource.findIndex((letter2: CommonLetter) => letter.toCommonLetter.letter === letter2.letter);

                if (index === INDEX_NOT_FOUND) {
                    const newLetter = newLetters.pop();

                    // eslint-disable-next-line no-undefined -- necessaire pour lorsque l'on reduit le nombre de lettres
                    return newLetter ? new ViewLetter(newLetter, EaselSelectionType.Unselected) : undefined;
                }
                truthSource.splice(index, 1);
                return letter;
            })
            .filter((letter): letter is ViewLetter => !!letter);
    }

    private intersectionOfOccurrencesMap(): CommonLetter[] {
        const intersection: CommonLetter[] = [];

        this.gameUpdate.easel.letters.forEach((letter: CommonLetter) => {
            const logicOccurrences = this.logicOccurrences.get(letter.letter);
            const viewOccurrences = this.viewOccurrences.get(letter.letter);

            if (!logicOccurrences && viewOccurrences) this.intersectPush(intersection, letter, viewOccurrences);
            if (logicOccurrences && !viewOccurrences) this.intersectPush(intersection, letter, logicOccurrences);
            if (logicOccurrences && viewOccurrences) this.intersectPush(intersection, letter, logicOccurrences - viewOccurrences);
        });
        return intersection;
    }

    private intersectPush(letters: CommonLetter[], letter: CommonLetter, nOccurrences: number): void {
        for (let index = 0; index < nOccurrences; index++) {
            letters.push({ letter: letter.letter, point: letter.point });
        }
    }

    private lettersAreStillValid(): boolean {
        this.updateOccurrencesMap();
        return this.compareOccurrences();
    }

    private compareOccurrences(): boolean {
        let occurrenceMatches = true;

        if (this.gameUpdate.easel.letters.length < ViewLetter.viewToCommon(this.viewLetters).length) return false;
        this.gameUpdate.easel.letters.forEach((letter) => {
            if (this.isNotOccurrenceMatch(letter)) occurrenceMatches = false;
        });

        return occurrenceMatches;
    }

    private isNotOccurrenceMatch(letter: CommonLetter): boolean {
        const logicOccurrences = this.logicOccurrences.get(letter.letter);
        const viewOccurrences = this.viewOccurrences.get(letter.letter);

        if (!logicOccurrences || !viewOccurrences) return true;
        return logicOccurrences !== viewOccurrences;
    }

    private toOccurrencesMap(letters: CommonLetter[]): Map<string, number> {
        const occurrencesMap = new Map<string, number>();

        letters.forEach((letter: CommonLetter) => {
            let letterOccurrences = occurrencesMap.get(letter.letter);

            if (!letterOccurrences) letterOccurrences = 0;
            occurrencesMap.set(letter.letter, letterOccurrences + 1);
        });
        return occurrencesMap;
    }
}
