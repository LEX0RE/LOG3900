import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DEFAULT_AVATAR } from '@app/constants/default-avatar';
import { HOME, LOGIN, LOGIN_SIMPLE, REGISTER } from '@app/constants/router-path';
import { ChatBoxInteractionService } from '@app/services/chat-box-interaction/chat-box-interaction';
import { IdentityService } from '@app/services/identity/identity.service';
import { SocketClientService } from '@app/services/socket-client/socket-client.service';
import { ID_TOKEN } from '@common/constants/authentication';
import { CONNECT, DISCONNECT } from '@common/constants/communication';
import { Profile } from '@common/interfaces/profile';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    user: Profile;
    avatarOverlayOpen: boolean;
    chosenAvatar: string;
    errorImage: boolean;
    private router: Router;
    private socketService: SocketClientService;
    private readonly identity: IdentityService;
    private readonly chatBoxInteractionService: ChatBoxInteractionService;

    // eslint-disable-next-line max-params -- importation de services
    constructor(router: Router, socketService: SocketClientService, identity: IdentityService, chatBoxInteractionService: ChatBoxInteractionService) {
        this.router = router;
        this.identity = identity;
        this.socketService = socketService;
        this.socketService.on(DISCONNECT, () => this.logout());
        this.chatBoxInteractionService = chatBoxInteractionService;
        this.avatarOverlayOpen = false;
        this.logoutWindowClose();
        this.imageToBase64(DEFAULT_AVATAR);
        this.errorImage = false;
    }

    setSession(): void {
        localStorage.removeItem(ID_TOKEN);
        localStorage.setItem(ID_TOKEN, this.user.token);
        this.identity.setUser(this.user);
        this.socketService.once(CONNECT, () => {
            this.router.navigate([HOME]);
        });
        this.socketService.connect();
        const delay = 200;

        setTimeout(() => {
            const url = this.router.url;

            this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
                this.router.navigate([url]);
            }); // Force reload of the page
        }, delay); // Very Important beceause it won't load the translation for new registered user otherwise
    }

    logout(): void {
        if (RegExp(LOGIN).test(this.router.url) || RegExp(REGISTER).test(this.router.url)) return;
        this.identity.clearUser();
        if (this.socketService.socketId) this.socketService.close();
        localStorage.removeItem(ID_TOKEN);
        this.router.navigate([LOGIN_SIMPLE]);
        this.chatBoxInteractionService.closePortal();
        this.chatBoxInteractionService.closeChat();
    }

    imageToBase64(path: string) {
        fetch(path)
            .then(async (response) => response.blob())
            .then((blob) => {
                const reader = new FileReader();

                // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Pourrait être plusieurs types de fichiers d'images
                reader.addEventListener('load', (event: any) => {
                    this.chosenAvatar = event.target.result;
                });

                reader.readAsDataURL(blob);
            })
            .catch(() => (this.errorImage = true));
    }

    private logoutWindowClose(): void {
        window.addEventListener('beforeunload', () => this.logout());
    }
}
