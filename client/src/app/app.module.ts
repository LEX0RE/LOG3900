import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderBoxComponent } from '@app//components/chat/header-box/header-box.component';
import { AuthInterceptorService } from '@app//services/auth-interceptor/auth-interceptor.service';
import { AppComponent } from '@app/app.component';
import { ApprovalPanelComponent } from '@app/components/approval-panel/approval-panel.component';
import { BracketLineComponent } from '@app/components/bracket/bracket-line/bracket-line.component';
import { BracketNodeComponent } from '@app/components/bracket/bracket-node/bracket-node.component';
import { BracketPlayerComponent } from '@app/components/bracket/bracket-player/bracket-player.component';
import { BracketTreeComponent } from '@app/components/bracket/bracket-tree/bracket-tree.component';
import { ChannelJoinedBoxComponent } from '@app/components/chat/channel-joined-box/channel-joined-box.component';
import { ChatBoxComponent } from '@app/components/chat/chat-box/chat-box.component';
import { ChatWindowComponent } from '@app/components/chat/chat-window/chat-window.component';
import { InputBoxComponent } from '@app/components/chat/input-box/input-box.component';
import { InvitationBoxComponent } from '@app/components/chat/invitation-box/invitation-box.component';
import { OutputBoxComponent } from '@app/components/chat/output-box/output-box.component';
import { SearchChannelBoxComponent } from '@app/components/chat/search-channel-box/search-channel-box.component';
import { EaselComponent } from '@app/components/easel/easel.component';
import { FriendsInvitationComponent } from '@app/components/friends-invitation/friends-invitation.component';
import { HintButtonComponent } from '@app/components/hint-button/hint-button.component';
import { HintElementComponent } from '@app/components/hint-element/hint-element.component';
import { HomeButtonComponent } from '@app/components/home-button/home-button.component';
import { InfoPanelObserverComponent } from '@app/components/informative-panel/info-panel-observer/info-panel-observer.component';
import { InformativePanelComponent } from '@app/components/informative-panel/informative-panel.component';
import { LanguagePickerComponent } from '@app/components/language-picker/language-picker.component';
import { LetterComponent } from '@app/components/letter/letter.component';
import { LobbyClassicItemComponent } from '@app/components/lobby-classic-item/lobby-classic-item.component';
import { AvatarComponent } from '@app/components/overlay/avatar/avatar.component';
import { BlankFormOverlayComponent } from '@app/components/overlay/blank-form-overlay/blank-form-overlay.component';
import { EndTournamentOverlayComponent } from '@app/components/overlay/end-tournament-overlay/end-tournament-overlay.component';
import { ErrorCreatingGameComponent } from '@app/components/overlay/error-creating-game/error-creating-game.component';
import { GameContinueComponent } from '@app/components/overlay/game-continue/game-continue.component';
import { GameLoadingComponent } from '@app/components/overlay/game-loading/game-loading.component';
import { JoinRequestComponent } from '@app/components/overlay/join-request/join-request.component';
import { ObserverOverlayComponent } from '@app/components/overlay/observer/observer-overlay.component';
import { ReplayOverlayComponent } from '@app/components/overlay/replay-overlay/replay-overlay.component';
import { SurrenderTournamentComponent } from '@app/components/overlay/surrender-tournament/surrender-tournament.component';
import { SurrenderComponent } from '@app/components/overlay/surrender/surrender.component';
import { WinnerAnnouncementComponent } from '@app/components/overlay/winner-announcement/winner-announcement.component';
import { PlayAreaComponent } from '@app/components/play-area/play-area.component';
import { PlayerInformationComponent } from '@app/components/player-information/player-information.component';
import { ConnectionInfoItemComponent } from '@app/components/profile/connection-info-item/connection-info-item.component';
import { GameStatisticItemComponent } from '@app/components/profile/game-statistic-item/game-statistic-item.component';
import { HistoryItemComponent } from '@app/components/profile/history-item/history-item.component';
import { ThemePickerComponent } from '@app/components/profile/theme-picker/theme-picker.component';
import { TournamentStatisticItemComponent } from '@app/components/profile/tournament-statistic-item/tournament-statistic-item.component';
import { DebounceClickDirective } from '@app/directives/debounce/click/debounce-click.directive';
import { DebounceKeyPressedDirective } from '@app/directives/debounce/keyboard/debounce-key-pressed.directive';
import { DebounceRightClickDirective } from '@app/directives/debounce/right-click/debounce-right-click.directive';
import { AppRoutingModule } from '@app/modules/app-routing.module';
import { AuthenticationComponent } from '@app/pages/authentication/authentication.component';
import { EntryPointPageComponent } from '@app/pages/entry-point/entry-point-page.component';
import { GamePageComponent } from '@app/pages/game/game-page.component';
import { HistoryPageComponent } from '@app/pages/history-page/history-page.component';
import { JoinMultiplayerGameComponent } from '@app/pages/join-multiplayer-game/join-multiplayer-game-page.component';
import { LobbyComponent } from '@app/pages/lobby/lobby.component';
import { NewGameConfigurationComponent } from '@app/pages/new-game-configuration/new-game-configuration-page.component';
import { ObservationPageComponent } from '@app/pages/observation/observation-page.component';
import { RegistrationComponent } from '@app/pages/registration/registration.component';
import { ReplayPageComponent } from '@app/pages/replay-page/replay-page.component';
import { SocialComponent } from '@app/pages/social/social.component';
import { StatisticPageComponent } from '@app/pages/statistic-page/statistic-page.component';
import { TournamentBracketComponent } from '@app/pages/tournament/bracket/bracket.component';
import { UserProfilePageComponent } from '@app/pages/user-profile/user-profile.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// AoT requires an exported function for factories
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions, @typescript-eslint/naming-convention -- required by angular
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const translationModule = TranslateModule.forRoot({
    loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
    },
});

