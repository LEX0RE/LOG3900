import 'package:Scrabble/data/data_providers/authentication_provider.dart';
import 'package:Scrabble/data/data_providers/replay_provider.dart';
import 'package:Scrabble/data/data_providers/visibility_provider.dart';
import 'package:Scrabble/data/repositories/authentication_repository.dart';
import 'package:Scrabble/data/repositories/replay_repository.dart';
import 'package:Scrabble/data/repositories/visibility_repository.dart';
import 'package:Scrabble/logic/authentication/authentication_manager/authentication_manager_bloc.dart';
import 'package:Scrabble/logic/bracket/bracket_cubit.dart';
import 'package:Scrabble/logic/chat/chat_manager_bloc.dart';
import 'package:Scrabble/logic/command_sender/command_sender_cubit.dart';
import 'package:Scrabble/logic/end_game/end_game_cubit.dart';
import 'package:Scrabble/logic/end_tournament/end_tournament_cubit.dart';
import 'package:Scrabble/logic/game/game_cubit.dart';
import 'package:Scrabble/logic/game_info_holder/board_holder/board_holder_cubit.dart';
import 'package:Scrabble/logic/game_info_holder/easel_letter_holder/easel_letter_holder_cubit.dart';
import 'package:Scrabble/logic/game_info_holder/player_info_holder/player_info_holder_cubit.dart';
import 'package:Scrabble/logic/game_info_holder/stash_info/stash_info_cubit.dart';
import 'package:Scrabble/logic/game_info_holder/timer/timer_cubit.dart';
import 'package:Scrabble/logic/game_manager/game_manager_cubit.dart';
import 'package:Scrabble/logic/gamemode/gamemode_cubit.dart';
import 'package:Scrabble/logic/identity/identity_cubit.dart';
import 'package:Scrabble/logic/lobby/invitation/invitation_manager_bloc.dart';
import 'package:Scrabble/logic/lobby/lobby/lobby_cubit.dart';
import 'package:Scrabble/logic/notification/notification_cubit.dart';
import 'package:Scrabble/logic/observer/observer_cubit.dart';
import 'package:Scrabble/logic/overlay/game_password_overlay/game_password_cubit.dart';
import 'package:Scrabble/logic/overlay/join-request/join_request_cubit.dart';
import 'package:Scrabble/logic/overlay/join_response/join_response_cubit.dart';
import 'package:Scrabble/logic/profile/language/language_cubit.dart';
import 'package:Scrabble/logic/profile/replay/replay_cubit.dart';
import 'package:Scrabble/logic/social/social_box_interaction.dart';
import 'package:Scrabble/logic/social/social_manager_bloc.dart';
import 'package:Scrabble/logic/socket/socket_manager_bloc.dart';
import 'package:Scrabble/logic/tournament/tournament_cubit.dart';
import 'package:Scrabble/view/router/app_router.dart';
import 'package:Scrabble/view/theme/cubit/theme_cubit.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:flutter_localizations/flutter_localizations.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();

  SystemChrome.setPreferredOrientations([
    DeviceOrientation.landscapeLeft,
    DeviceOrientation.landscapeRight,
  ]);
  runApp(MyApp(
    appRouter: AppRouter(),
  ));
}

class MyApp extends StatelessWidget {
  final AppRouter appRouter;

  const MyApp({
    Key? key,
    required this.appRouter,
  }) : super(key: key);

