import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequestManagerService } from '@app/services/http-request-manager/http-request-manager.service';
import { IdentityService } from '@app/services/identity/identity.service';
import { Profile } from '@common/interfaces/profile';
import { UserUpdate } from '@common/interfaces/user/user-update';

@Injectable({
    providedIn: 'root',
})
export class ProfileUpdaterManager {
    error: string;
    eventEmitter: EventEmitter<null>;
    private readonly identity: IdentityService;
    private readonly httpManager: HttpRequestManagerService;
    private readonly router: Router;
    get user(): Profile | null {
        return this.identity.getUser();
    }

    constructor(identity: IdentityService, httpManager: HttpRequestManagerService, router: Router) {
        this.identity = identity;
        this.httpManager = httpManager;
        this.router = router;
        this.error = '';
        this.eventEmitter = new EventEmitter();
    }

    updateName(newUserName: string): void {
        if (this.user?.userName === newUserName) return;
        this.updateProfile({ userName: newUserName } as UserUpdate);
    }

    updateEmail(newEmail: string): void {
        if (this.user?.email === newEmail) return;
        this.updateProfile({ email: newEmail } as UserUpdate);
    }

    updatePassword(newPassword: string): void {
        if (this.user?.password === newPassword) return;
        this.updateProfile({ password: newPassword } as UserUpdate);
    }

    updateProfilePicture(newProfilePicture: string): void {
        if (this.user?.profilePicture === newProfilePicture) return;
        this.updateProfile({ profilePicture: newProfilePicture } as UserUpdate);
    }

    updateTheme(newTheme: string): void {
        if (this.user?.theme === newTheme) return;
        this.updateProfile({ theme: newTheme } as UserUpdate);
    }

    updateLanguage(newLanguage: string): void {
        if (this.user?.language === newLanguage) return;
        this.updateProfile({ language: newLanguage } as UserUpdate);
    }

    private updateProfile(userUpdate: UserUpdate): void {
        this.httpManager.updateProfile(userUpdate).subscribe({
            next: (updatedProfile) => {
                this.identity.setUser(updatedProfile);
                const url = this.router.url;

                this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
                    this.router.navigate([url]);
                }); // Force reload of the page
                this.eventEmitter.emit(null); // Force the header to update
            },

            error: (err) => (this.error = err.error),
        });
    }
}
