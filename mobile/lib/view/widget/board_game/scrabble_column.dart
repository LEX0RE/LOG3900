import 'package:Scrabble/constants/grid.dart';
import 'package:Scrabble/logic/form/blank_letter_form/blank_letter_form_cubit.dart';
import 'package:Scrabble/view/widget/board_game/blank_letter_form.dart';
import 'package:Scrabble/view/widget/board_game/board_tile.dart';
import 'package:Scrabble/view/widget/board_game/easel.dart';
import 'package:Scrabble/view/widget/overlay/overlay_widget.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class ScrabbleColumn extends StatelessWidget {
  final Function(BuildContext) isObservationPage;

  const ScrabbleColumn(this.isObservationPage, {Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final BlankLetterFormCubit blankLetterFormCubit = context.watch<BlankLetterFormCubit>();
    return Builder(
      builder: (context) => Column(
        children: [
          Flexible(
            flex: 0,
            child: OverlayWidget<BlankLetterFormCubit, BlankLetterFormShow, BlankLetterFormState>(
              margin: const EdgeInsets.only(top: 100, left: 400, right: 400, bottom: 450),
              onOverlayCancel: blankLetterFormCubit.cancel,
              child: BlankLetterForm(
                theme: Theme.of(context),
                localization: AppLocalizations.of(context),
                formCubit: blankLetterFormCubit,
              ),
            ),
          ),
          Flexible(
            flex: 14,
            child: createScrabble(),
          ),
          Flexible(flex: 2, child: isObservationPage(context) ? Container() : const EaselWidget())
        ],
      ),
    );
  }

  Container createScrabble() => Container(
        alignment: Alignment.topCenter,
        child: SizedBox(
          width: 620,
          child: GridView.count(
              crossAxisCount: NUMBER_TILE_ROW,
              children: List.generate(NUMBER_TILE_ROW * NUMBER_TILE_ROW, (index) => BoardTileWidget(index))),
        ),
      );
}
