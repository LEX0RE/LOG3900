import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryPageComponent } from '@app/pages/history-page/history-page.component';

describe('HistoryPageComponent', () => {
    let component: HistoryPageComponent;
    let fixture: ComponentFixture<HistoryPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HistoryPageComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HistoryPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
