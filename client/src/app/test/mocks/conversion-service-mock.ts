export const mockCommandConversionService = () =>
    jasmine.createSpyObj('CommandConversionService', ['sendPlaceLetter', 'sendTradeLetter', 'sendSkipTurn']);