  @override
  Widget build(BuildContext myAppContext) => MultiBlocProvider(
        providers: [
          BlocProvider<ThemeCubit>(
            lazy: false,
            create: (context) => ThemeCubit(),
          ),
          BlocProvider(lazy: false, create: (context) => LanguageCubit()),
          BlocProvider(
            create: (context) =>
                IdentityHolder(BlocProvider.of<ThemeCubit>(context), BlocProvider.of<LanguageCubit>(context)),
            lazy: false,
          ),
          BlocProvider(
            create: (context) => AuthenticationManagerBloc(
                authenticationRepository: AuthenticationRepository(
                  authenticationProvider: AuthenticationProvider(identity: BlocProvider.of<IdentityHolder>(context)),
                ),
                identityHolder: BlocProvider.of<IdentityHolder>(context)),
            lazy: false,
          ),
          BlocProvider(
            create: (context) => SocketManagerBloc(
                identityHolder: BlocProvider.of<IdentityHolder>(context),
                authenticationManager: BlocProvider.of<AuthenticationManagerBloc>(context)),
            lazy: false,
          ),
          BlocProvider(
            create: (context) => NotificationCubit(),
            lazy: false,
          ),
          BlocProvider(
            create: (context) => ChatManagerBloc(
                TextEditingController(),
                BlocProvider.of<SocketManagerBloc>(context),
                BlocProvider.of<IdentityHolder>(context),
                ScrollController(),
                FocusNode(),
                BlocProvider.of<NotificationCubit>(context)),
            lazy: false,
          ),
          BlocProvider(
              create: (context) => CommandSenderCubit(BlocProvider.of<SocketManagerBloc>(context)), lazy: false),
          BlocProvider(
            create: (context) => ObserverCubit(BlocProvider.of<SocketManagerBloc>(context)),
            lazy: false,
          ),
          BlocProvider(create: (context) => EndGameCubit(BlocProvider.of<SocketManagerBloc>(context)), lazy: false),
          BlocProvider(
              create: (context) => EndTournamentCubit(BlocProvider.of<SocketManagerBloc>(context)), lazy: false),
          BlocProvider(create: (context) => GamemodeCubit(), lazy: false),
          BlocProvider(create: (context) => LobbyCubit(context.read<SocketManagerBloc>()), lazy: false),
          BlocProvider(create: (context) => GameManagerCubit(BlocProvider.of<SocketManagerBloc>(context)), lazy: false),
          BlocProvider(lazy: false, create: (context) => GameCubit(context.read<SocketManagerBloc>())),
          BlocProvider(lazy: false, create: (context) => TournamentCubit()),
          BlocProvider(lazy: false, create: (context) => BracketCubit(BlocProvider.of<SocketManagerBloc>(context))),
          BlocProvider(lazy: false, create: (context) => BoardHolderCubit(BlocProvider.of<SocketManagerBloc>(context))),
          BlocProvider(
              lazy: false, create: (context) => EaselLetterHolderCubit(BlocProvider.of<SocketManagerBloc>(context))),
          BlocProvider(
            create: (context) => SocialManagerBloc(
                BlocProvider.of<SocketManagerBloc>(context), BlocProvider.of<IdentityHolder>(context), FocusNode()),
            lazy: false,
          ),
          BlocProvider(
            create: (context) => InvitationManagerBloc(
                BlocProvider.of<SocketManagerBloc>(context), BlocProvider.of<IdentityHolder>(context)),
            lazy: false,
          ),
          BlocProvider(
            create: (context) => SocialInteraction(),
            lazy: false,
          ),
          BlocProvider(
              lazy: false, create: (context) => PlayerInfoHolderCubit(BlocProvider.of<SocketManagerBloc>(context))),
          BlocProvider(lazy: false, create: (context) => StashInfoCubit(BlocProvider.of<SocketManagerBloc>(context))),
          BlocProvider(lazy: false, create: (context) => TimerCubit(BlocProvider.of<SocketManagerBloc>(context))),
          BlocProvider(
            lazy: false,
            create: (context) => ReplayCubit(
                ReplayRepository(replayProvider: ReplayProvider(identity: BlocProvider.of<IdentityHolder>(context))),
                BlocProvider.of<IdentityHolder>(context),
                BlocProvider.of<SocketManagerBloc>(context)),
          ),
          BlocProvider(
            lazy: false,
            create: (blocContext) => JoinRequestCubit(blocContext.read<SocketManagerBloc>()),
          ),
          BlocProvider(
            lazy: false,
            create: (blocContext) => JoinResponseCubit(blocContext.read<SocketManagerBloc>()),
          ),
          BlocProvider(
            lazy: false,
            create: (blocContext) => GamePasswordCubit(
                VisibilityRepository(
                    visibilityProvider: VisibilityProvider(identity: BlocProvider.of<IdentityHolder>(blocContext))),
                blocContext.read<SocketManagerBloc>()),
          )
        ],
        child: Builder(
          builder: (BuildContext context) {
            final themeState = context.watch<ThemeCubit>().state;
            final languageState = context.watch<LanguageCubit>().state;

            return MaterialApp(
              title: 'Scrabble',
              theme: themeState.theme,
              locale: languageState.language,
              onGenerateRoute: appRouter.onGenerateRoute,
              localizationsDelegates: const [
                AppLocalizations.delegate,
                GlobalMaterialLocalizations.delegate,
                GlobalWidgetsLocalizations.delegate,
                GlobalCupertinoLocalizations.delegate,
              ],
              supportedLocales: const [
                Locale('en'),
                Locale('fr'),
              ],
            );
          },
        ),
      );
}
