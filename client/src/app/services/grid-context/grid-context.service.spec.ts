import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Vector2D } from '@app/interface/vector-2d';
import { ROUTING_TESTING_MODULE } from '@app/modules/app-routing.module';
import { GridContextService } from '@app/services/grid-context/grid-context.service';
import { MOCK_TRANSLATION_MODULE } from '@app/test/mocks/translation-module';

describe('GridContextService', () => {
    let service: GridContextService;
    let position1: Vector2D;
    let position2: Vector2D;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, ROUTING_TESTING_MODULE(), MOCK_TRANSLATION_MODULE()],
        });
        service = TestBed.inject(GridContextService);
        position1 = { x: 0, y: 1 };
        position2 = { x: 1, y: 0 };
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('comparePosition should give false if two position is not the same', () => {
        service.samePosition(position1, position2);
        expect(service.samePosition(position1, position2)).toBeFalse();
    });

    it('comparePosition should give true if two position is  the same', () => {
        service.samePosition(position1, position1);
        expect(service.samePosition(position1, position2)).toBeFalse();
    });
});
