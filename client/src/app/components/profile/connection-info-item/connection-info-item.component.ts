import { Component, Input } from '@angular/core';
import { TranslateContainer } from '@app/classes/translate-container/translate-container';
import { ConnectionStatus } from '@common/enums/connection-status';
import { UserConnectionInfo } from '@common/interfaces/user/user-connection-info';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-connection-info-item',
    templateUrl: './connection-info-item.component.html',
    styleUrls: ['./connection-info-item.component.scss'],
})
export class ConnectionInfoItemComponent {
    @Input() connection: UserConnectionInfo;
    translationsContainer: TranslateContainer;

    constructor(translate: TranslateService) {
        this.translationsContainer = new TranslateContainer(translate, ['connection', 'disconnection']);
    }

    get date(): string {
        const date = new Date(this.connection.date);

        return date.toLocaleDateString();
    }

    get time(): string {
        const date = new Date(this.connection.date);

        return date.toLocaleTimeString();
    }

    get status(): string {
        if (this.connection.status === ConnectionStatus.Connected) return this.translationsContainer.get('connection');
        if (this.connection.status === ConnectionStatus.Disconnected) return this.translationsContainer.get('disconnection');
        return '';
    }
}
