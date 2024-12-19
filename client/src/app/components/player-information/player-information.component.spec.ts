import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerInformationComponent } from '@app/components/player-information/player-information.component';
import { CommonPlayerInfo } from '@common/interfaces/common-player-info';

describe('PlayerInformationComponent', () => {
    let component: PlayerInformationComponent;
    let fixture: ComponentFixture<PlayerInformationComponent>;
    let player: CommonPlayerInfo;
    const fakePlayer: CommonPlayerInfo = { name: 'player1', score: 315, nLetterLeft: 3, turn: false, userId: 'id1' };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PlayerInformationComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PlayerInformationComponent);
        component = fixture.componentInstance;
        player = fakePlayer;
        component.player = player;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
