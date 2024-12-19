import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { DEFAULT_SIZE } from '@app/constants/grid';
import { Vector2D } from '@app/interface/vector-2d';
import { ROUTING_TESTING_MODULE } from '@app/modules/app-routing.module';
import { GridService } from '@app/services/grid/grid.service';
import { CanvasTestHelper } from '@app/test/mocks/canvas/canvas-test-helper';
import { MOCK_TRANSLATION_MODULE } from '@app/test/mocks/translation-module';
import { Coordinate } from '@common/interfaces/coordinate';
import { CommonBoard } from '@common/interfaces/game-view-related/common-board';
import { CommonLetter } from '@common/interfaces/game-view-related/common-letter';
import { CommonTile } from '@common/interfaces/game-view-related/common-tile';

describe('GridService', () => {
    let service: GridService;
    let contextStub: CanvasRenderingContext2D;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, ROUTING_TESTING_MODULE(), MOCK_TRANSLATION_MODULE()],
        });
        service = TestBed.inject(GridService);
        contextStub = CanvasTestHelper.createCanvas(DEFAULT_SIZE, DEFAULT_SIZE).getContext('2d') as CanvasRenderingContext2D;

        service['gridCreation']['grid'].gridContext = contextStub;
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it(' drawGrid should call createBoard from gridCreation', () => {
        const createBoardSpy = spyOn(service['gridCreation'], 'createBoard').and.callThrough();

        service.drawGrid();
        expect(createBoardSpy).toHaveBeenCalled();
    });

    it(' changeFontSize should call changeFontSize from gridPlace', () => {
        const changeFontSizeSpy = spyOn(service['gridPlaceLetter'], 'changeFontSize').and.callThrough();
        const parameter = 1;

        service.changeFontSize(parameter);
        expect(changeFontSizeSpy).toHaveBeenCalledWith(parameter);
    });

    it(' putWord should call putWord from grid', () => {
        const putWordSpy = spyOn(service['gridPlaceLetter'], 'putWord').and.callThrough();
        const letter: CommonLetter = { letter: 'Z', point: 3 };
        const coordinate: Coordinate = { row: '', column: 1 };
        const tile: CommonTile = { letter, coordinate };
        const letterTable: CommonBoard = { tiles: [tile] };

        service.putWord(letterTable);
        expect(putWordSpy).toHaveBeenCalledWith(letterTable);
    });

    it(' putPlacement should call update from gridMouseEvent', () => {
        const updateSpy = spyOn(service['gridMouseEvent'], 'update').and.callThrough();

        service.putPlacement();
        expect(updateSpy).toHaveBeenCalled();
    });

    it(' mouseClick should call mouseClick from gridMouseEvent', () => {
        const mouseClickSpy = spyOn(service['gridMouseEvent'], 'mouseClick').and.callThrough();
        const clickParameter: Vector2D = { x: 0, y: 0 };

        service.mouseClick(clickParameter);
        expect(mouseClickSpy).toHaveBeenCalledWith(clickParameter);
    });

    it(' keyboardClick should call keyboardClick from gridMouseEvent', () => {
        const keyboardSpy = spyOn(service['gridMouseEvent'], 'keyboardClick').and.callThrough();
        const keyboardParameter = 'test';

        service.keyboardClick(keyboardParameter);
        expect(keyboardSpy).toHaveBeenCalledWith(keyboardParameter);
    });

    it(' reset should call reset from gridMouseEvent', () => {
        const mouseClickSpy = spyOn(service['gridMouseEvent'], 'reset').and.callThrough();

        service.reset();
        expect(mouseClickSpy).toHaveBeenCalled();
    });
});
