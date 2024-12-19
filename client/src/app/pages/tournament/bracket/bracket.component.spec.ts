import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentBracketComponent } from '@app/pages/tournament/bracket/bracket.component';

describe('TournamentBracketComponent', () => {
    let component: TournamentBracketComponent;
    let fixture: ComponentFixture<TournamentBracketComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TournamentBracketComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TournamentBracketComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
