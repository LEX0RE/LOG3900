export const mockEaselSelectionLogic = () =>
    jasmine.createSpyObj('EaselSelectionLogic', [
        'toggleTradeSelection',
        'setManipulationSelection',
        'setHiddenSelection',
        'unselectHidden',
        'unselectedAllType',
    ]);
