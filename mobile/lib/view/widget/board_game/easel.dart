import 'package:Scrabble/constants/easel.dart';
import 'package:Scrabble/data/models/classes/letters/position_index_letter.dart';
import 'package:Scrabble/logic/game_info_holder/easel_letter_holder/easel_letter_holder_cubit.dart';
import 'package:Scrabble/logic/game_info_holder/trade/trade_cubit.dart';
import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:Scrabble/view/widget/board_game/letter_tile_feedback.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class EaselWidget extends StatelessWidget {
  const EaselWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) => Builder(
        builder: (context) {
          final easel = context.watch<EaselLetterHolderCubit>();
          final letters = context.select((EaselLetterHolderCubit cubit) => cubit.state.letters);
          return DragTarget<PositionLetterIndex>(
            onWillAccept: (data) => true,
            onAccept: (data) => easel.addLetter(data),
            builder: (context, candidateData, rejectedData) => easelContainer(letters, context),
          );
        },
      );

  Widget easelContainer(List<PositionLetterIndex> letters, BuildContext context) {
    final easel = context.watch<EaselLetterHolderCubit>();
    final trade = context.watch<TradeCubit>();
    return Center(
      child: GridView.count(
        crossAxisCount: MAX_NUMBER_OF_LETTER,
        children: List.generate(
            letters.length,
            (index) => GestureDetector(
                  onDoubleTap: () => trade.toggleToTrade(index),
                  child: Draggable<PositionLetterIndex>(
                    maxSimultaneousDrags: 1,
                    data: letters[index],
                    onDragCompleted: () {
                      easel.removeLetter(letters[index]);
                      trade.removeFromTrade(index);
                    },
                    feedback: LetterTileFeedbackWidget(letters.toCommonLetters(), index, context),
                    childWhenDragging: Container(),
                    child: letterTileWithTrade(letters, index, context),
                  ),
                )),
      ),
    );
  }

  Widget letterTileWithTrade(List<PositionLetterIndex> letters, int index, BuildContext context) {
    final bool isSelectedForTrade = context.select((TradeCubit cubit) => cubit.has(index));
    Theme.of(context).extension<ColorExtension>()!;
    BoxDecoration boxDecoration = BoxDecoration(
      border: Border.all(
        color: isSelectedForTrade ? ColorExtension.tileToTradeBorder! : Colors.transparent,
        width: 5,
      ),
      borderRadius: BorderRadius.circular(10),
    );
    return LetterTileFeedbackWidget(
      letters.toCommonLetters(),
      index,
      context,
      decoration: isSelectedForTrade ? boxDecoration : null,
    );
  }
}
