import { Component, EventEmitter, Output } from '@angular/core';
import { DEFAULT_AVATAR_PATH } from '@app/constants/default-avatar';
import { ImageSelected } from '@app/interface/image-selected';
import { AuthenticationService } from '@app/services/authentication/authentication.service';
import { TranslateContainer } from '@client/src/app/classes/translate-container/translate-container';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-avatar',
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent {
    @Output() closing: EventEmitter<boolean>;
    defaultPicture: ImageSelected[];
    authenticationService: AuthenticationService;
    errorImage: boolean;
    translationsContainer: TranslateContainer;

    constructor(authenticationService: AuthenticationService, translate: TranslateService) {
        this.authenticationService = authenticationService;
        this.defaultPicture = DEFAULT_AVATAR_PATH;
        this.errorImage = false;
        this.translationsContainer = new TranslateContainer(translate, [
            'errorSubmittingImage',
            'selectYourAvatar',
            'errorSubmittingAvatar',
            'close',
        ]);
        this.closing = new EventEmitter<boolean>();
    }

    closeAvatarOverlay(): void {
        this.authenticationService.avatarOverlayOpen = false;
        this.sendClosingEvent();
    }

    // Source : https://www.freecodecamp.org/news/how-to-make-image-upload-easy-with-angular-1ed14cb2773b/
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Pourrait être plusieurs types de fichiers d'images
    processFile(imageInput: any) {
        const file: File = imageInput.files[0];
        const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

        if (!validImageTypes.includes(file['type'])) {
            this.errorImage = true;
        } else {
            const reader = new FileReader();

            // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Pourrait être plusieurs types de fichiers d'images
            reader.addEventListener('load', (event: any) => {
                this.authenticationService.chosenAvatar = event.target.result;
            });

            reader.readAsDataURL(file);
            this.defaultPicture.forEach((image) => (image.isSelected = false));

            this.errorImage = false;
        }
    }

    selectImage(path: string, i: number) {
        this.authenticationService.imageToBase64(path);

        this.defaultPicture.forEach((image) => (image.isSelected = false));
        this.defaultPicture[i].isSelected = true;
        this.errorImage = false;
    }

    sendClosingEvent(): void {
        this.closing.emit(true);
    }
}
