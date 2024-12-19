import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateContainer } from '@app/classes/translate-container/translate-container';
import {
    ACCEPTED_CHARACTERS_EMAIL,
    ACCEPTED_CHARACTERS_USERNAME,
    MAX_CHARACTERS_EMAIL,
    MAX_CHARACTERS_PASSWORD,
    MAX_CHARACTERS_USERNAME,
    MIN_CHARACTERS_PASSWORD,
    MIN_CHARACTERS_USERNAME,
} from '@app/constants/borders-user-profile';
import { AuthenticationService } from '@app/services/authentication/authentication.service';
import { HttpRequestManagerService } from '@app/services/http-request-manager/http-request-manager.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
    readonly minCharactersUserName: number;
    readonly maxCharactersUserName: number;
    readonly minCharactersPassword: number;
    readonly maxCharactersPassword: number;
    readonly maxCharactersEmail: number;
    registerForm: FormGroup;
    userExist: boolean;
    error: string;
    authenticationService: AuthenticationService;
    translationsContainer: TranslateContainer;
    private formBuilder: FormBuilder;
    private httpRequestManagerService: HttpRequestManagerService;

    // eslint-disable-next-line max-params, max-lines-per-function -- importation de services
    constructor(
        translate: TranslateService,
        httpRequestManagerService: HttpRequestManagerService,
        formBuilder: FormBuilder,
        authenticationService: AuthenticationService,
    ) {
        this.minCharactersUserName = MIN_CHARACTERS_USERNAME;
        this.maxCharactersUserName = MAX_CHARACTERS_USERNAME;
        this.minCharactersPassword = MIN_CHARACTERS_PASSWORD;
        this.maxCharactersPassword = MAX_CHARACTERS_PASSWORD;
        this.maxCharactersEmail = MAX_CHARACTERS_EMAIL;
        this.formBuilder = formBuilder;
        this.translationsContainer = new TranslateContainer(translate, [
            'yourPlayerName',
            'writePlayerNameHint1',
            'and',
            'writePlayerNameHint2',
            'yourEmail',
            'emailHint1',
            'emailHint2',
            'yourPassword',
            'passwordHint1',
            'passwordHint2',
            'playScrabble',
            'return',
        ]);
        this.registerForm = this.formBuilder.group({
            userName: [''],
            email: [''],
            password: [''],
            profilePicture: [''],
            theme: [''],
            language: [''],
            friends: [[]],
            usersBlock: [[]],
            friendsRequest: [[]],
        });
        this.httpRequestManagerService = httpRequestManagerService;
        this.authenticationService = authenticationService;
        this.userExist = false;
        this.error = '';
        this.initFrom();
    }

    // eslint-disable-next-line max-lines-per-function -- register prend en paramètre un gros objet
    onSubmit(): void {
        this.registerForm.controls.profilePicture.setValue(this.authenticationService.chosenAvatar);
        this.httpRequestManagerService
            .register({
                userName: this.registerForm.value.userName,
                email: this.registerForm.value.email,
                password: this.registerForm.value.password,
                profilePicture: this.registerForm.value.profilePicture,
                theme: this.registerForm.value.theme,
                language: this.registerForm.value.language,
                token: '',
                userId: '',
                friends: this.registerForm.value.friends,
                usersBlock: this.registerForm.value.usersBlock,
                friendsRequest: this.registerForm.value.friendsRequest,
            })
            .subscribe(
                (user) => {
                    this.userExist = false;
                    this.authenticationService.user = user;
                    this.authenticationService.setSession();
                },
                (error) => {
                    this.userExist = true;
                    this.error = error.error;
                },
            );
    }

    openAvatarOverlay(): void {
        this.authenticationService.avatarOverlayOpen = true;
    }

    statusAvatarOverlay(): boolean {
        return this.authenticationService.avatarOverlayOpen;
    }

    private initFrom(): void {
        const validatorUserName = this.initValidatorUserName();
        const validatorPassword = this.initValidatorPassword();
        const validatorEmail = this.initValidatorEmail();

        this.registerForm = this.formBuilder.group({
            userName: ['', { validators: validatorUserName, updateOn: 'change' }],
            email: ['', { validators: validatorEmail, updateOn: 'change' }],
            password: ['', { validators: validatorPassword, updateOn: 'change' }],
            profilePicture: [this.authenticationService.chosenAvatar, { validators: [Validators.required], updateOn: 'change' }],
            theme: [''],
            language: [''],
            friends: [[]],
            usersBlock: [[]],
            friendsRequest: [[]],
        });
    }

    private initValidatorUserName(): Validators {
        const validatorUserName = [];

        validatorUserName.push(Validators.required);
        validatorUserName.push(Validators.minLength(MIN_CHARACTERS_USERNAME));
        validatorUserName.push(Validators.maxLength(MAX_CHARACTERS_USERNAME));
        validatorUserName.push(Validators.pattern(ACCEPTED_CHARACTERS_USERNAME));

        return validatorUserName;
    }

    private initValidatorPassword(): Validators {
        const validatorPassword = [];

        validatorPassword.push(Validators.required);
        validatorPassword.push(Validators.minLength(MIN_CHARACTERS_PASSWORD));
        validatorPassword.push(Validators.maxLength(MAX_CHARACTERS_PASSWORD));

        return validatorPassword;
    }

    private initValidatorEmail(): Validators {
        const validatorEmail = [];

        validatorEmail.push(Validators.required);
        validatorEmail.push(Validators.pattern(ACCEPTED_CHARACTERS_EMAIL));
        validatorEmail.push(Validators.maxLength(MAX_CHARACTERS_EMAIL));

        return validatorEmail;
    }
}
