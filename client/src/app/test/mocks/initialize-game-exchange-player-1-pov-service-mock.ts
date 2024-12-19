export const mockExchangePlayer1PovService = () =>
    jasmine.createSpyObj(
        'ExchangeServicePlayer1POV',
        [
            'configureSocket',
            'acceptPlayer',
            'rejectOtherPlayer',
            'navigateToWaitingRoom',
            'navigateToGamePage',
            'createGame',
            'cancelGame',
            'closeErrorOverlay',
        ],
        {
            gameHasBeenCreated: false,
        },
    );
