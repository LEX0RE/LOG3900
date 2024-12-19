import 'package:Scrabble/constants/easel.dart';
import 'package:Scrabble/data/models/enums/action_type.dart';
import 'package:Scrabble/data/models/enums/game_modes.dart';
import 'package:Scrabble/data/models/interfaces/game_info/common_timer.dart';
import 'package:Scrabble/logic/command_sender/command_sender_cubit.dart';
import 'package:Scrabble/logic/cooperative_game_approval/cooperative_game_approval_cubit.dart';
import 'package:Scrabble/logic/end_game/end_game_cubit.dart';
import 'package:Scrabble/logic/game_info_holder/placement/placement_cubit.dart';
import 'package:Scrabble/logic/game_info_holder/player_info_holder/player_info_holder_cubit.dart';
import 'package:Scrabble/logic/game_info_holder/stash_info/stash_info_cubit.dart';
import 'package:Scrabble/logic/game_info_holder/timer/timer_cubit.dart';
import 'package:Scrabble/logic/game_info_holder/trade/trade_cubit.dart';
import 'package:Scrabble/logic/gamemode/gamemode_cubit.dart';
import 'package:Scrabble/logic/hint_preview/hint_display/hint_display_cubit.dart';
import 'package:Scrabble/logic/profile/replay/replay_cubit.dart';
import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:Scrabble/view/widget/chat/chat.dart';
import 'package:Scrabble/view/widget/scrabble_widget/button.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class ScrabbleParameters extends StatefulWidget {
  final Function(BuildContext) isObservationPage;
  const ScrabbleParameters(this.isObservationPage, {Key? key}) : super(key: key);

  @override
  // ignore: no_logic_in_create_state
  ScrabbleParametersState createState() => ScrabbleParametersState(
        isObservationPage,
      );
}

class ScrabbleParametersState extends State<ScrabbleParameters> {
  late CommandSenderCubit commandSenderCubit;
  late ColorExtension themeColors;
  final Function(BuildContext) isObservationPage;

  ScrabbleParametersState(this.isObservationPage);

  @override
  Widget build(BuildContext context) {
    commandSenderCubit = context.watch<CommandSenderCubit>();
    themeColors = Theme.of(context).extension<ColorExtension>()!;

    return Stack(
      children: [
        Column(
          children: [
            Flexible(flex: 100, child: clockAndBag(context)),
            Flexible(flex: 1, child: bar()),
            Flexible(flex: 100, child: isObservationPage(context) ? Container() : buttons(context)),
          ],
        ),
        Chat(),
      ],
    );
  }

  Widget clockAndBag(BuildContext context) {
    return Column(
      children: [
        Flexible(flex: 2, child: clock(context)),
        Flexible(
          flex: 1,
          child: bag(),
        )
      ],
    );
  }

  Widget bar() => Container(decoration: BoxDecoration(color: themeColors.separator));

