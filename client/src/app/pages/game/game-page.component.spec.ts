import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayAreaComponent } from '@app/components/play-area/play-area.component';
import { GamePageComponent } from '@app/pages/game/game-page.component';
import { GridService } from '@app/services/grid/grid.service';
import SpyObj = jasmine.SpyObj;

describe('GamePageComponent', () => {
    let gridServiceSpy: SpyObj<GridService>;
    let component: GamePageComponent;
    let fixture: ComponentFixture<GamePageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PlayAreaComponent],
            providers: [{ provide: GridService, useValue: gridServiceSpy }],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GamePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
