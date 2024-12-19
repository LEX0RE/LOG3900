import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateContainer } from '@app/classes/translate-container/translate-container';
import { AuthenticationService } from '@app/services/authentication/authentication.service';
import { HttpRequestManagerService } from '@app/services/http-request-manager/http-request-manager.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent {
    loginForm: FormGroup;
    userInvalid: boolean;
    error: string;
    translationsContainer: TranslateContainer;
    private formBuilder: FormBuilder;
    private httpRequestManagerService: HttpRequestManagerService;
    private authenticationService: AuthenticationService;

    // eslint-disable-next-line max-params, max-lines-per-function -- importation de services
    constructor(
        translate: TranslateService,
        httpRequestManagerService: HttpRequestManagerService,
        formBuilder: FormBuilder,
        authenticationService: AuthenticationService,
    ) {
        this.formBuilder = formBuilder;
        this.loginForm = this.formBuilder.group({
            userName: ['', { validators: [Validators.required], updateOn: 'change' }],
            password: ['', { validators: [Validators.required], updateOn: 'change' }],
        });
        this.httpRequestManagerService = httpRequestManagerService;
        this.authenticationService = authenticationService;
        this.userInvalid = false;
        this.error = '';
        this.translationsContainer = new TranslateContainer(translate, [
            'logIn',
            'username',
            'emptyField',
            'password',
            'registerHint1',
            'registerHint2',
        ]);
    }

    onSubmit(): void {
        const password = this.loginForm.value.password;

        this.loginForm.get('password')?.reset();
        this.httpRequestManagerService
            .login({
                userName: this.loginForm.value.userName,
                password,
            })
            .subscribe(
                (user) => {
                    this.userInvalid = false;
                    this.authenticationService.user = user;
                    this.authenticationService.setSession();
                },
                (error) => {
                    this.userInvalid = true;
                    this.error = !error.status ? 'Impossible de se connecter' : error.error;
                },
            );
    }
}
