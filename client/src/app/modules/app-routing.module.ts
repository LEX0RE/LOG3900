import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LOGIN } from '@app/constants/router-path';
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

const routes: Routes = [
    { path: '', redirectTo: LOGIN, pathMatch: 'full' },
    { path: 'login', component: AuthenticationComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'home', component: EntryPointPageComponent },
    { path: 'game', component: GamePageComponent },
    { path: 'createNewGame', component: NewGameConfigurationComponent },
    { path: 'social', component: SocialComponent },
    { path: 'joinGame', component: JoinMultiplayerGameComponent },
    { path: 'profile', component: UserProfilePageComponent },
    { path: 'lobby', component: LobbyComponent, pathMatch: 'full' },
    { path: 'history', component: HistoryPageComponent },
    { path: 'replay', component: ReplayPageComponent },
    { path: 'observe', component: ObservationPageComponent },
    { path: 'statistic', component: StatisticPageComponent },
    { path: 'bracket', component: TournamentBracketComponent },
    { path: '**', redirectTo: LOGIN },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {})],
    exports: [RouterModule],
})
export class AppRoutingModule {}

export const ROUTING_TESTING_MODULE = () => RouterTestingModule.withRoutes(routes);
