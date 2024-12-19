import { Component } from '@angular/core';
import { TranslateContainer } from '@app/classes/translate-container/translate-container';
import { IdentityService } from '@app/services/identity/identity.service';
import { ProfileUpdaterManager } from '@app/services/profile-updater-manager/profile-updater-manager';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-theme-picker',
    templateUrl: './theme-picker.component.html',
    styleUrls: ['./theme-picker.component.scss'],
})
export class ThemePickerComponent {
    translationsContainer: TranslateContainer;
    selectedTheme: string;
    private profileUpdaterManager: ProfileUpdaterManager;

    constructor(translate: TranslateService, profileUpdaterManager: ProfileUpdaterManager, identityService: IdentityService) {
        this.profileUpdaterManager = profileUpdaterManager;
        this.translationsContainer = new TranslateContainer(translate, ['chooseATheme', 'themeDefault', 'themeDark', 'themeUnderTheSea', 'submit']);
        this.selectedTheme = identityService.getUser()?.theme ?? 'Default';
    }

    changeTheme(): void {
        this.profileUpdaterManager.updateTheme(this.selectedTheme);
    }
}
