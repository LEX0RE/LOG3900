export const mockExchangePlayer2PovService = () =>
    jasmine.createSpyObj(
        'ExchangePlayer2PovService',
        [
            'tryJoinGame',
            'configureSocket',
            'cancelJoiningGame',
            'getAvailableGames',
            'navigateToJoinGamePage',
            'navigateToGamePage',
            'navigateToWaitingRoom',
            'getHasBeenRejected',
            'closeRejectedOverlay',
        ],
        {
            hasBeenRejected: true,

            // eslint-disable-next-line no-undefined -- Pour les tests
            gameTryingToJoin: undefined,
            availableGames: [],
        },
    );
