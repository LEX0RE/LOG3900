import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BlankLetter } from '@app/classes/blank-letter/blank-letter';
import { ViewLetter } from '@app/classes/view-letter';
import { BOX_BY_ROW_WITH_NUMBER, DEFAULT_SIZE } from '@app/constants/grid';
import { BACKSPACE, ENTER, ESCAPE2 } from '@app/constants/keyboard';
import { EaselSelectionType } from '@app/enum/easel-selection-type';
import { PlacementStep } from '@app/enum/placements';
import { Vector2D } from '@app/interface/vector-2d';
import { EaselSelectionService } from '@app/services/easel/view/easel-selection.service';
import { GridContextService } from '@app/services/grid-context/grid-context.service';
import { GridMouseEventLogic } from '@app/services/grid-mouse-event/logic/grid-mouse-event-logic.service';
import { GridMouseEventView } from '@app/services/grid-mouse-event/view/grid-mouse-event-view.service';
import { mockEaselSelectionService } from '@app/test/mocks/easel-mock/easel-selection-service-mock';
import { gridContextStub } from '@app/test/mocks/grid-context-stub';
import { mockGridMouseEventView } from '@app/test/mocks/grid-mouse-event-mock';
import { ROUTING_TESTING_MODULE } from '@client/src/app/modules/app-routing.module';
import { DO_NOTHING } from '@client/src/app/test/constants/do-nothing-function';
import { MOCK_TRANSLATION_MODULE } from '@client/src/app/test/mocks/translation-module';
import { ALPHABET_BOARD } from '@common/constants/alphabet';
import { BLANK } from '@common/constants/blank';
import { Orientation } from '@common/enums/orientation';
import { Coordinate } from '@common/interfaces/coordinate';

