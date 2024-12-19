import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvatarComponent } from '@app/components/overlay/avatar/avatar.component';
import { AuthenticationService } from '@app/services/authentication/authentication.service';
import { mockAuthenticationService } from '@app/test/mocks/authentication-service-mock';

describe('AvatarComponent', () => {
    let component: AvatarComponent;
    let fixture: ComponentFixture<AvatarComponent>;
    let authenticationServiceSpy: jasmine.SpyObj<AuthenticationService>;

    beforeEach(async () => {
        authenticationServiceSpy = mockAuthenticationService();
        await TestBed.configureTestingModule({
            providers: [{ provide: AuthenticationService, useValue: authenticationServiceSpy }],
            declarations: [AvatarComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AvatarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('processFile should read file', async () => {
        const testFile = new File([new Blob()], 'test.png', { type: 'image/png' });
        const testImageInput = { files: [testFile] };

        component.processFile(testImageInput);

        expect(component.errorImage).toBe(false);
    });

    it('processFile should not read file', async () => {
        const testFile = new File([new Blob()], 'test.txt', { type: 'image/txt' });
        const testImageInput = { files: [testFile] };

        component.processFile(testImageInput);

        expect(component.errorImage).toBe(true);
    });

    it('selectImage should set isSelected to true', async () => {
        const testPath = 'assets/images/default-avatar/dog.png';
        const testIndex = 2;

        component.selectImage(testPath, testIndex);

        expect(component.defaultPicture[testIndex].isSelected).toBe(true);
        expect(authenticationServiceSpy.imageToBase64).toHaveBeenCalled();
    });
});
