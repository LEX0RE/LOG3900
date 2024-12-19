import 'package:Scrabble/constants/keys.dart';
import 'package:Scrabble/constants/route.dart';
import 'package:Scrabble/data/data_providers/user_provider.dart';
import 'package:Scrabble/data/repositories/user_repository.dart';
import 'package:Scrabble/logic/identity/identity_cubit.dart';
import 'package:Scrabble/logic/profile/profile_form_manager/profile_form_manager_cubit.dart';
import 'package:Scrabble/view/router/router_manager.dart';
import 'package:Scrabble/view/screens/friends_screen.dart';
import 'package:Scrabble/view/screens/game/game_screen.dart';
import 'package:Scrabble/view/screens/game/tournament_screen.dart';
import 'package:Scrabble/view/screens/home_screen.dart';
import 'package:Scrabble/view/screens/lobby/create_game_screen.dart';
import 'package:Scrabble/view/screens/lobby/joinable_lobbies_screen.dart';
import 'package:Scrabble/view/screens/lobby/lobby_screen.dart';
import 'package:Scrabble/view/screens/login_screen.dart';
import 'package:Scrabble/view/screens/observe_screen.dart';
import 'package:Scrabble/view/screens/profile/history_screen.dart';
import 'package:Scrabble/view/screens/profile/profile_screen.dart';
import 'package:Scrabble/view/screens/profile/replay_screen.dart';
import 'package:Scrabble/view/screens/profile/statistic_screen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class AppRouter {
  Route onGenerateRoute(RouteSettings settings) {
    switch (settings.name) {
      case HOME_PATH:
        return MaterialPageRoute(builder: (context) => RouterManagerWidget(child: HomeScreen(key: HOME_SCREEN)));
      case PROFILE_PATH:
        return MaterialPageRoute(
            builder: (context) => RouterManagerWidget(
                child: BlocProvider(
                    create: (context) => ProfileFormManagerCubit(
                        BlocProvider.of<IdentityHolder>(context),
                        UserRepository(
                            userProvider: UserProvider(identity: BlocProvider.of<IdentityHolder>(context)),
                            identityHolder: BlocProvider.of<IdentityHolder>(context))),
                    child: const ProfileScreen(key: PROFILE_SCREEN))));
      case STATISTICS_PATH:
        return MaterialPageRoute(
            builder: (context) => const RouterManagerWidget(child: StatisticScreen(key: STATISTICS_SCREEN_KEY)));
      case NEW_GAME_CONFIGURATION_PATH:
        return MaterialPageRoute(
            builder: (context) => const RouterManagerWidget(child: CreateGameScreen(key: GAME_CONFIGURATION_SCREEN)));
      case GAME_SCREEN_PATH:
        return MaterialPageRoute(builder: (context) => RouterManagerWidget(child: GameScreen(key: GAME_SCREEN_KEY)));
      case BRACKET_SCREEN_PATH:
        return MaterialPageRoute(
            builder: (context) => const RouterManagerWidget(child: TournamentScreen(key: TOURNAMENT_SCREEN_KEY)));
      case OBSERVE_PATH:
        return MaterialPageRoute(
            builder: (context) => const RouterManagerWidget(child: ObserveScreen(key: OBSERVE_SCREEN_KEY)));
      case JOINABLE_LOBBIES_PATH:
        return MaterialPageRoute(
            builder: (context) =>
                const RouterManagerWidget(child: JoinableLobbiesScreen(key: JOINABLE_LOBBIES_SCREEN)));
      case LOBBY_PATH:
        return MaterialPageRoute(builder: (context) => const RouterManagerWidget(child: LobbyScreen()));
      case HISTORY_PATH:
        return MaterialPageRoute(
            builder: (context) => RouterManagerWidget(child: HistoryScreen(key: HISTORY_SCREEN_KEY)));
      case REPLAY_PATH:
        return MaterialPageRoute(
            builder: (context) => RouterManagerWidget(child: ReplayScreen(key: REPLAY_SCREEN_KEY)));
      case FRIENDS_PATH:
        return MaterialPageRoute(
            builder: (context) => RouterManagerWidget(child: FriendsScreen(key: FRIENDS_SCREEN_KEY)));
      case ROOT_PATH:
      case LOGIN_PATH:
      default:
        return MaterialPageRoute(builder: (context) => RouterManagerWidget(child: LoginScreen(key: LOGIN_SCREEN)));
    }
  }
}
