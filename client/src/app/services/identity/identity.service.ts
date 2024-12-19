import { Injectable } from '@angular/core';
import { ThemeManagerService } from '@app/services/theme-manager/theme-manager.service';
import { Profile } from '@common/interfaces/profile';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root',
})
export class IdentityService {
    private user: Profile | null;
    private themeManager: ThemeManagerService;
    private translateService: TranslateService;

    constructor(themeManager: ThemeManagerService, translateService: TranslateService) {
        this.themeManager = themeManager;
        this.translateService = translateService;
    }

    getUser(): Profile | null {
        return this.user;
    }

    setUser(user: Profile): void {
        this.user = user;
        this.themeManager.overrideCSSProperties(user.theme);
        this.translateService.use(user.language);
        localStorage.setItem('lang', user.language);
    }

    clearUser(): void {
        this.user = null;
    }
}
