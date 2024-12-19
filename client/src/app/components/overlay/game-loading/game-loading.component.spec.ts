import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameLoadingComponent } from '@app/components/overlay/game-loading/game-loading.component';
import { GameUpdaterService } from '@app/services/game-updater/game-updater.service';
import { gameUpdaterStub } from '@app/test/mocks/stubs/game-updater-stub';

describe('GameLoadingComponent', () => {
    let component: GameLoadingComponent;
    let fixture: ComponentFixture<GameLoadingComponent>;
    let updateStub: jasmine.SpyObj<GameUpdaterService>;

    beforeEach(async () => {
        updateStub = gameUpdaterStub();
        await TestBed.configureTestingModule({
            declarations: [GameLoadingComponent],
            providers: [{ provide: GameUpdaterService, useValue: updateStub }],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GameLoadingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should return gameUpdateIsLoading', () => {
        expect(component.isGameLoading).toBe(updateStub.isLoading);
    });
});
