import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationComponent } from '@app/pages/authentication/authentication.component';
import { AuthenticationService } from '@app/services/authentication/authentication.service';
import { HttpRequestManagerService } from '@app/services/http-request-manager/http-request-manager.service';
import { mockAuthenticationService } from '@app/test/mocks/authentication-service-mock';
import { NewHttpRequestManagerStub } from '@app/test/mocks/stubs/new-http-request-manager-service-stub';

describe('AuthenticationComponent', () => {
    let component: AuthenticationComponent;
    let fixture: ComponentFixture<AuthenticationComponent>;
    let httpService: NewHttpRequestManagerStub;
    let authenticationServiceSpy: jasmine.SpyObj<AuthenticationService>;

    beforeEach(() => {
        httpService = new NewHttpRequestManagerStub();
        authenticationServiceSpy = mockAuthenticationService();
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, ReactiveFormsModule],
            providers: [
                FormBuilder,
                { provide: HttpRequestManagerService, useValue: httpService },
                { provide: AuthenticationService, useValue: authenticationServiceSpy },
            ],
            declarations: [AuthenticationComponent],
        }).compileComponents();
        fixture = TestBed.createComponent(AuthenticationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('calling onSubmit() method should set userInvalid to false', () => {
        component.userInvalid = true;
        component.onSubmit();
        expect(component.userInvalid).toBeFalsy();
        expect(authenticationServiceSpy.setSession).toHaveBeenCalled();
    });

    it('calling  onSubmit() method should set userInvalid to true', () => {
        const error = 'error';

        component.userInvalid = false;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- utile pour tester et espionner une méthode privée
        spyOn(httpService.fakeProfile, 'subscribe').and.callFake((resolve?: any, reject?: any): any => reject(error));

        component.onSubmit();
        expect(component.userInvalid).toBeTrue();
    });

    it('userName field should be false if empty', () => {
        component.loginForm.controls.userName.setValue('');
        expect(component.loginForm.value.userName).toBe('');
        expect(component.loginForm.value.userName).toBeFalsy();
    });

    it('password field should be false if empty', () => {
        component.loginForm.controls.password.setValue('');
        expect(component.loginForm.value.password).toBe('');
        expect(component.loginForm.value.password).toBeFalsy();
    });

    it('userName field should be true if not empty', () => {
        const userName = 'user';

        component.loginForm.controls.userName.setValue(userName);
        expect(component.loginForm.value.userName).toBe(userName);
        expect(component.loginForm.value.userName).toBeTruthy();
    });

    it('password field should be true if not empty', () => {
        const password = 'password';

        component.loginForm.controls.password.setValue(password);
        expect(component.loginForm.value.password).toBe(password);
        expect(component.loginForm.value.password).toBeTruthy();
    });
});
