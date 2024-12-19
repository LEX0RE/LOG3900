import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ViewLetter } from '@app/classes/view-letter';
import { DEFAULT_SIZE, SPACE_BETWEEN_CASE } from '@app/constants/grid';
import { EaselSelectionType } from '@app/enum/easel-selection-type';
import { GridContextService } from '@app/services/grid-context/grid-context.service';
import { GridMouseEventView } from '@app/services/grid-mouse-event/view/grid-mouse-event-view.service';
import { CanvasTestHelper } from '@app/test/mocks/canvas/canvas-test-helper';
import { ROUTING_TESTING_MODULE } from '@client/src/app/modules/app-routing.module';
import { MOCK_TRANSLATION_MODULE } from '@client/src/app/test/mocks/translation-module';
import { Orientation } from '@common/enums/orientation';

describe('GridMouseEventView', () => {
    let service: GridMouseEventView;
    let contextStub: CanvasRenderingContext2D;
    let letterA: ViewLetter;
    let grid: GridContextService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, ROUTING_TESTING_MODULE(), MOCK_TRANSLATION_MODULE()],
        });
        service = TestBed.inject(GridMouseEventView);

        // eslint-disable-next-line dot-notation -- Propriété privée
        grid = service['grid'];
        letterA = new ViewLetter({ letter: 'a', point: 2 }, EaselSelectionType.Unselected);
        contextStub = CanvasTestHelper.createCanvas(DEFAULT_SIZE, DEFAULT_SIZE).getContext('2d') as CanvasRenderingContext2D;
        grid.gridContext = contextStub;
        grid.placement.letters = [letterA, letterA, letterA, letterA];
        grid.placement.initialPlacement = { x: 1, y: 1 };
    });

    it('updateView should place letter in board in horizontal', () => {
        grid.placement.orientation = Orientation.Horizontal;
        const testTable = [];

        for (let i = 1; i <= grid.placement.letters.length; i++)
            testTable[i - 1] = grid.gridContext.getImageData(SPACE_BETWEEN_CASE * i, SPACE_BETWEEN_CASE, SPACE_BETWEEN_CASE, SPACE_BETWEEN_CASE).data;
        service.updateView();
        for (let i = 1; i <= grid.placement.letters.length; i++) {
            const imageData = grid.gridContext.getImageData(SPACE_BETWEEN_CASE * i, SPACE_BETWEEN_CASE, SPACE_BETWEEN_CASE, SPACE_BETWEEN_CASE).data;
            const beforeSize = testTable[i - 1].filter((x: unknown) => x).length;
            const afterSize = imageData.filter((x: unknown) => x).length;

            expect(afterSize).toBeGreaterThan(beforeSize);
        }
    });

    it('updateView should place letter in board in vertical', () => {
        grid.placement.orientation = Orientation.Vertical;
        const testTable = [];

        const imageData = (i: number): Uint8ClampedArray =>
            grid.gridContext.getImageData(SPACE_BETWEEN_CASE, SPACE_BETWEEN_CASE * i, SPACE_BETWEEN_CASE, SPACE_BETWEEN_CASE).data;

        for (let i = 1; i <= grid.placement.letters.length; i++) {
            testTable[i - 1] = imageData(i);
        }
        service.updateView();

        for (let i = 1; i <= grid.placement.letters.length; i++) {
            const beforeSize = testTable[i - 1].filter((x: unknown) => x).length;
            const afterSize = imageData(i).filter((x: unknown) => x).length;

            expect(afterSize).toBeGreaterThan(beforeSize);
        }
    });

    it('updateView should place letter in another box if he already has a letter', () => {
        grid.placement.orientation = Orientation.Vertical;
        grid.saveLetterSquare = [{ position: { x: 1, y: 2 }, letter: letterA.letter }];
        service.letterInGrid = [{ position: { x: 4, y: 2 }, letter: letterA.letter }];
        const imageData = (): Uint8ClampedArray =>
            grid.gridContext.getImageData(
                SPACE_BETWEEN_CASE,

                SPACE_BETWEEN_CASE * grid.placement.letters.length + 1,
                SPACE_BETWEEN_CASE,
                SPACE_BETWEEN_CASE,
            ).data;

        const beforeSize = imageData().filter((x: unknown) => x).length;

        service.updateView();
        const afterSize = imageData().filter((x: unknown) => x).length;

        expect(afterSize).toBeGreaterThan(beforeSize);
    });

    it('updateView should place letter in case if he it is a letter from placement', () => {
        grid.placement.orientation = Orientation.Vertical;
        grid.saveLetterSquare = [{ position: { x: 1, y: 2 }, letter: letterA.letter }];
        service.letterInGrid = [{ position: { x: 1, y: 2 }, letter: letterA.letter }];

        const imageData = (): Uint8ClampedArray =>
            grid.gridContext.getImageData(
                SPACE_BETWEEN_CASE,

                SPACE_BETWEEN_CASE * grid.placement.letters.length,
                SPACE_BETWEEN_CASE,
                SPACE_BETWEEN_CASE,
            ).data;
        const beforeSize = imageData().filter((x: unknown) => x).length;

        service.updateView();
        const afterSize = imageData().filter((x: unknown) => x).length;

        expect(afterSize).toBeGreaterThan(beforeSize);
    });

    it('updateView should not place letter in case if position is offLimit in horizontal', () => {
        grid.placement.orientation = Orientation.Horizontal;

        grid.placement.initialPlacement = { x: 15, y: 15 };

        const imageData = (): Uint8ClampedArray =>
            grid.gridContext.getImageData(
                SPACE_BETWEEN_CASE * (grid.placement.initialPlacement.x + 1),
                SPACE_BETWEEN_CASE * grid.placement.initialPlacement.y,
                SPACE_BETWEEN_CASE,
                SPACE_BETWEEN_CASE,
            ).data;
        const beforeSize = imageData().filter((x: unknown) => x).length;

        service.updateView();
        const afterSize = imageData().filter((x: unknown) => x).length;

        expect(afterSize).toEqual(beforeSize);
    });
});
