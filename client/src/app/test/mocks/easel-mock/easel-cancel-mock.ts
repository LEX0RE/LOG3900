export const mockEaselCancel = () =>
    jasmine.createSpyObj('EaselCancel', ['cancelManipulationSelection', 'cancelTradeSelection', 'cancelHiddenSelection'], {
        viewLetters: [],
    });
