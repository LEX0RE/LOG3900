import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateContainer } from '@app/classes/translate-container/translate-container';
import { LOGIN, REGISTER } from '@app/constants/router-path';
import { AuthenticationService } from '@app/services/authentication/authentication.service';
import { ChatBoxInteractionService } from '@app/services/chat-box-interaction/chat-box-interaction';
import { InvitationManagerService } from '@app/services/invitation-manager/invitation-manager.service';
import { ProfileUpdaterManager } from '@app/services/profile-updater-manager/profile-updater-manager';
import { SocketClientService } from '@app/services/socket-client/socket-client.service';
import { ThemeManagerService } from '@app/services/theme-manager/theme-manager.service';
import { MAX_TIME_BEFORE_KICK } from '@common/constants/communication';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    router: Router;
    authenticationService: AuthenticationService;
    chatBoxInteractionService: ChatBoxInteractionService;
    socketService: SocketClientService;
    themeManager: ThemeManagerService;
    translationsContainer: TranslateContainer;
    translate: TranslateService;

    // eslint-disable-next-line max-params -- Importation de services
    private isWaitingLogin: boolean;
    // eslint-disable-next-line max-params, max-lines-per-function
    constructor(
        socketService: SocketClientService,
        router: Router,
        authenticationService: AuthenticationService,
        themeManager: ThemeManagerService,
        invitationManagerService: InvitationManagerService,
        translate: TranslateService,
        profileUpdater: ProfileUpdaterManager,
        chatBoxInteractionService: ChatBoxInteractionService,
    ) {
        this.socketService = socketService;
        this.authenticationService = authenticationService;
        this.router = router;
        this.chatBoxInteractionService = chatBoxInteractionService;
        this.themeManager = themeManager;
        invitationManagerService.wakeUp();
        this.translate = translate;
        translate.addLangs(['en', 'fr']);
        const language = localStorage.getItem('lang') || 'fr';

        translate.use(language);
        this.loadTranslation();
        profileUpdater.eventEmitter.asObservable().subscribe(() => this.loadTranslation());
        this.isWaitingLogin = false;
    }

    notOnAuthenticatePage(): boolean {
        return this.router.url !== LOGIN && this.router.url !== REGISTER;
    }

    needReLogin(): boolean {
        if (!this.socketService.isSocketAlive() && this.chatBoxInteractionService.isChatShow) this.chatBoxInteractionService.closeChat();
        if (this.isHacker() && !this.isWaitingLogin) this.startKickProcess();
        return this.isHacker();
    }

    swapChatShow() {
        if (this.chatBoxInteractionService.isChatShow) this.chatBoxInteractionService.closeChat();
        else this.chatBoxInteractionService.openChat();
    }

    private loadTranslation() {
        this.translationsContainer = new TranslateContainer(this.translate, ['logOut', 'serverNotResponding']);
    }

    private isHacker(): boolean {
        return !this.socketService.isSocketAlive() && this.notOnAuthenticatePage();
    }

    private startKickProcess(): void {
        const timeBetweenUpdate = 1000;
        // eslint-disable-next-line prefer-const, @typescript-eslint/no-explicit-any -- NodeJS.Timeout introuvable
        let timeoutId: any;
        // eslint-disable-next-line prefer-const, @typescript-eslint/no-explicit-any -- NodeJS.Timeout introuvable
        let intervalId: any;

        const clearAll = () => {
            this.isWaitingLogin = false;
            clearInterval(intervalId);
            clearTimeout(timeoutId);
        };

        timeoutId = setTimeout(() => {
            if (this.isHacker()) {
                this.router.navigate([LOGIN]);
                clearAll();
            }
        }, MAX_TIME_BEFORE_KICK);

        intervalId = setInterval(() => {
            if (!this.isHacker()) clearAll();
        }, timeBetweenUpdate);

        this.isWaitingLogin = true;
    }
}
