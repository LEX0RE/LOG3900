import { ComponentPortal, DomPortalOutlet } from '@angular/cdk/portal';
import { AfterViewInit, ApplicationRef, Component, ComponentFactoryResolver, Injector, OnDestroy } from '@angular/core';
import { TranslateContainer } from '@app/classes/translate-container/translate-container';
import { ChatBoxComponent } from '@app/components/chat/chat-box/chat-box.component';
import { OPEN_CHAT, OPEN_PORTAL } from '@app/constants/chat';
import { ChatBoxInteractionService } from '@app/services/chat-box-interaction/chat-box-interaction';
import { InvitationManagerService } from '@app/services/invitation-manager/invitation-manager.service';
import { MessageSenderService } from '@app/services/messages-sender/messages-sender.service';
import { SocialManagerService } from '@app/services/social-manager/social-manager.service';

/**
 * https://stackblitz.com/edit/angular-open-window-portal?file=src%2Fapp%2Fapp.component.ts
 * This component template wrap the projected content
 * with a 'cdkPortal'.
 */

@Component({
    selector: 'app-chat-window',
    templateUrl: './chat-window.component.html',
    styleUrls: ['./chat-window.component.scss'],
})
export class ChatWindowComponent implements OnDestroy, AfterViewInit {
    // STEP 1: get a reference to the portal
    chatBox: ComponentPortal<ChatBoxComponent>;
    chatBoxInteractionService: ChatBoxInteractionService;
    nbMessages: number;
    needNewChannel: boolean;
    chatToSend: string;
    translationsContainer: TranslateContainer;
    invitationManagerService: InvitationManagerService;
    socialManagerService: SocialManagerService;
    readonly chatBoxService: MessageSenderService;
    // STEP 2: save a reference to the window so we can close it
    private externalWindow: Window | null;

    // STEP 3: Inject all the required dependencies for a PortalHost
    // eslint-disable-next-line max-params, max-lines-per-function
    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private applicationRef: ApplicationRef,
        private injector: Injector,
        chatBoxInteractionService: ChatBoxInteractionService,
    ) {
        this.chatBoxInteractionService = chatBoxInteractionService;
        this.chatBoxInteractionService.eventEmitter.asObservable().subscribe((event: string) => {
            if (event === OPEN_CHAT) this.launchInternal();
        });
        this.chatBoxInteractionService.eventEmitter.asObservable().subscribe((event: string) => {
            if (event === OPEN_PORTAL) this.launchExternal();
        });
    }

    ngAfterViewInit() {
        this.chatBox = new ComponentPortal(ChatBoxComponent);
    }

    ngOnDestroy() {
        // STEP 7: close the window when this component destroyed
        this.externalWindow?.close();
    }

    // eslint-disable-next-line max-lines-per-function
    launchExternal() {
        if (this.chatBoxInteractionService.isPortalShow) {
            // STEP 4: create an external window
            this.externalWindow = window.open('', '', 'width=510,height=500,left=600,top=200,nodeIntegration=no');
            this.windowClose();

            // STEP 5: create a PortalHost with the body of the new window document
            if (this.externalWindow) {
                const host = new DomPortalOutlet(
                    this.externalWindow.document.body,
                    this.componentFactoryResolver,
                    this.applicationRef,
                    this.injector,
                );

                document.head.childNodes.forEach((child) => {
                    this.externalWindow?.document.head.appendChild(child.cloneNode(true));
                });

                document.body.querySelectorAll('link, style').forEach((htmlElement) => {
                    this.externalWindow?.document.body.appendChild(htmlElement.cloneNode(true));
                });

                const currentBodyStyle = document.body.getAttribute('style');

                if (currentBodyStyle) {
                    const otherStyle =
                        // eslint-disable-next-line max-len -- Nécessaire pour injecter les balises de CSS global du body
                        "height:100%; overflow:hidden; background-color:var(--background-color); margin:0; font-family: var(--font), 'Helvetica Neue', sans-serif;";

                    this.externalWindow?.document.body.setAttribute('style', currentBodyStyle + '; ' + otherStyle);
                }

                // STEP 6: Attach the portal
                host.attach(this.chatBox);
            }
        }
    }

    launchInternal() {
        if (this.externalWindow && this.chatBoxInteractionService.isChatShow) {
            // STEP 7: close the window when this component destroyed
            this.externalWindow.close();
            this.externalWindow = null;
        }
    }

    private windowClose(): void {
        this.externalWindow?.addEventListener('beforeunload', () => {
            this.chatBoxInteractionService.closePortal();
            this.externalWindow = null;
        });
    }
}
