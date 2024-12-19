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
import { IdentityService } from '@app/services/identity/identity.service';
import { ProfileUpdaterManager } from '@app/services/profile-updater-manager/profile-updater-manager';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
})
export class UserProfilePageComponent {
    readonly minCharactersUserName: number;
    readonly maxCharactersUserName: number;
    readonly minCharactersPassword: number;
    readonly maxCharactersPassword: number;
    readonly maxCharactersEmail: number;
    translationsContainer: TranslateContainer;
    authenticationService: AuthenticationService;
    registerForm: FormGroup;
    profileUpdaterManager: ProfileUpdaterManager;
    private formBuilder: FormBuilder;
    private identityService: IdentityService;

    // eslint-disable-next-line max-lines-per-function, max-params -- importation de services
    constructor(
        translate: TranslateService,
        authenticationService: AuthenticationService,
        formBuilder: FormBuilder,
        identityService: IdentityService,
        profileUpdaterManager: ProfileUpdaterManager,
    ) {
        this.authenticationService = authenticationService;
        this.minCharactersUserName = MIN_CHARACTERS_USERNAME;
        this.maxCharactersUserName = MAX_CHARACTERS_USERNAME;
        this.minCharactersPassword = MIN_CHARACTERS_PASSWORD;
        this.maxCharactersPassword = MAX_CHARACTERS_PASSWORD;
        this.maxCharactersEmail = MAX_CHARACTERS_EMAIL;
        this.formBuilder = formBuilder;
        this.identityService = identityService;
        this.profileUpdaterManager = profileUpdaterManager;
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
            'profile',
            'history',
            'return',
            'statistics',
            'seeYourFriends',
        ]);
        this.authenticationService.chosenAvatar = this.identityService.getUser()?.profilePicture ?? 'avatar1';
        this.registerForm = this.formBuilder.group({
            userName: [this.identityService.getUser()?.userName ?? ''],
            email: [this.identityService.getUser()?.email ?? ''],
            password: ['*********'],
        });
        this.initFrom();
    }

    openAvatarOverlay(): void {
        this.authenticationService.avatarOverlayOpen = true;
    }

    statusAvatarOverlay(): boolean {
        return this.authenticationService.avatarOverlayOpen;
    }

    submitUsername(): void {
        this.registerForm.controls.userName.markAsTouched();
        if (!this.registerForm.controls.userName.invalid) this.profileUpdaterManager.updateName(this.registerForm.controls.userName.value);
    }

    submitImage(avatarClosed: boolean): void {
        if (avatarClosed) this.profileUpdaterManager.updateProfilePicture(this.authenticationService.chosenAvatar);
    }

    submitEmail(): void {
        this.registerForm.controls.email.markAsTouched();
        if (!this.registerForm.controls.email.invalid) this.profileUpdaterManager.updateEmail(this.registerForm.controls.email.value);
    }

    submitPassword(): void {
        this.registerForm.controls.password.markAsTouched();
        if (!this.registerForm.controls.password.invalid) this.profileUpdaterManager.updatePassword(this.registerForm.controls.password.value);
    }

    private initFrom(): void {
        const validatorUserName = this.initValidatorUserName();
        const validatorPassword = this.initValidatorPassword();
        const validatorEmail = this.initValidatorEmail();

        this.registerForm = this.formBuilder.group({
            userName: [this.identityService.getUser()?.userName ?? '', { validators: validatorUserName, updateOn: 'change' }],
            email: [this.identityService.getUser()?.email ?? '', { validators: validatorEmail, updateOn: 'change' }],
            password: ['*********', { validators: validatorPassword, updateOn: 'change' }],
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