@NgModule({
    declarations: [
        AppComponent,
        ChannelJoinedBoxComponent,
        GamePageComponent,
        PlayAreaComponent,
        InputBoxComponent,
        ChatBoxComponent,
        SearchChannelBoxComponent,
        HeaderBoxComponent,
        OutputBoxComponent,
        InformativePanelComponent,
        LetterComponent,
        SurrenderComponent,
        PlayerInformationComponent,
        FriendsInvitationComponent,
        EntryPointPageComponent,
        SocialComponent,
        HomeButtonComponent,
        NewGameConfigurationComponent,
        JoinMultiplayerGameComponent,
        ErrorCreatingGameComponent,
        EaselComponent,
        InvitationBoxComponent,
        DebounceClickDirective,
        DebounceKeyPressedDirective,
        DebounceRightClickDirective,
        WinnerAnnouncementComponent,

        HintButtonComponent,
        AvatarComponent,
        GameLoadingComponent,
        AuthenticationComponent,
        UserProfilePageComponent,
        ThemePickerComponent,
        RegistrationComponent,
        LobbyComponent,
        LobbyClassicItemComponent,
        JoinRequestComponent,
        ApprovalPanelComponent,
        HistoryPageComponent,
        HistoryItemComponent,
        ReplayPageComponent,
        ReplayOverlayComponent,
        ObserverOverlayComponent,
        ObservationPageComponent,
        InfoPanelObserverComponent,
        ChatWindowComponent,
        TournamentBracketComponent,
        BracketNodeComponent,
        BracketTreeComponent,
        BracketLineComponent,
        BracketPlayerComponent,
        LanguagePickerComponent,
        GameContinueComponent,
        ConnectionInfoItemComponent,
        StatisticPageComponent,
        GameStatisticItemComponent,
        TournamentStatisticItemComponent,
        BlankFormOverlayComponent,
        SurrenderTournamentComponent,
        HintElementComponent,
        EndTournamentOverlayComponent,
    ],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        DragDropModule,
        ReactiveFormsModule,
        translationModule,
        PortalModule,
    ],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
    bootstrap: [AppComponent],
})
export class AppModule {}
