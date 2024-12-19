import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateContainer } from '@app/classes/translate-container/translate-container';
import { MAX_CHARACTERS_PASSWORD, MIN_CHARACTERS_PASSWORD } from '@app/constants/borders-password-games';
import { DEFAULT_DICTIONARY, DEFAULT_INDEX_TURN_TIMES } from '@app/constants/new-configuration';
import { Dictionary } from '@app/interface/dictionary';
import { GameNavigationService } from '@app/services/game-navigation/game-navigation.service';
import { LobbyService } from '@app/services/lobby/lobby/lobby.service';
import { NewGameConfigurationService } from '@app/services/new-game-configuration/new-game-configuration.service';
import { INFINITY_TIMER } from '@common/constants/timer';
import { GameModes } from '@common/enums/game-modes';
import { CommonTimer } from '@common/interfaces/game-view-related/common-timer';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-new-game-configuration-page',
    templateUrl: './new-game-configuration-page.component.html',
    styleUrls: ['./new-game-configuration-page.component.scss'],
})
export class NewGameConfigurationComponent implements OnInit {
    readonly minCharactersPassword: number;
    readonly maxCharactersPassword: number;
    newGameConfigForm: FormGroup;
    turnTimes: CommonTimer[];
    dictionaries: Dictionary[];
    gameModes: string[];
    isPublic: boolean = true;
    hasPassword: boolean = false;
    turnTimeIndex: number;
    dictionaryDescription: string;
    gameModeSelected: string;
    translationsContainer: TranslateContainer;
    configSend: boolean;
    private newGameConfigurationService: NewGameConfigurationService;
    private formBuilder: FormBuilder;
    private readonly gameNavigation: GameNavigationService;

    // eslint-disable-next-line max-params, max-lines-per-function -- Importation de services
    constructor(
        translate: TranslateService,
        newGameConfigurationService: NewGameConfigurationService,
        formBuilder: FormBuilder,
        lobbyService: LobbyService,
        gameNavigation: GameNavigationService,
    ) {
        this.minCharactersPassword = MIN_CHARACTERS_PASSWORD;
        this.maxCharactersPassword = MAX_CHARACTERS_PASSWORD;
        this.newGameConfigurationService = newGameConfigurationService;
        this.formBuilder = formBuilder;
        this.gameNavigation = gameNavigation;
        this.dictionaries = [];
        this.turnTimes = [];
        this.translationsContainer = new TranslateContainer(translate, [
            'configureGameParameters',
            'dictionary',
            'dictionaryDescription',
            'gamemode',
            'turnTime',
            'createGame',
            'frenchDictionary',
            'createTournament',
            'configureTournament',
            'return',
            'publicGame',
            'password',
            'passwordHint1',
            'and',
            'passwordHint2',
        ]);
        this.gameNavigation = gameNavigation;
        this.gameModes = [];
        this.configSend = false;
        this.initNewGameConfig();
        lobbyService.wakeUp();
        lobbyService.reset();
    }

    ngOnInit(): void {
        this.turnTimeIndex = DEFAULT_INDEX_TURN_TIMES;
        this.fetchDictionaries();
        this.fetchTurnTimes();
        this.fetchGameModes();
    }

    openErrorCreatingGameOverlay(): boolean {
        return this.newGameConfigurationService.openErrorCreatingGameOverlay;
    }

    displayTurnDuration(): void {
        if (!this.turnTimes || !this.turnTimes.length) return;
        if (this.turnTimeIndex >= this.turnTimes.length) return;
        let timer: CommonTimer;

        if (this.gameNavigation.getGameMode() === GameModes.Cooperative) timer = INFINITY_TIMER;
        else timer = this.turnTimes[this.turnTimeIndex];
        const timeString: string = this.convertTimeToString(timer);

        this.newGameConfigForm.controls.turnDuration.setValue(timeString);
    }

    changeDictionaryDescription(): void {
        const dictionary: string | undefined = this.dictionaries.find(
            (dict: Dictionary) => dict.title === this.newGameConfigForm.value.dictionary,
        )?.description;

        if (dictionary) this.dictionaryDescription = dictionary;
    }

    onSubmit(): void {
        if (this.isReady()) {
            this.configSend = true;
            this.displayTurnDuration();
            this.newGameConfigurationService.createLobby(this.newGameConfigForm, this.turnTimes[this.turnTimeIndex]).then(
                () => (this.configSend = true),
                () => (this.configSend = false),
            );
        }
    }

    fetchDictionaries(): void {
        this.newGameConfigurationService.fetchDictionaries().subscribe((receivedDictionaries) => {
            this.dictionaries = receivedDictionaries;
            this.changeDictionaryDescription();
        });
    }

    fetchTurnTimes(): void {
        this.newGameConfigurationService.fetchTurnTimes().subscribe((receivedTurnTimes) => {
            this.turnTimes = receivedTurnTimes;
            this.displayTurnDuration();
        });
    }

    fetchGameModes(): void {
        this.newGameConfigurationService.fetchGameModes().subscribe((receivedGameModes) => {
            this.gameModes = receivedGameModes;
        });
    }

    incrementTurnDuration(): void {
        const upperBound = this.turnTimes.length;
        const potentialNewIndex = this.turnTimeIndex + 1;

        if (potentialNewIndex >= upperBound) return;
        this.turnTimeIndex = potentialNewIndex;
        this.displayTurnDuration();
    }

    decrementTurnDuration(): void {
        const lowerBound = 0;
        const potentialNewIndex = this.turnTimeIndex - 1;

        if (potentialNewIndex < lowerBound) return;
        this.turnTimeIndex = potentialNewIndex;
        this.displayTurnDuration();
    }

    changeVisibility(): void {
        this.isPublic = !this.isPublic;
        this.newGameConfigForm.controls.isPublic.setValue(this.isPublic);
        this.hasPassword = false;
        this.newGameConfigForm.controls.password.setValue('noPassword');
    }

    changeVisibilityPassword(): void {
        this.hasPassword = !this.hasPassword;
        this.newGameConfigForm.controls.hasPassword.setValue(this.hasPassword);
        if (this.hasPassword) this.newGameConfigForm.controls.password.setValue('');
        else this.newGameConfigForm.controls.password.setValue('noPassword');
    }

    isTournamentMode(): boolean {
        return this.gameNavigation.getGameMode() === GameModes.Tournament;
    }

    isReady(): boolean {
        return !this.configSend && this.turnTimes.length > 0 && this.dictionaries.length > 0 && this.gameModes.length > 0;
    }

    private initNewGameConfig(): void {
        this.newGameConfigForm = this.formBuilder.group({
            dictionary: [DEFAULT_DICTIONARY],
            turnDuration: [''],
            isPublic: true,
            hasPassword: false,
            password: [
                'noPassword',
                {
                    validators: [Validators.required, Validators.minLength(MIN_CHARACTERS_PASSWORD), Validators.maxLength(MAX_CHARACTERS_PASSWORD)],
                    updateOn: 'change',
                },
            ],
            gameMode: [this.gameNavigation.getGameMode()],
        });
    }

    private convertTimeToString(timer: CommonTimer): string {
        if (timer === INFINITY_TIMER) return '∞';
        return (
            timer.minute.toString() +
            ' min ' +
            timer.second.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false,
            }) +
            ' sec'
        );
    }
}
