import { TestBed } from '@angular/core/testing';
import { GameNavigationService } from '@app/services/game-navigation/game-navigation.service';
import { GameModes } from '@common/enums/game-modes';

describe('GameNavigationService', () => {
    let service: GameNavigationService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(GameNavigationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('when initialized, gameMode value should be GameModes.Classic', () => {
        expect(service['gameMode']).toBe(GameModes.Classic);
    });

    it('setting the gameMode value to GameModes.Cooperative should change the gameMode value to GameModes.Cooperative', () => {
        service.setGameMode(GameModes.Cooperative);

        expect(service['gameMode']).toBe(GameModes.Cooperative);
    });

    it('setting the gameMode value to "classique" when it is already its value should let the gameMode value to "classique"', () => {
        service['gameMode'] = GameModes.Classic;

        expect(service['gameMode']).toBe(GameModes.Classic);
        service.setGameMode(GameModes.Classic);

        expect(service['gameMode']).toBe(GameModes.Classic);
    });
});
