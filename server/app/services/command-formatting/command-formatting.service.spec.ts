/* eslint-disable dot-notation -- Méthode privée */
import { BlankLettersFactory } from '@app/classes/letters/blank-factory/blank-factory';
import { Letter } from '@app/classes/letters/letter/letter';
import { LettersFactory } from '@app/classes/letters/letterFactory/letter-factory';
import { SPACE } from '@app/constants/command-formatting';
import { ZERO_POINT } from '@app/constants/default/default-letter';
import { CommandFormattingService } from '@app/services/command-formatting/command-formatting.service';
import { doNothing } from '@app/test/do-nothing-function';
import { BLANK } from '@common/constants/blank';
import { ActionType } from '@common/enums/action-type';
import { Orientation } from '@common/enums/orientation';
import { assert, expect } from 'chai';
import * as sinon from 'sinon';

describe('CommandFormatting', () => {
    let commandFormatting: CommandFormattingService;

    beforeEach(() => {
        commandFormatting = new CommandFormattingService();
    });

    afterEach(() => {
        sinon.restore();
    });

    it('formatOrientation should call isValidWithoutOrientation if orientation is not h or v', () => {
        const orientation = '1';
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Méthode privée
        const mockValidWithoutOrientation = sinon.stub(commandFormatting, 'isValidWithoutOrientation' as any).callsFake(() => true);

        commandFormatting['formatOrientation'](orientation, 1);
        sinon.assert.called(mockValidWithoutOrientation);
    });

    it('formatOrientation should format the orientation for valid orientation', () => {
        const orientation1 = 'h';
        const orientation2 = 'v';
        const orientation3 = 'f';
        const orientation4 = '3r3';
        const nbLetters1 = 1;
        const nbLetters2 = 2;

        expect(commandFormatting['formatOrientation'](orientation1, nbLetters2)).to.equal(Orientation.Horizontal);
        expect(commandFormatting['formatOrientation'](orientation2, nbLetters2)).to.equal(Orientation.Vertical);
        expect(commandFormatting['formatOrientation'](orientation3, nbLetters1)).to.equal(Orientation.None);
        expect(commandFormatting['formatOrientation'](orientation4, nbLetters1)).to.equal(Orientation.None);
        expect(commandFormatting['formatOrientation']('', nbLetters1)).to.equal(Orientation.None);
    });

    it('formatOrientation should throw error for invalid orientation and placement of 0 or more than 1 letter', () => {
        const nbLetters1 = 0;
        const nbLetters2 = 2;
        const orientation1 = 'hv';
        const orientation2 = '1';
        const orientation3 = 'a';

        assert.throws(() => commandFormatting['formatOrientation'](orientation1, nbLetters2), Error);
        assert.throws(() => commandFormatting['formatOrientation'](orientation2, nbLetters2), Error);
        assert.throws(() => commandFormatting['formatOrientation'](orientation3, nbLetters2), Error);
        assert.throws(() => commandFormatting['formatOrientation']('', nbLetters2), Error);
        assert.throws(() => commandFormatting['formatOrientation'](orientation2, nbLetters1), Error);
    });

    it('formatLetters should call tidyAccent, isCharacterALetter and toLetterType for alphabetical strings', () => {
        const stringToTest = 'allo';
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Méthode privée
        const mockTidyAccent = sinon.stub(commandFormatting, 'tidyAccent' as any).callsFake(() => stringToTest);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Méthode privée
        const mockLetter = sinon.stub(commandFormatting, 'isCharacterALetterValidToTrade' as any).callsFake(() => true);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Méthode privée
        const mockConvert = sinon.stub(commandFormatting, 'toLetterType' as any).callsFake(doNothing);

        commandFormatting['formatLetters'](stringToTest, ActionType.PlaceLetters);

        sinon.assert.called(mockTidyAccent);
        sinon.assert.called(mockLetter);
        sinon.assert.called(mockConvert);
    });

    it('formatLetters should return array of Letter for alphabetical strings', () => {
        const stringToTest = 'àllo';
        const letter1 = 'a';
        const letter2 = 'l';
        const letter3 = 'o';

        const letters = commandFormatting['formatLetters'](stringToTest, ActionType.PlaceLetters);
        const expectedSize = 4;

        expect(letters[0].letter).to.equal(letter1);
        expect(letters[1].letter).to.equal(letter2);
        expect(letters[2].letter).to.equal(letter2);
        expect(letters[3].letter).to.equal(letter3);
        expect(letters.length).to.equal(expectedSize);

        expect(commandFormatting['formatLetters']('', ActionType.PlaceLetters).length).to.equal(0);
    });

    it('formatLetters should convert a placeletter message characters to the right array including a blank', () => {
        const word = 'mFh';
        const expected: Letter[] = [LettersFactory.m, BlankLettersFactory.f, LettersFactory.h];

        expect(commandFormatting['formatLetters'](word, ActionType.PlaceLetters)).to.be.eql(expected);
    });

    it('formatLetters should throw error', () => {
        let stringToTest = 'hello w';

        assert.throws(() => {
            commandFormatting['formatLetters'](stringToTest, ActionType.PlaceLetters);
        }, Error);

        stringToTest = 'helloworld';
        assert.throws(() => {
            commandFormatting['formatLetters'](stringToTest, ActionType.PlaceLetters);
        }, Error);
    });

    it('formatPlacement should format for valid placement', () => {
        const placement1 = 'a15';
        const placement2 = 'J8';
        const vector1 = { x: 14, y: 0 };
        const vector2 = { x: 7, y: 9 };

        expect(commandFormatting['formatPlacement'](placement1)).to.eql(vector1);
        expect(commandFormatting['formatPlacement'](placement2)).to.eql(vector2);
    });

    it('formatPlacement should throw error for invalid placement', () => {
        const placement1 = '13a';
        const placement2 = 'H123';
        const placement3 = 'a1a';

        assert.throws(() => commandFormatting['formatPlacement'](placement1), Error);
        assert.throws(() => commandFormatting['formatPlacement'](placement2), Error);
        assert.throws(() => commandFormatting['formatPlacement'](placement3), Error);
        assert.throws(() => commandFormatting['formatPlacement'](''), Error);
    });

    it('isCharacterALetterValidToTrade should handle letters', () => {
        const lower = 'D';
        const upper = 'd';

        expect(commandFormatting['isCharacterALetterValidToTrade'](lower)).to.equal(false);
        expect(commandFormatting['isCharacterALetterValidToTrade'](upper)).to.equal(true);
    });

    it('isCharacterALetterValidToTrade should return false for other characters', () => {
        const other1 = 'Ë';
        const other2 = 'β';
        const other3 = '.';

        expect(commandFormatting['isCharacterALetterValidToTrade'](other1)).to.equal(false);
        expect(commandFormatting['isCharacterALetterValidToTrade'](other2)).to.equal(false);
        expect(commandFormatting['isCharacterALetterValidToTrade'](other3)).to.equal(false);
        expect(commandFormatting['isCharacterALetterValidToTrade'](SPACE)).to.equal(false);
        expect(commandFormatting['isCharacterALetterValidToTrade']('')).to.equal(false);
        expect(commandFormatting['isCharacterALetterValidToTrade'](BLANK)).to.equal(true);
    });

    it('isABlank should hanlde blanks', () => {
        const lower = 'D';
        const upper = 'd';

        expect(commandFormatting['isABlank'](lower)).to.equal(true);
        expect(commandFormatting['isABlank'](upper)).to.equal(false);
        expect(commandFormatting['isABlank'](BLANK)).to.equal(false);
    });
    it('toLetterType should return a Letter for lowercase letters', () => {
        const upper = 'd';
        const letter = commandFormatting['toLetterType'](upper);

        expect(letter.letter).to.equal(upper);
        expect(letter.point).to.equal(2);
    });

    it('toLetterType should return a Letter for blank letters', () => {
        const letter = commandFormatting['toLetterType'](BLANK);

        expect(letter.letter).to.equal(BLANK);
        expect(letter.point).to.equal(0);
    });

    it('toLetterType should not convert other characters', () => {
        const other2 = 'β';

        expect(commandFormatting['toLetterType'](other2)).to.equal(undefined);
        expect(commandFormatting['toLetterType'](SPACE)).to.equal(undefined);
        expect(commandFormatting['toLetterType']('')).to.equal(undefined);
    });

    it('toBlankType should return a blank letter', () => {
        const letterToBlank = 'A';

        const blankLetter = commandFormatting['toBlankType'](letterToBlank);

        expect(blankLetter.letter).to.equal(letterToBlank);
        expect(blankLetter.point).to.equal(ZERO_POINT);
    });

    it('toBlankType should not return a valid blank letter if the letter to blank is not a valid letter', () => {
        const blankLetter = commandFormatting['toBlankType'](BLANK);

        expect(blankLetter).to.equal(undefined);
    });

    it('isRow should return if row is in board limits', () => {
        const row1 = '0';
        const row2 = 'A';
        const row3 = 'o';
        const row4 = 'P';
        const row5 = 'AB';
        const row6 = 'à';

        expect(commandFormatting['isRow'](row1)).to.equal(false);
        expect(commandFormatting['isRow'](row2)).to.equal(true);
        expect(commandFormatting['isRow'](row3)).to.equal(true);
        expect(commandFormatting['isRow'](row4)).to.equal(false);
        expect(commandFormatting['isRow'](row5)).to.equal(false);
        expect(commandFormatting['isRow'](row6)).to.equal(false);
        expect(commandFormatting['isRow']('')).to.equal(false);
    });

    it('isColumn should return if column is in board limits', () => {
        const column1 = '0';
        const column2 = 'a5';
        const column3 = '5a';
        const column4 = '1';
        const column5 = '15';

        expect(commandFormatting['isColumn'](column1)).to.equal(false);
        expect(commandFormatting['isColumn'](column2)).to.equal(false);
        expect(commandFormatting['isColumn'](column3)).to.equal(false);
        expect(commandFormatting['isColumn']('')).to.equal(false);
        expect(commandFormatting['isColumn'](column4)).to.equal(true);
        expect(commandFormatting['isColumn'](column5)).to.equal(true);
    });

    it('isValidWithoutOrientation should return true if orientation is not h or v and nbLetters is 1', () => {
        const nbLetters = 1;
        const placement1 = '4';
        const placement2 = 'y';
        const placement3 = 'd9f3';

        expect(commandFormatting['isValidWithoutOrientation'](placement1, nbLetters)).to.equal(true);
        expect(commandFormatting['isValidWithoutOrientation'](placement2, nbLetters)).to.equal(true);
        expect(commandFormatting['isValidWithoutOrientation'](placement3, nbLetters)).to.equal(true);
    });

    it('isValidWithoutOrientation should return false if orientation is h or v or nbLetters is not 1', () => {
        const placement1 = 'h';
        const placement2 = 'v';
        const placement3 = '3fg5';
        const nbLetters1 = 1;
        const nbLetters2 = 2;

        expect(commandFormatting['isValidWithoutOrientation'](placement1, nbLetters1)).to.equal(false);
        expect(commandFormatting['isValidWithoutOrientation'](placement2, nbLetters1)).to.equal(false);
        expect(commandFormatting['isValidWithoutOrientation'](placement1, nbLetters2)).to.equal(false);
        expect(commandFormatting['isValidWithoutOrientation'](placement2, nbLetters2)).to.equal(false);
        expect(commandFormatting['isValidWithoutOrientation'](placement3, nbLetters2)).to.equal(false);
    });

    it('tidyAccent should return letter without accent', () => {
        const unformatedLetter1 = 'É';
        const unformatedLetter2 = 'ö';
        const unformatedWord = 'àllÔ';
        const formatedLetter1 = 'E';
        const formatedLetter2 = 'o';
        const formatedLetter3 = 'β';
        const formatedWord = 'allO';

        expect(commandFormatting['tidyAccent'](unformatedLetter1)).to.equal(formatedLetter1);
        expect(commandFormatting['tidyAccent'](unformatedLetter2)).to.equal(formatedLetter2);
        expect(commandFormatting['tidyAccent'](formatedLetter2)).to.equal(formatedLetter2);
        expect(commandFormatting['tidyAccent'](unformatedWord)).to.equal(formatedWord);
        expect(commandFormatting['tidyAccent'](formatedLetter3)).to.equal(formatedLetter3);
        expect(commandFormatting['tidyAccent']('')).to.equal('');
    });

    it('lowercaseLetterTidyAccent should return lower case letter without accent', () => {
        const unformatedLetter1 = 'é';
        const unformatedLetter2 = 'û';
        const formatedLetter1 = 'e';
        const formatedLetter2 = 'u';
        const formatedLetter3 = 'À';
        const formatedLetter4 = 'β';
        const unformatedWord = 'bÖnjôùr';
        const formatedWord = 'bÖnjour';

        expect(commandFormatting['lowercaseLetterTidyAccent'](unformatedLetter1)).to.equal(formatedLetter1);
        expect(commandFormatting['lowercaseLetterTidyAccent'](unformatedLetter2)).to.equal(formatedLetter2);
        expect(commandFormatting['lowercaseLetterTidyAccent'](formatedLetter3)).to.equal(formatedLetter3);
        expect(commandFormatting['lowercaseLetterTidyAccent'](formatedLetter4)).to.equal(formatedLetter4);
        expect(commandFormatting['lowercaseLetterTidyAccent'](unformatedWord)).to.equal(formatedWord);
    });

    it('lowercaseLetterTidyAccent should return lower case letter without accent', () => {
        const unformatedLetter1 = 'É';
        const unformatedLetter2 = 'Û';
        const formatedLetter1 = 'E';
        const formatedLetter2 = 'U';
        const formatedLetter3 = 'à';
        const formatedLetter4 = 'β';
        const unformatedWord = 'bÖnjôùr';
        const formatedWord = 'bOnjôùr';

        expect(commandFormatting['capitalLetterTidyAccent'](unformatedLetter1)).to.equal(formatedLetter1);
        expect(commandFormatting['capitalLetterTidyAccent'](unformatedLetter2)).to.equal(formatedLetter2);
        expect(commandFormatting['capitalLetterTidyAccent'](formatedLetter3)).to.equal(formatedLetter3);
        expect(commandFormatting['capitalLetterTidyAccent'](formatedLetter4)).to.equal(formatedLetter4);
        expect(commandFormatting['capitalLetterTidyAccent'](unformatedWord)).to.equal(formatedWord);
    });
});
