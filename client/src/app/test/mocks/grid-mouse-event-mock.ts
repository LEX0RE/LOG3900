export const mockGridMouseEventLogic = () =>
    jasmine.createSpyObj('GridMouseEventLogic', ['mouseClick', 'keyboardClick', 'sendToServer', 'reset'], {
        viewLetters: [],
    });

export const mockGridMouseEventView = () =>
    jasmine.createSpyObj('GridMouseEventView', ['updateView', 'createPlacement'], {
        viewLetters: [],
    });
