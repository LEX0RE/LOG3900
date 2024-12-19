import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProfilePageComponent } from '@app/pages/user-profile/user-profile.component';

describe('UserProfilePageComponent', () => {
    let component: UserProfilePageComponent;
    let fixture: ComponentFixture<UserProfilePageComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [UserProfilePageComponent],
        }).compileComponents();
        fixture = TestBed.createComponent(UserProfilePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
