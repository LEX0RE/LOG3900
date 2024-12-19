import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateContainer } from '@app/classes/translate-container/translate-container';
import { HttpRequestManagerService } from '@app/services/http-request-manager/http-request-manager.service';
import { GameHistories } from '@common/interfaces/replay/game-histories';
import { GameInfoHistory } from '@common/interfaces/replay/game-history';
import { UserConnectionInfo } from '@common/interfaces/user/user-connection-info';
import { UserConnections } from '@common/interfaces/user/user-connections';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-history-page',
    templateUrl: './history-page.component.html',
    styleUrls: ['./history-page.component.scss'],
})
export class HistoryPageComponent implements OnInit {
    @ViewChild('scrollConnexion') scrollConnexion: ElementRef;
    @ViewChild('scrollHistory') scrollHistory: ElementRef;
    translationsContainer: TranslateContainer;
    private gameHistories: GameHistories;
    private connections: UserConnections;
    private readonly httpManager: HttpRequestManagerService;

    get histories(): GameInfoHistory[] {
        return this.gameHistories.gameHistories;
    }

    get connectionsInfo(): UserConnectionInfo[] {
        return this.connections.connections;
    }

    constructor(translate: TranslateService, httpManager: HttpRequestManagerService) {
        this.httpManager = httpManager;
        this.gameHistories = { gameHistories: [] };
        this.translationsContainer = new TranslateContainer(translate, [
            'history',
            'connectionSummary',
            'action',
            'date',
            'time',
            'gameHistorySummary',
            'result',
            'replay',
            'return',
        ]);
    }

    ngOnInit(): void {
        this.httpManager.getHistory().subscribe({
            next: (value) => (this.gameHistories = value),
            error: () => (this.gameHistories = { gameHistories: [] }),
        });

        this.httpManager.getConnectionSummary().subscribe({
            next: (value) => (this.connections = value),
            error: () => (this.connections = { userId: '', connections: [] }),
        });
    }
}