describe('GridMouseEventLogic', () => {
    let service: GridMouseEventLogic;
    let coordinate: Vector2D;
    let letterA: ViewLetter;
    let letterBlank: ViewLetter;
    let letterBUpperCase: ViewLetter;
    let view: jasmine.SpyObj<GridMouseEventView>;
    let easelService: jasmine.SpyObj<EaselSelectionService>;
    let grid: jasmine.SpyObj<GridContextService>;
    const aLetter = 'a';

    beforeEach(() => {
        view = mockGridMouseEventView();
        easelService = mockEaselSelectionService();
        grid = gridContextStub();
        TestBed.configureTestingModule({
            imports: [ROUTING_TESTING_MODULE(), MOCK_TRANSLATION_MODULE(), HttpClientTestingModule],
            providers: [
                { provide: GridMouseEventView, useValue: view },
                { provide: EaselSelectionService, useValue: easelService },
                { provide: GridContextService, useValue: grid },
            ],
        });
        service = TestBed.inject(GridMouseEventLogic);
        grid.placement.step = PlacementStep.NoClick;
        coordinate = { x: DEFAULT_SIZE, y: DEFAULT_SIZE };
        letterA = new ViewLetter({ letter: aLetter, point: 2 }, EaselSelectionType.Unselected);
        letterBlank = new ViewLetter({ letter: BLANK, point: 0 }, EaselSelectionType.Unselected);
        letterBUpperCase = new ViewLetter(new BlankLetter(aLetter), EaselSelectionType.Unselected);
        grid.placement.letters = [letterA, letterA, letterA, letterA];
        easelService.viewLetters = [letterA, letterA, letterA, letterBlank, letterBlank];
        grid.placement.initialPlacement = { x: 1, y: 1 };
        grid.saveLetterSquare = [{ position: { x: 7, y: 7 }, letter: { letter: aLetter, point: 0 } }];
        view.createPlacement.and.callFake((pos: Vector2D) => {
            grid.placement.initialPlacement = pos;
        });
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('PlacementStep should change to ClickPlacement if it is NoCLick or ClickPlacement and coordinateCLick is good', () => {
        const expectedStep = PlacementStep.ClickPlacement;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Spy sur méthode privée
        spyOn(service, 'checkPlacement' as any).and.callFake(DO_NOTHING);

        service.mouseClick(coordinate);
        expect(grid.placement.step).toEqual(expectedStep);
        expect(view.createPlacement).toHaveBeenCalled();
    });

    it('orientation should not change when there is letter placed', () => {
        service.mouseClick(coordinate);
        grid.samePosition.and.returnValue(true);
        service.mouseClick(coordinate);
        expect(grid.placement.orientation).toEqual(Orientation.Horizontal);
    });

    it('orientation should change to horizontal if we click three time in the same position', () => {
        grid.saveLetterSquare = [];
        service.mouseClick(coordinate);
        grid.samePosition.and.returnValue(true);
        service.mouseClick(coordinate);
        expect(grid.placement.orientation).toEqual(Orientation.Vertical);
        service.mouseClick(coordinate);
        expect(grid.placement.orientation).toEqual(Orientation.Horizontal);
    });

    it('initialPlacement should not change if the step is KeyboardPlacement', () => {
        const expectedCoordinate: Vector2D = { x: 1, y: 1 };

        grid.placement.step = PlacementStep.KeyboardPlacement;
        service.mouseClick(coordinate);
        expect(grid.placement.initialPlacement).toEqual(expectedCoordinate);
    });

    it('keyboardClick should call update if step placement is keyboardPlacement or ClickPlacement ', () => {
        const param = 'test';

        grid.placement.step = PlacementStep.KeyboardPlacement;
        service.keyboardClick(param);
        expect(view.updateView).toHaveBeenCalled();
    });

    it('keyboardClick should not call update if step placement is NoClick ', () => {
        const param = 'test';

        grid.placement.step = PlacementStep.NoClick;
        service.keyboardClick(param);
        expect(view.updateView).not.toHaveBeenCalled();
    });

    it('keyboardClick should remove one letter from Placement and saveLetterSquare if BackSpace is clicked ', () => {
        const expectedLetters = grid.placement.letters;
        const expectedSaveLettersSquare = grid.saveLetterSquare;

        expectedLetters.pop();
        expectedSaveLettersSquare.pop();
        grid.placement.step = PlacementStep.KeyboardPlacement;
        service.keyboardClick(BACKSPACE);
        expect(expectedLetters).toEqual(grid.placement.letters);
        expect(expectedSaveLettersSquare).toEqual(grid.saveLetterSquare);
    });

    it('keyboardClick should not remove  letter from saveLetterSquare if BackSpace is clicked and there is no placement', () => {
        grid.placement.letters = [];
        const expectedSaveLettersSquare = grid.saveLetterSquare;

        grid.placement.step = PlacementStep.KeyboardPlacement;
        service.keyboardClick(BACKSPACE);
        expect(expectedSaveLettersSquare).toEqual(grid.saveLetterSquare);
    });

    it('keyboardClick should change step to ClickPlacement if BackSpace is clicked and placement has one letter', () => {
        grid.placement.letters = [letterA];
        grid.placement.step = PlacementStep.KeyboardPlacement;
        service.keyboardClick(BACKSPACE);
        expect(grid.placement.step).toEqual(PlacementStep.ClickPlacement);
    });

    it('keyboardClick should remove one letter from Placement if BackSpace is clicked ', () => {
        const expectedLetters = grid.placement.letters;

        expectedLetters.pop();
        grid.placement.step = PlacementStep.KeyboardPlacement;
        service.keyboardClick(BACKSPACE);
        expect(expectedLetters).toEqual(grid.placement.letters);
    });

    it('keyboardClick should remove one letter from Placement if BackSpace with blank is clicked ', () => {
        grid.placement.letters.push(new ViewLetter(new BlankLetter(aLetter), EaselSelectionType.Unselected));
        const expectedLetters = JSON.parse(JSON.stringify(grid.placement.letters));

        expectedLetters.pop();
        grid.placement.step = PlacementStep.KeyboardPlacement;
        service.keyboardClick(BACKSPACE);
        expect(expectedLetters).toEqual(JSON.parse(JSON.stringify(grid.placement.letters)));
    });

    it('keyboardClick should change step to NoClick and remove all letter from Placement if ESCAPE is clicked and placement has one letter', () => {
        grid.placement.step = PlacementStep.KeyboardPlacement;
        service.keyboardClick(ESCAPE2);
        expect(grid.placement.step).toEqual(PlacementStep.NoClick);
        expect(grid.placement.orientation).toEqual(Orientation.None);
        expect(grid.placement.letters).toEqual([]);
    });

    it('keyboardClick should call SendToServer  if Enter is clicked and placementStep is KeyboardPlacement', () => {
        const spy = spyOn(service, 'sendToServer').and.callThrough();

        grid.placement.letters = [letterA];
        grid.placement.step = PlacementStep.KeyboardPlacement;
        service.keyboardClick(ENTER);
        expect(spy).toHaveBeenCalled();
    });

    it('letters from placement should push new letter if letter is in the easel', () => {
        const expectedLetter = letterA;

        grid.placement.letters = [];
        easelService.isInEasel.and.returnValue(true);
        easelService.selectHiddenByString.and.returnValue(expectedLetter);

        grid.placement.step = PlacementStep.KeyboardPlacement;
        service.keyboardClick('a');
        expect(grid.placement.letters).toEqual([expectedLetter]);
    });

    it('letters from placement should not push new letter if letter is in the easel if undefined', () => {
        const expectedLetter = letterA;

        grid.placement.letters = [];
        easelService.isInEasel.and.returnValue(true);

        easelService.selectHiddenByString.and.returnValue(undefined);

        grid.placement.step = PlacementStep.KeyboardPlacement;
        service.keyboardClick(aLetter);
        expect(grid.placement.letters).not.toEqual([expectedLetter]);
    });

    it('letters from placement should push new letter with special symbol if letter is in the easel', () => {
        const expectedLetter = letterA;
        const keyBoardChar = 'à';

        grid.placement.letters = [];
        easelService.isInEasel.and.returnValue(true);
        easelService.selectHiddenByString.and.returnValue(expectedLetter);
        grid.placement.step = PlacementStep.KeyboardPlacement;
        service.keyboardClick(keyBoardChar);
        expect(grid.placement.letters).toEqual([expectedLetter]);
    });

    it('letters from placement should push new blankLetter if letter is in the easel and letter is upperCase', () => {
        grid.placement.letters = [];
        const keyBoardChar = 'A';
        const expectedLetter: ViewLetter = new ViewLetter(new BlankLetter(keyBoardChar), EaselSelectionType.Hidden);

        easelService.isInEasel.and.returnValue(true);
        easelService.selectHiddenByString.and.returnValue(expectedLetter);
        grid.placement.orientation = Orientation.Vertical;
        grid.placement.step = PlacementStep.KeyboardPlacement;
        service.keyboardClick(keyBoardChar);
        expect(grid.placement.letters).toEqual([expectedLetter]);
    });

    it('letters from placement should not push new blankLetter if letter is in the easel and new letter is undefined', () => {
        grid.placement.letters = [];
        const keyBoardChar = 'A';
        const expectedLetter: ViewLetter = new ViewLetter(new BlankLetter(keyBoardChar), EaselSelectionType.Hidden);

        easelService.isInEasel.and.returnValue(true);

        easelService.selectHiddenByString.and.returnValue(undefined);
        grid.placement.orientation = Orientation.Vertical;
        grid.placement.step = PlacementStep.KeyboardPlacement;
        service.keyboardClick(keyBoardChar);
        expect(grid.placement.letters).not.toEqual([expectedLetter]);
    });

    it('letters from placement should not push new blankLetter if letter is not in the easel and new letter is undefined', () => {
        const keyBoardChar = 'A';

        easelService.isInEasel.and.returnValue(false);
        grid.placement.orientation = Orientation.Vertical;
        grid.placement.step = PlacementStep.KeyboardPlacement;
        service.keyboardClick(keyBoardChar);
        expect(easelService.selectHiddenByString).not.toHaveBeenCalled();
    });

    it('letters from placement should not push new letter if letter is not in the easel', () => {
        const keyBoardChar = 'z';
        const expectedLetter: ViewLetter[] = [];

        grid.placement.letters = [];
        grid.placement.step = PlacementStep.KeyboardPlacement;
        service.keyboardClick(keyBoardChar);
        expect(grid.placement.letters).toEqual(expectedLetter);
    });

    it('SendToServer should call sendPlaceLetter from CommandConversionService if placement.step is KeyboardPlacement', () => {
        const coordinatePlacement: Coordinate = {
            row: ALPHABET_BOARD[grid.placement.initialPlacement.y - 1],
            column: grid.placement.initialPlacement.x,
        };
        const letterExpect = 'aaaa';

        grid.placement.step = PlacementStep.KeyboardPlacement;
        service.sendToServer();
        expect(grid.conversionService.sendPlaceLetter).toHaveBeenCalledWith(coordinatePlacement, grid.placement.orientation, letterExpect);
    });

    it('SendToServer should call sendPlaceLetter from CommandConversionService with upperCase letter if placement.step is KeyboardPlacement', () => {
        const coordinatePlacement: Coordinate = {
            row: ALPHABET_BOARD[grid.placement.initialPlacement.y - 1],
            column: grid.placement.initialPlacement.x,
        };
        const letterExpect = 'aaaaA';

        grid.placement.letters.push(letterBUpperCase);
        grid.placement.step = PlacementStep.KeyboardPlacement;
        service.sendToServer();
        expect(grid.conversionService.sendPlaceLetter).toHaveBeenCalledWith(coordinatePlacement, grid.placement.orientation, letterExpect);
    });

    it('SendToServer should not call sendPlaceLetter from CommandConversionService if placement.step is not KeyboardPlacement', () => {
        grid.placement.step = PlacementStep.ClickPlacement;
        service.sendToServer();
        expect(grid.conversionService.sendPlaceLetter).not.toHaveBeenCalled();
    });

    it('checkLetterInEasel should change errorWord if the letter is not in the easel and it is in the limit', () => {
        const offLimit = BOX_BY_ROW_WITH_NUMBER;
        const expectedError = '';

        grid.placement.orientation = Orientation.Vertical;
        grid.placement.initialPlacement.y = offLimit;
        easelService.isInEasel.and.returnValue(false);

        grid.placement.step = PlacementStep.KeyboardPlacement;
        service.keyboardClick('a');
        expect(easelService.errorWord).toEqual(expectedError);
    });

    it('checkLetterInEaselBlank should change errorWord if the letter is not in the easel and it is in the limit', () => {
        const offLimit = BOX_BY_ROW_WITH_NUMBER;
        const expectedError = '';

        grid.placement.orientation = Orientation.Vertical;
        grid.placement.initialPlacement.y = offLimit;
        easelService.isInEasel.and.returnValue(false);

        grid.placement.step = PlacementStep.KeyboardPlacement;
        service.keyboardClick('A');
        expect(easelService.errorWord).toEqual(expectedError);
    });
});
