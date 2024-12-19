import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EaselComponent } from '@app/components/easel/easel.component';
import { ARROW_LEFT, ARROW_RIGHT, SHIFT } from '@app/constants/keyboard';
import { EaselSelectionService } from '@app/services/easel/view/easel-selection.service';
import { GameUpdaterService } from '@app/services/game-updater/game-updater.service';
import { mockEaselSelectionService } from '@app/test/mocks/easel-mock/easel-selection-service-mock';
import { gameUpdaterStub } from '@app/test/mocks/stubs/game-updater-stub';

describe('EaselComponent', () => {
    let component: EaselComponent;
    let fixture: ComponentFixture<EaselComponent>;
    let easelService: jasmine.SpyObj<EaselSelectionService>;
    let gameUpdate: jasmine.SpyObj<GameUpdaterService>;

    beforeEach(() => {
        easelService = mockEaselSelectionService();
        gameUpdate = gameUpdaterStub();
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes([])],
            providers: [
                { provide: EaselSelectionService, useValue: easelService },
                { provide: GameUpdaterService, useValue: gameUpdate },
            ],
            declarations: [EaselComponent],
        }).compileComponents();
        fixture = TestBed.createComponent(EaselComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('onScroll should call moveManipulationLeft if delta y is negative', () => {
        const eventStub = { deltaY: -2 };

        component.onScroll(eventStub as WheelEvent);
        expect(easelService.moveManipulationLeft).toHaveBeenCalled();
    });

    it('onScroll should call moveManipulationRight if delta y is positive', () => {
        const eventStub = { deltaY: 4 };

        component.onScroll(eventStub as WheelEvent);
        expect(easelService.moveManipulationRight).toHaveBeenCalled();
    });

    it('onEnter should call onClickExchange if isGoodToExchange is true', () => {
        const spyClickExchange = spyOn(component, 'onClickExchange');
        const fakeExchange = true;

        spyOnProperty(component, 'isGoodToExchange', 'get').and.returnValue(fakeExchange);
        component.onEnter();

        expect(spyClickExchange).toHaveBeenCalled();
    });

    it('onEnter should not call onClickExchange if isGoodToExchange is false', () => {
        const spyClickExchange = spyOn(component, 'onClickExchange');
        const fakeExchange = false;

        spyOnProperty(component, 'isGoodToExchange', 'get').and.returnValue(fakeExchange);
        component.onEnter();
        expect(spyClickExchange).not.toHaveBeenCalled();
    });

    it('onKeyPressed should call moveManipulationRight on arrow right', () => {
        const eventStub = { key: ARROW_RIGHT };

        component.onKeyPressed(eventStub as KeyboardEvent);
        expect(easelService.moveManipulationRight).toHaveBeenCalled();
    });

    it('onKeyPressed should call moveManipulationLeft on arrow left', () => {
        const eventStub = { key: ARROW_LEFT };

        component.onKeyPressed(eventStub as KeyboardEvent);
        expect(easelService.moveManipulationLeft).toHaveBeenCalled();
    });

    it('onKeyPressed should do nothing on shift', () => {
        const eventStub = { key: SHIFT };

        component.onKeyPressed(eventStub as KeyboardEvent);
        expect(easelService.moveManipulationLeft).not.toHaveBeenCalled();
        expect(easelService.moveManipulationRight).not.toHaveBeenCalled();
    });

    it('onKeyPressed should call selectManipulationByString when valid letter', () => {
        const letter = 'j';
        const eventStub = { key: letter };

        easelService.isInEasel.and.returnValue(true);
        component.onKeyPressed(eventStub as KeyboardEvent);
        expect(easelService.selectManipulationByString).toHaveBeenCalled();
    });

    it('onKeyPressed should call cancelManipulationSelection when invalid letter', () => {
        const letter = '6';
        const eventStub = { key: letter };

        easelService.isInEasel.and.returnValue(false);
        component.onKeyPressed(eventStub as KeyboardEvent);
        expect(easelService.cancelManipulation).toHaveBeenCalled();
    });

    it('onLeftClick should call selectManipulationByIndex', () => {
        component.onLeftClick(0);
        expect(easelService.selectManipulationByIndex).toHaveBeenCalled();
    });

    it('onRightClick should call selectTradeLetter', () => {
        component.onRightClick(0);
        expect(easelService.selectTrade).toHaveBeenCalled();
    });

    it('should not call sendTradeLetter from commandSender when echange button is clicked but it is not player turn', () => {
        component.gameUpdate.playerInfo.turn = false;
        // eslint-disable-next-line dot-notation -- Propriété privée
        const exchangeButtonSpy = spyOn(component['commandSender'], 'sendTradeLetter');

        component.onClickExchange();
        expect(exchangeButtonSpy).not.toHaveBeenCalled();
    });

    it('should call sendTradeLetter from commandSender when echange button is clicked but it is  player turn', () => {
        component.gameUpdate.playerInfo.turn = true;
        // eslint-disable-next-line dot-notation -- Propriété privée
        const exchangeButtonSpy = spyOn(component['commandSender'], 'sendTradeLetter');

        component.onClickExchange();
        expect(exchangeButtonSpy).toHaveBeenCalled();
    });

    it('onCancelClick should call cancelManipulationSelection and cancelTradeSelection', () => {
        component.onCancelClick();
        expect(easelService.cancelManipulation).toHaveBeenCalled();
        expect(easelService.cancelTrade).toHaveBeenCalled();
    });

    it('isTradeAllowed should return false if stash is below 7', () => {
        const lettersLeft1 = 6;
        const lettersLeft2 = 0;
        const lettersLeft3 = -1;

        gameUpdate.stash.nLettersLeft = lettersLeft1;
        expect(component.isTradeAllowed).toBeFalse();
        gameUpdate.stash.nLettersLeft = lettersLeft2;
        expect(component.isTradeAllowed).toBeFalse();
        gameUpdate.stash.nLettersLeft = lettersLeft3;
        expect(component.isTradeAllowed).toBeFalse();
    });

    it('isTradeAllowed should return true if stash is above or equal 7', () => {
        const fakeTurn = true;
        const lettersLeft1 = 7;
        const lettersLeft2 = 8;

        gameUpdate.playerInfo.turn = fakeTurn;
        spyOnProperty(component, 'isSelected', 'get').and.returnValue(fakeTurn);
        gameUpdate.stash.nLettersLeft = lettersLeft1;
        expect(component.isTradeAllowed).toBeTrue();
        gameUpdate.stash.nLettersLeft = lettersLeft2;
        expect(component.isTradeAllowed).toBeTrue();
    });

    it('onEaselUpdateEvent should call cancelHidden', () => {
        // eslint-disable-next-line dot-notation -- Méthode privée
        component['onEaselUpdateEvent'](easelService)();
        expect(easelService.cancelHidden).toHaveBeenCalled();
    });
});
