import { TestBed } from '@angular/core/testing';
import { JoiningGameService } from '@app/services/joining-game/joining-game.service';

describe('JoiningGameService', () => {
    let service: JoiningGameService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(JoiningGameService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
