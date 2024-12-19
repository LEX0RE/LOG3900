import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Dictionary } from '@app/interface/dictionary';
import { HttpRequestManagerService } from '@app/services/http-request-manager/http-request-manager.service';
import { GameVisibilities } from '@common/enums/game-visibilities';
import { CommonTimer } from '@common/interfaces/game-view-related/common-timer';
import { LobbyCreation } from '@common/interfaces/lobby/lobby-creation';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NewGameConfigurationService {
    openErrorCreatingGameOverlay: boolean;
    private httpRequestManagerService: HttpRequestManagerService;

    constructor(httpRequestManagerService: HttpRequestManagerService) {
        this.openErrorCreatingGameOverlay = false;
        this.httpRequestManagerService = httpRequestManagerService;
    }

    fetchTurnTimes(): Observable<CommonTimer[]> {
        return this.httpRequestManagerService.getTurnTimes();
    }

    fetchDictionaries(): Observable<Dictionary[]> {
        return this.httpRequestManagerService.getDictionaries();
    }

    fetchGameModes(): Observable<string[]> {
        return this.httpRequestManagerService.getGameModes();
    }

    async createLobby(form: FormGroup, turnTime: CommonTimer): Promise<void> {
        let visibility;

        // TODO ajout des autres champs
        if (!form.value.isPublic) visibility = GameVisibilities.Private;
        else if (!form.value.hasPassword) visibility = GameVisibilities.PublicNoPassword;
        else visibility = GameVisibilities.PublicPassword;

        const lobbyCreation: LobbyCreation = {
            gameConfig: { dictionaryTitle: form.value.dictionary, turnTimer: turnTime },
            gameMode: form.value.gameMode,
            visibility,
            invitedFriends: [],
        };

        if (visibility === GameVisibilities.PublicPassword) lobbyCreation.password = form.value.password;

        return new Promise((resolve, reject) => {
            this.httpRequestManagerService.createLobby(lobbyCreation).subscribe(
                () => resolve(),
                (error) => {
                    this.openErrorCreatingGameOverlay = true;
                    reject(error);
                },
            );
        });
    }
}
