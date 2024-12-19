import 'package:Scrabble/data/models/interfaces/bracket/common_bracket.dart';
import 'package:Scrabble/logic/lobby/joinable_games/joinable_games_cubit.dart';
import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class ObserverButton extends StatelessWidget {
  final CommonBracket bracket;
  const ObserverButton(this.bracket, {Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    AppLocalizations localizations = AppLocalizations.of(context);
    final JoinableGamesCubit joinableGamesCubit = context.watch<JoinableGamesCubit>();

    return Container(
      margin: const EdgeInsets.only(top: 2, bottom: 2),
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          textStyle: Theme.of(context).textTheme.titleMedium,
          backgroundColor: ColorExtension.observerButton,
          disabledBackgroundColor: ColorExtension.disabledObserverButton,
          minimumSize: const Size(120, 10),
          padding: const EdgeInsets.all(4),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
        ),
        onPressed: bracket.isMatchInProgress
            ? () => joinableGamesCubit.observeGameInTournament(bracket.gameId, context)
            : null,
        child: Text(localizations.observerButtonLabel,
            style: const TextStyle(fontSize: 18, color: Colors.white, fontWeight: FontWeight.bold)),
      ),
    );
  }
}
