import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BOX_BY_ROW_WITH_NUMBER, DEFAULT_SIZE } from '@app/constants/grid';
import { PositionLetter } from '@app/interface/position-letter';
import { Vector2D } from '@app/interface/vector-2d';
import { ROUTING_TESTING_MODULE } from '@app/modules/app-routing.module';
import { GridPlaceLetterService } from '@app/services/grid-place-letter/grid-place-letter.service';
import { CanvasTestHelper } from '@app/test/mocks/canvas/canvas-test-helper';
import { MOCK_TRANSLATION_MODULE } from '@app/test/mocks/translation-module';
import { Coordinate } from '@common/interfaces/coordinate';
import { CommonBoard } from '@common/interfaces/game-view-related/common-board';
import { CommonLetter } from '@common/interfaces/game-view-related/common-letter';
import { CommonTile } from '@common/interfaces/game-view-related/common-tile';

describe('GridPlaceLetterService', () => {
    let service: GridPlaceLetterService;
    let contextStub: CanvasRenderingContext2D;
    let letterTable: CommonBoard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            // eslint-disable-next-line no-undef
            imports: [HttpClientTestingModule, ROUTING_TESTING_MODULE(), MOCK_TRANSLATION_MODULE()],
        });
        service = TestBed.inject(GridPlaceLetterService);
        contextStub = CanvasTestHelper.createCanvas(DEFAULT_SIZE, DEFAULT_SIZE).getContext('2d') as CanvasRenderingContext2D;
        service['gridContext'].gridContext = contextStub;
        const letter: CommonLetter = { letter: 'Z', point: 3 };
        const coordinate: Coordinate = { row: 'A', column: 1 };
        const tile: CommonTile = { letter, coordinate };

        letterTable = { tiles: [tile] };
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('putWord should color pixel in the good position', () => {
        let imageData = service['gridContext'].gridContext.getImageData(
            DEFAULT_SIZE / BOX_BY_ROW_WITH_NUMBER,
            DEFAULT_SIZE / BOX_BY_ROW_WITH_NUMBER,
            DEFAULT_SIZE / BOX_BY_ROW_WITH_NUMBER,
            DEFAULT_SIZE / BOX_BY_ROW_WITH_NUMBER,
        ).data;
        const beforeSize = imageData.filter((x) => x !== 0).length;

        service.putWord(letterTable);
        imageData = service['gridContext'].gridContext.getImageData(
            DEFAULT_SIZE / BOX_BY_ROW_WITH_NUMBER,
            DEFAULT_SIZE / BOX_BY_ROW_WITH_NUMBER,
            DEFAULT_SIZE / BOX_BY_ROW_WITH_NUMBER,
            DEFAULT_SIZE / BOX_BY_ROW_WITH_NUMBER,
        ).data;
        const afterSize = imageData.filter((x) => x !== 0).length;

        expect(afterSize).toBeGreaterThan(beforeSize);
    });

    it('putWord should not call createLetterSquare if the letter is nothing', () => {
        const letter: CommonLetter = { letter: '', point: 3 };
        const coordinate: Coordinate = { row: 'O', column: 1 };
        const tile: CommonTile = { letter, coordinate };
        const emptyLetterTable: CommonBoard = { tiles: [tile] };
        const putWordSpy = spyOn(service, 'createLetterSquare').and.callThrough();

        service.putWord(emptyLetterTable);
        expect(putWordSpy).not.toHaveBeenCalled();
    });

    it('putWord should not call createLetterSquare if the row is empty', () => {
        const letter: CommonLetter = { letter: 'Z', point: 3 };
        const coordinate: Coordinate = { row: '', column: 1 };
        const tile: CommonTile = { letter, coordinate };
        const emptyRowTable: CommonBoard = { tiles: [tile] };
        const putWordSpy = spyOn(service, 'createLetterSquare').and.callThrough();

        service.putWord(emptyRowTable);
        expect(putWordSpy).not.toHaveBeenCalled();
    });

    it('changeFontSize should  change letter format if fontSize has a good fontSize', () => {
        const createLetterSquareSpy = spyOn(service, 'createLetterSquare').and.callThrough();

        service.putWord(letterTable);
        const fontSize = 14;

        service.changeFontSize(fontSize);

        expect(createLetterSquareSpy).toHaveBeenCalled();
    });

    it('saveLetterSquare from gridContext should not change if a case is already in a position', () => {
        const positionLetter: Vector2D = { x: 1, y: 1 };

        service.createLetterSquare(positionLetter, letterTable.tiles[0].letter);
        const expectedLetterSquare = service['gridContext'].saveLetterSquare;

        service.createLetterSquare(positionLetter, letterTable.tiles[0].letter);

        expect(service['gridContext'].saveLetterSquare).toEqual(expectedLetterSquare);
    });
    it('saveLetterSquare from gridContext should not change if a case is already in a position', () => {
        const firstPositionLetter: Vector2D = { x: 1, y: 1 };
        const secondPositionLetter: Vector2D = { x: 2, y: 1 };
        const expectedLetterSquare: PositionLetter[] = [
            { position: firstPositionLetter, letter: letterTable.tiles[0].letter },
            { position: secondPositionLetter, letter: letterTable.tiles[0].letter },
        ];

        service.createLetterSquare(firstPositionLetter, letterTable.tiles[0].letter);
        service.createLetterSquare(secondPositionLetter, letterTable.tiles[0].letter);
        expect(service['gridContext'].saveLetterSquare).toEqual(expectedLetterSquare);
    });
});