  Widget buttons(BuildContext context) {
    final AppLocalizations localization = AppLocalizations.of(context);
    final PlacementCubit placementCubit = context.watch<PlacementCubit>();
    final EndGameCubit endGameCubit = context.watch<EndGameCubit>();
    final GameModesEnum gameMode = context.watch<GamemodeCubit>().state.gamemode;
    final CooperativeGameApprovalCubit cooperativeCubit = context.watch<CooperativeGameApprovalCubit>();

    return Container(
      height: 280,
      alignment: Alignment.bottomCenter,
      child: Column(
        children: [
          const SizedBox(height: 20),
          Flexible(
            flex: 5,
            child: Container(
              margin: const EdgeInsets.only(top: 20, bottom: 20),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  Expanded(child: tradeButton(context)),
                  Expanded(child: hintButton(context)),
                ],
              ),
            ),
          ),
          Flexible(
            flex: 2,
            child: Container(
              margin: const EdgeInsets.only(bottom: 10),
              width: double.infinity,
              height: double.infinity,
              child: ScrabbleButtonWidget(
                text: gameMode.value == GameModes.COOPERATIVE ? localization.propose : localization.place,
                onPressed: () {
                  if (gameMode.value == GameModes.COOPERATIVE) return cooperativeCubit.sendPlacementProposition();
                  placementCubit.sendPlacement();
                },
                isEnabled: (context) {
                  return context.watch<PlayerInfoHolderCubit>().isPlayerTurn() &&
                      context.watch<PlacementCubit>().isPlacementValid() &&
                      !endGameCubit.canLeave();
                },
              ),
            ),
          ),
          Flexible(
            flex: 2,
            child: Container(
              width: double.infinity,
              height: double.infinity,
              margin: const EdgeInsets.only(top: 10),
              child: ScrabbleButtonWidget(
                  text: localization.pass,
                  onPressed: () {
                    if (gameMode.value == GameModes.COOPERATIVE) return cooperativeCubit.sendPassProposition();
                    commandSenderCubit.sendCommand(actionTypeToString(ActionType.SKIP_TURN));
                  },
                  isEnabled: (context) =>
                      context.watch<PlayerInfoHolderCubit>().isPlayerTurn() &&
                      !endGameCubit.canLeave() &&
                      !context.watch<CooperativeGameApprovalCubit>().state.isActionProposedByMe),
            ),
          ),
        ],
      ),
    );
  }

  Widget hintButton(BuildContext context) {
    final isTurn = context.watch<PlayerInfoHolderCubit>().isPlayerTurn();
    final EndGameCubit endGameCubit = context.watch<EndGameCubit>();
    final HintDisplayCubit hintDisplayCubit = context.watch<HintDisplayCubit>();

    return Container(
      margin: const EdgeInsets.only(left: 50, right: 50),
      child: TextButton(
        onPressed: isTurn && !endGameCubit.canLeave() ? () => hintDisplayCubit.sendHint() : null,
        style: buttonStyle(),
        child: Image.asset(
          'lib/assets/images/bulb_off.png',
          scale: 1,
        ),
      ),
    );
  }

  Widget tradeButton(BuildContext context) {
    final trade = context.watch<TradeCubit>();
    final isTurn = context.watch<PlayerInfoHolderCubit>().isPlayerTurn();
    final bool tradingAllowed = (context.watch<StashInfoCubit>().stash?.nLettersLeft ?? 0) > MAX_NUMBER_OF_LETTER;
    final EndGameCubit endGameCubit = BlocProvider.of<EndGameCubit>(context);
    final GameModesEnum gameMode = context.watch<GamemodeCubit>().state.gamemode;
    final CooperativeGameApprovalCubit cooperativeCubit = context.watch<CooperativeGameApprovalCubit>();

    return Container(
      margin: const EdgeInsets.only(left: 50, right: 50),
      child: TextButton(
        onPressed: isTurn && !endGameCubit.canLeave() && tradingAllowed
            ? () {
                if (gameMode.value == GameModes.COOPERATIVE) return cooperativeCubit.sendTradeProposition();
                trade.sendTrade();
              }
            : null,
        style: buttonStyle(Colors.transparent),
        child: Image.asset(
          'lib/assets/images/trade_button.png',
          scale: 1,
        ),
      ),
    );
  }

  Widget clock(BuildContext context) {
    final ReplayCubit replayCubit = context.watch<ReplayCubit>();
    final gamemode = context.watch<GamemodeCubit>().state.gamemode;
    if (replayCubit.state is ReplayUpdated) return Container();
    if (gamemode.value == GameModes.COOPERATIVE) return Container();

    return Stack(children: <Widget>[clockImage(), clockNumber()]);
  }

  Center clockImage() => Center(
        child: Image.asset(
          'lib/assets/images/clock.png',
          scale: 2.5,
        ),
      );

  Widget clockNumber() {
    return BlocBuilder<TimerCubit, TimerState>(
      builder: (context, state) {
        String time = '00:00';
        if (state is TimerUpdated) time = formatTime(state.timer);
        return Container(
          alignment: const Alignment(0.0, 0.05),
          child: Text(time,
              style: TextStyle(color: themeColors.generalFontColor, fontWeight: FontWeight.bold, fontSize: 30.0)),
        );
      },
    );
  }

  String formatTime(CommonTimer timer) {
    String minute = timer.minute.toString().padLeft(2, '0');
    String second = timer.second.toString().padLeft(2, '0');

    return '$minute:$second';
  }

  Widget bag() {
    return Row(
      children: [
        Flexible(
          child: Center(
            child: Image.asset(
              'lib/assets/images/bag.png',
              scale: 1,
            ),
          ),
        ),
        BlocBuilder<StashInfoCubit, StashInfoState>(
          builder: (context, state) {
            int nLettersLeft = 0;
            final AppLocalizations localization = AppLocalizations.of(context);

            if (state is StashInfoUpdated) nLettersLeft = state.stash.nLettersLeft;

            return Flexible(
              child: Container(
                alignment: const Alignment(-0.8, 0.2),
                child: textStyle(nLettersLeft.toString() +
                    (nLettersLeft > 1 ? localization.lettersRemaining : localization.letterRemaining)),
              ),
            );
          },
        )
      ],
    );
  }

  ButtonStyle buttonStyle([Color? color]) {
    return ButtonStyle(
        backgroundColor: MaterialStateProperty.all((color != null) ? color : themeColors.buttonColor),
        shape: MaterialStateProperty.all<RoundedRectangleBorder>(RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(100.0), side: BorderSide(color: themeColors.buttonBorderColor!))));
  }

  Text textStyle(String string, [double? fontSize]) {
    return Text(string,
        style: TextStyle(
            color: themeColors.generalFontColor,
            fontWeight: FontWeight.bold,
            fontSize: (fontSize != null) ? fontSize : 30.0));
  }
}
