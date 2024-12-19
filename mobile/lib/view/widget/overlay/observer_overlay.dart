import 'package:Scrabble/logic/observer/observer_cubit.dart';
import 'package:Scrabble/view/widget/scrabble_widget/button.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class ObserverOverlayWidget extends StatefulWidget {
  const ObserverOverlayWidget({Key? key}) : super(key: key);

  @override
  ObserverOverlayWidgetState createState() => ObserverOverlayWidgetState();
}

class ObserverOverlayWidgetState extends State<ObserverOverlayWidget> {
  ObserverOverlayWidgetState();

  @override
  Widget build(BuildContext context) {
    final AppLocalizations localization = AppLocalizations.of(context);
    final ObserverCubit cubit = context.read<ObserverCubit>();

    return Positioned(
        bottom: 16,
        left: 60,
        child: ScrabbleButtonWidget(
            height: 60, width: 200, text: localization.leaveGame, onPressed: () => cubit.stopObservingGame(context)));
  }
}
