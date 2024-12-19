/* eslint-disable dot-notation -- Pour accéder ou pour stub des méthodes privées*/
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BOX_BY_ROW_WITH_NUMBER, DEFAULT_SIZE } from '@app/constants/grid';
import { DARK_COLORS, DEFAULT_COLORS } from '@app/constants/grid-style';
import { Word } from '@app/enum/grid';
import { Vector2D } from '@app/interface/vector-2d';
import { ROUTING_TESTING_MODULE } from '@app/modules/app-routing.module';
import { GridCreateBoardService } from '@app/services/grid-create-board/grid-create-board.service';
import { CanvasTestHelper } from '@app/test/mocks/canvas/canvas-test-helper';
import { MOCK_TRANSLATION_MODULE } from '@app/test/mocks/translation-module';

describe('GridCreateBoardService', () => {
    let service: GridCreateBoardService;
    let contextStub: CanvasRenderingContext2D;
    const examplePositionValue: Vector2D = { x: 0, y: 0 };
    const exampleWordValue = Word.Letter;
    const exampleMultiplyValue = 'x2';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, ROUTING_TESTING_MODULE(), MOCK_TRANSLATION_MODULE()],
        });
        service = TestBed.inject(GridCreateBoardService);
        contextStub = CanvasTestHelper.createCanvas(DEFAULT_SIZE, DEFAULT_SIZE).getContext('2d') as CanvasRenderingContext2D;

        service['grid'].gridContext = contextStub;
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it(' drawWord should call fillText on the canvas', () => {
        const fillTextSpy = spyOn(service['grid'].gridContext, 'fillText').and.callThrough();

        service['drawWord'](exampleWordValue, exampleMultiplyValue, examplePositionValue);
        expect(fillTextSpy).toHaveBeenCalled();
    });

    it(' drawWord should call fillText even if the second parameter is empty', () => {
        const fillTextSpy = spyOn(service['grid'].gridContext, 'fillText').and.callThrough();

        service['drawWord'](exampleWordValue, '', examplePositionValue);
        expect(fillTextSpy).toHaveBeenCalled();
    });

    it(' drawWord should call fillText as many times as letters in the word letter and a multiply', () => {
        const fillTextSpy = spyOn(service['grid'].gridContext, 'fillText').and.callThrough();
        const word = Word.Letter;
        const lengthLetter = 6;
        const multiply = 'test';

        service['drawWord'](word, multiply, examplePositionValue);
        expect(fillTextSpy).toHaveBeenCalledTimes(lengthLetter + multiply.length);
    });

    it(' drawWord should call fillText as many times as letters in the word mot and a multiply', () => {
        const fillTextSpy = spyOn(service['grid'].gridContext, 'fillText').and.callThrough();
        const word = Word.Word;
        const multiply = 'test';

        service['drawWord'](word, multiply, examplePositionValue);
        expect(fillTextSpy).toHaveBeenCalledTimes(3 + multiply.length);
    });

    it(' createSquare should create a square ', () => {
        let imageData = service['grid'].gridContext.getImageData(
            0,
            0,
            DEFAULT_SIZE / BOX_BY_ROW_WITH_NUMBER,
            DEFAULT_SIZE / BOX_BY_ROW_WITH_NUMBER,
        ).data;
        const beforeSize = imageData.filter((x) => x).length;

        service.createSquare(examplePositionValue, DARK_COLORS.defaultTileColor);
        imageData = service['grid'].gridContext.getImageData(0, 0, DEFAULT_SIZE / BOX_BY_ROW_WITH_NUMBER, DEFAULT_SIZE / BOX_BY_ROW_WITH_NUMBER).data;
        const afterSize = imageData.filter((x) => x).length;

        expect(afterSize).toBeGreaterThan(beforeSize);
    });

    it(' createSquare should not color pixels on the canvas with a wrong position', () => {
        let imageData = service['grid'].gridContext.getImageData(0, 0, DEFAULT_SIZE, DEFAULT_SIZE).data;
        const beforeSize = imageData.filter((x) => x).length;
        const wrongPosition: Vector2D = { x: -1000, y: -1000 };

        service.createSquare(wrongPosition, DEFAULT_COLORS.defaultTileColor);
        imageData = service['grid'].gridContext.getImageData(0, 0, DEFAULT_SIZE, DEFAULT_SIZE).data;
        const afterSize = imageData.filter((x) => x).length;

        expect(afterSize).toEqual(beforeSize);
    });

    it(' drawWord should color pixels on the canvas', () => {
        let imageData = service['grid'].gridContext.getImageData(0, 0, DEFAULT_SIZE, DEFAULT_SIZE).data;
        const beforeSize = imageData.filter((x) => x).length;

        service['drawWord'](exampleWordValue, exampleMultiplyValue, examplePositionValue);
        imageData = service['grid'].gridContext.getImageData(0, 0, DEFAULT_SIZE, DEFAULT_SIZE).data;
        const afterSize = imageData.filter((x) => x).length;

        expect(afterSize).toBeGreaterThan(beforeSize);
    });

    it(' createLine should call moveTo and lineTo 32 times', () => {
        const expectedCallTimes = 32;
        const moveToSpy = spyOn(service['grid'].gridContext, 'moveTo').and.callThrough();
        const lineToSpy = spyOn(service['grid'].gridContext, 'lineTo').and.callThrough();

        service.createLines();
        expect(moveToSpy).toHaveBeenCalledTimes(expectedCallTimes);
        expect(lineToSpy).toHaveBeenCalledTimes(expectedCallTimes);
    });

    it(' createBoard should color pixels on the canvas', () => {
        let imageData = service['grid'].gridContext.getImageData(0, 0, DEFAULT_SIZE, DEFAULT_SIZE).data;
        const beforeSize = imageData.filter((x) => x).length;

        service.createBoard();
        imageData = service['grid'].gridContext.getImageData(0, 0, DEFAULT_SIZE, DEFAULT_SIZE).data;
        const afterSize = imageData.filter((x) => x).length;

        expect(afterSize).toBeGreaterThan(beforeSize);
    });

    it(' createScrabble should create a scrabble in every section', () => {
        const WIDTH_SECTION = DEFAULT_SIZE / 2;
        const HEIGHT_SECTION = DEFAULT_SIZE / 2;
        const POSITION_X = [0, WIDTH_SECTION, 0, WIDTH_SECTION];
        const POSITION_Y = [0, 0, HEIGHT_SECTION, HEIGHT_SECTION];
        let imageData;
        const BEFORE_VALUE = [];

        for (let section = 0; section < POSITION_X.length; section++) {
            imageData = service['grid'].gridContext.getImageData(POSITION_X[section], POSITION_Y[section], WIDTH_SECTION, HEIGHT_SECTION).data;
            BEFORE_VALUE[section] = imageData.filter((x) => x).length;
        }

        service.createScrabble();
        for (let section = 0; section < POSITION_X.length; section++) {
            imageData = service['grid'].gridContext.getImageData(POSITION_X[section], POSITION_Y[section], WIDTH_SECTION, HEIGHT_SECTION).data;
            expect(imageData.filter((x) => x).length).toBeGreaterThan(BEFORE_VALUE[section]);
        }
    });
});
