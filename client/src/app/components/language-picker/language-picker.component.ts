import { Component } from '@angular/core';
import { TranslateContainer } from '@app/classes/translate-container/translate-container';
import { IdentityService } from '@app/services/identity/identity.service';
import { ProfileUpdaterManager } from '@app/services/profile-updater-manager/profile-updater-manager';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-language-picker',
    templateUrl: './language-picker.component.html',
    styleUrls: ['./language-picker.component.scss'],
})
export class LanguagePickerComponent {
    selectedLanguage: string;
    translationsContainer: TranslateContainer;
    private profileUpdaterManager: ProfileUpdaterManager;

    constructor(translate: TranslateService, profileUpdaterManager: ProfileUpdaterManager, identityService: IdentityService) {
        this.profileUpdaterManager = profileUpdaterManager;
        this.translationsContainer = new TranslateContainer(translate, ['chooseALanguage', 'en', 'fr']);
        this.selectedLanguage = identityService.getUser()?.language ?? 'fr';
    }

    changeLanguage(): void {
        this.profileUpdaterManager.updateLanguage(this.selectedLanguage);
    }
}
