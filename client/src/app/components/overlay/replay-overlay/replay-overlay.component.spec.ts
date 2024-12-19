import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplayOverlayComponent } from '@app/components/overlay/replay-overlay/replay-overlay.component';

describe('ReplayOverlayComponent', () => {
    let component: ReplayOverlayComponent;
    let fixture: ComponentFixture<ReplayOverlayComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ReplayOverlayComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ReplayOverlayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
