import 'package:Scrabble/data/models/enums/game_modes.dart';
import 'package:Scrabble/logic/command_sender/command_sender_cubit.dart';
import 'package:Scrabble/logic/cooperative_game_approval/cooperative_game_approval_cubit.dart';
import 'package:Scrabble/logic/form/blank_letter_form/blank_letter_form_cubit.dart';
import 'package:Scrabble/logic/game/game_cubit.dart';
import 'package:Scrabble/logic/game_info_holder/board_holder/board_holder_cubit.dart';
import 'package:Scrabble/logic/game_info_holder/easel_letter_holder/easel_letter_holder_cubit.dart';
import 'package:Scrabble/logic/game_info_holder/placement/placement_cubit.dart';
import 'package:Scrabble/logic/game_info_holder/trade/trade_cubit.dart';
import 'package:Scrabble/logic/gamemode/gamemode_cubit.dart';
import 'package:Scrabble/logic/hint_preview/hint_display/hint_display_cubit.dart';
import 'package:Scrabble/logic/hint_preview/hint_preview_cubit.dart';
import 'package:Scrabble/logic/overlay/end_game_overlay/end_game_overlay_cubit.dart';
import 'package:Scrabble/logic/overlay/game_continue_overlay/game_continue_overlay_cubit.dart';
import 'package:Scrabble/logic/overlay/loading_game_overlay/loading_game_overlay_cubit.dart';
import 'package:Scrabble/logic/overlay/surrender_overlay/surrender_overlay_cubit.dart';
import 'package:Scrabble/logic/socket/socket_manager_bloc.dart';
import 'package:Scrabble/view/screens/observe_screen.dart';
import 'package:Scrabble/view/widget/board_game/hint/hint_panel.dart';
import 'package:Scrabble/view/widget/board_game/player_column.dart';
import 'package:Scrabble/view/widget/board_game/scrabble_column.dart';
import 'package:Scrabble/view/widget/board_game/scrabble_parameters.dart';
import 'package:Scrabble/view/widget/overlay/cooperative_approval_overlay/cooperative_approval_overlay.dart';
import 'package:Scrabble/view/widget/overlay/game_overlay.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class GameScreen extends StatelessWidget {
  const GameScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext gameScreenContext) {
    final GameModesEnum gameMode = gameScreenContext.watch<GamemodeCubit>().state.gamemode;
    return MultiBlocProvider(
      providers: [
        BlocProvider(
          lazy: false,
          create: (_) => BlankLetterFormCubit(
              blankLetterController: TextEditingController(),
              localizations: AppLocalizations.of(gameScreenContext),
              focusNode: FocusNode()),
        ),
        BlocProvider(
            lazy: false,
            create: (context) => PlacementCubit(
                  BlocProvider.of<SocketManagerBloc>(context),
                  BlocProvider.of<BlankLetterFormCubit>(context),
                  BlocProvider.of<EaselLetterHolderCubit>(context),
                  BlocProvider.of<CommandSenderCubit>(context),
                  BlocProvider.of<BoardHolderCubit>(context),
                )),
        BlocProvider(
          create: (context) => TradeCubit(
            BlocProvider.of<SocketManagerBloc>(context),
            BlocProvider.of<EaselLetterHolderCubit>(context),
            BlocProvider.of<CommandSenderCubit>(context),
          ),
        ),
        BlocProvider(
            create: (context) => EndGameOverlayCubit(BlocProvider.of<SocketManagerBloc>(context)), lazy: false),
        BlocProvider(
            create: (context) => LoadingGameOverlayCubit(BlocProvider.of<SocketManagerBloc>(context)), lazy: false),
        BlocProvider(
            create: (context) => GameContinueOverlayCubit(BlocProvider.of<SocketManagerBloc>(context)), lazy: false),
        BlocProvider(
            create: (context) => SurrenderOverlayCubit(BlocProvider.of<SocketManagerBloc>(context)), lazy: false),
        BlocProvider(
          lazy: false,
          create: (BuildContext context) => CooperativeGameApprovalCubit(
            context.read<SocketManagerBloc>(),
            context.read<PlacementCubit>(),
            context.read<TradeCubit>(),
            context.read<CommandSenderCubit>(),
          ),
        ),
        BlocProvider(
          lazy: false,
          create: (BuildContext context) => HintPreviewCubit(context.read<SocketManagerBloc>(),
              context.read<PlacementCubit>(), AppLocalizations.of(gameScreenContext)),
        ),
        BlocProvider(
          lazy: false,
          create: (BuildContext context) => HintDisplayCubit(
            context.read<HintPreviewCubit>(),
            AppLocalizations.of(gameScreenContext),
            context.read<CommandSenderCubit>(),
            context.read<GameCubit>(),
          ),
        ),
      ],
      child: Stack(
        children: [
          const GameOverlay(),
          Scaffold(
            body: Row(
              mainAxisSize: MainAxisSize.max,
              children: [
                Flexible(flex: 1, child: PlayerColumn()),
                Flexible(flex: 2, child: ScrabbleColumn(isObservationPage)),
                Flexible(flex: 1, child: ScrabbleParameters(isObservationPage))
              ],
            ),
          ),
          if (gameMode.value == GameModes.COOPERATIVE)
            const Positioned(
              bottom: 10,
              right: 0,
              width: 320,
              height: 320,
              child: CooperativeApprovalOverLay(
                width: 320,
                height: 320,
              ),
            ),
          const Positioned(
            top: 230,
            right: 0,
            width: 320,
            height: 220,
            child: HintPanel(
              width: 320,
              height: 220,
            ),
          ),
        ],
      ),
    );
  }

  bool isObservationPage(BuildContext context) {
    if (context.findAncestorWidgetOfExactType<ObserveScreen>() != null) {
      return true;
    }
    return false;
  }
}
