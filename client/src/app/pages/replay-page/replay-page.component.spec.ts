import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplayPageComponent } from '@app/pages/replay-page/replay-page.component';

describe('ReplayPageComponent', () => {
    let component: ReplayPageComponent;
    let fixture: ComponentFixture<ReplayPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ReplayPageComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ReplayPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
