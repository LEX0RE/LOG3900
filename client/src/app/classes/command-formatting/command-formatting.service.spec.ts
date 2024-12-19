/* eslint-disable dot-notation -- Méthode privée */
import { CommandFormattingService } from '@app/classes/command-formatting/command-formatting.service';

describe('CommandFormattingServiceService', () => {
    it('isAlpha should return true for alpha character and star', () => {
        expect(CommandFormattingService.isAlpha('a')).toBeTrue();
        expect(CommandFormattingService.isAlpha('g')).toBeTrue();
        expect(CommandFormattingService.isAlpha('z')).toBeTrue();
        expect(CommandFormattingService.isAlpha('*')).toBeTrue();
    });

    it('isAlpha should return false for non alpha character and star', () => {
        expect(CommandFormattingService.isAlpha('6')).toBeFalse();
        expect(CommandFormattingService.isAlpha('')).toBeFalse();
    });

    it('tidyAccent should return letter without accent', () => {
        expect(CommandFormattingService.tidyAccent('É')).toEqual('E');
        expect(CommandFormattingService.tidyAccent('ö')).toEqual('o');
        expect(CommandFormattingService.tidyAccent('o')).toEqual('o');
        expect(CommandFormattingService.tidyAccent('àllÔ')).toEqual('allO');
        expect(CommandFormattingService.tidyAccent('β')).toEqual('β');
        expect(CommandFormattingService.tidyAccent('')).toEqual('');
    });

    it('lowercaseLetterTidyAccent should return lower case letter without accent', () => {
        expect(CommandFormattingService['lowercaseLetterTidyAccent']('é')).toEqual('e');
        expect(CommandFormattingService['lowercaseLetterTidyAccent']('û')).toEqual('u');
        expect(CommandFormattingService['lowercaseLetterTidyAccent']('À')).toEqual('À');
        expect(CommandFormattingService['lowercaseLetterTidyAccent']('β')).toEqual('β');
        expect(CommandFormattingService['lowercaseLetterTidyAccent']('bÖnjôùr')).toEqual('bÖnjour');
    });

    it('lowercaseLetterTidyAccent should return lower case letter without accent', () => {
        expect(CommandFormattingService['capitalLetterTidyAccent']('É')).toEqual('E');
        expect(CommandFormattingService['capitalLetterTidyAccent']('Û')).toEqual('U');
        expect(CommandFormattingService['capitalLetterTidyAccent']('à')).toEqual('à');
        expect(CommandFormattingService['capitalLetterTidyAccent']('β')).toEqual('β');
        expect(CommandFormattingService['capitalLetterTidyAccent']('bÖnjôùr')).toEqual('bOnjôùr');
    });

    it('isCharacterValidForEasel should return true', () => {
        expect(CommandFormattingService.isCharacterValidForEasel('a')).toBeTrue();
        expect(CommandFormattingService.isCharacterValidForEasel('h')).toBeTrue();
        expect(CommandFormattingService.isCharacterValidForEasel('z')).toBeTrue();
        expect(CommandFormattingService.isCharacterValidForEasel('*')).toBeTrue();
    });

    it('isCharacterValidForEasel should return false', () => {
        expect(CommandFormattingService.isCharacterValidForEasel('A')).toBeFalse();
        expect(CommandFormattingService.isCharacterValidForEasel('H')).toBeFalse();
        expect(CommandFormattingService.isCharacterValidForEasel('Z')).toBeFalse();
        expect(CommandFormattingService.isCharacterValidForEasel('4')).toBeFalse();
        expect(CommandFormattingService.isCharacterValidForEasel('')).toBeFalse();
    });

    it('isABlank should return true', () => {
        expect(CommandFormattingService.isABlank('A')).toBeTrue();
        expect(CommandFormattingService.isABlank('J')).toBeTrue();
        expect(CommandFormattingService.isABlank('Z')).toBeTrue();
    });

    it('isABlank should return false', () => {
        expect(CommandFormattingService.isABlank('a')).toBeFalse();
        expect(CommandFormattingService.isABlank('b')).toBeFalse();
        expect(CommandFormattingService.isABlank('z')).toBeFalse();
        expect(CommandFormattingService.isABlank('')).toBeFalse();
    });
});
