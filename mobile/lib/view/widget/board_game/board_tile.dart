import 'package:Scrabble/constants/array.dart';
import 'package:Scrabble/constants/grid.dart';
import 'package:Scrabble/data/models/classes/letters/common_letter.dart';
import 'package:Scrabble/data/models/classes/letters/position_index_letter.dart';
import 'package:Scrabble/data/models/classes/letters/position_letter.dart';
import 'package:Scrabble/data/models/enums/tile_type.dart';
import 'package:Scrabble/data/models/interfaces/game_info/coordinate.dart';
import 'package:Scrabble/logic/game_info_holder/board_holder/board_holder_cubit.dart';
import 'package:Scrabble/logic/game_info_holder/placement/placement_cubit.dart';
import 'package:Scrabble/logic/game_info_holder/player_info_holder/player_info_holder_cubit.dart';
import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:Scrabble/view/widget/board_game/letter_tile.dart';
import 'package:Scrabble/view/widget/board_game/letter_tile_feedback.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class BoardTileWidget extends StatefulWidget {
  final int index;

  const BoardTileWidget(this.index, {super.key});

  @override
  // ignore: no_logic_in_create_state
  BoardTileWidgetState createState() => BoardTileWidgetState(
        index,
      );
}

class BoardTileWidgetState extends State<BoardTileWidget> {
  final int index;
  late final Coordinate? coordinate;
  late ColorExtension themeColors;
  late PlayerInfoHolderCubit playerInfoHolderCubit;

  BoardTileWidgetState(this.index) {
    int row = index ~/ NUMBER_TILE_ROW;
    if (!_isNumberLabel(index)) coordinate = Coordinate(BOARD_ROW[row - 1], (index - row * NUMBER_TILE_ROW) - 1);
  }

  @override
  Widget build(BuildContext context) {
    themeColors = Theme.of(context).extension<ColorExtension>()!;
    playerInfoHolderCubit = context.watch<PlayerInfoHolderCubit>();
    return Builder(builder: (context) {
      final placementCubit = context.watch<PlacementCubit>();
      final listLetter = context.select((BoardHolderCubit cubit) => cubit.state.boardPositions);
      final placementListLetter = context.select((PlacementCubit cubit) => cubit.state.letters);
      final letterIndex = _containLetter(index, listLetter);
      final placementLetterIndex = _containLetter(index, placementListLetter);
      return Stack(
        children: [
          _isNumberLabel(index) ? _tile() : _tileTarget(letterIndex, placementLetterIndex, placementCubit),
          _letterTileWithInteraction(
              letterIndex, placementLetterIndex, listLetter, placementListLetter, placementCubit, context)
        ],
      );
    });
  }

  Widget _tileTarget(int letterIndex, int placementLetterIndex, PlacementCubit placementCubit) {
    if (placementLetterIndex != INDEX_NOT_FOUND || !playerInfoHolderCubit.isPlayerTurn()) return _tile();
    return DragTarget<PositionLetterIndex>(
      builder: (context, candidateData, rejectedData) => _tile(),
      onWillAccept: (PositionLetterIndex? data) => (letterIndex == INDEX_NOT_FOUND),
      onAccept: (PositionLetterIndex? data) {
        if (coordinate != null && data != null) {
          Coordinate newCoordinate = Coordinate(coordinate!.row, coordinate!.column + 1);
          placementCubit.add(PositionLetterIndex(PositionLetter(newCoordinate, data.letter), data.index));
        }
      },
    );
  }

  Widget _letterTileWithInteraction(int letterIndex, int placementIndex, List<PositionLetterIndex> listLetter,
      List<PositionLetterIndex> placementListLetter, PlacementCubit placementCubit, BuildContext context) {
    if (letterIndex != INDEX_NOT_FOUND) return _letterTile(letterIndex, listLetter[letterIndex].positionLetter.letter);
    if (placementIndex != INDEX_NOT_FOUND) {
      return Draggable<PositionLetterIndex>(
          data: placementListLetter[placementIndex],
          onDragStarted: () => placementCubit.remove(placementListLetter[placementIndex]),
          onDraggableCanceled: (_, __) => placementCubit.add(placementListLetter[placementIndex]),
          feedback: LetterTileFeedbackWidget(
            PositionLetterIndex.toCommonLetters(placementListLetter),
            placementIndex,
            context,
          ),
          child: _placementTile(placementIndex, placementListLetter[placementIndex].positionLetter.letter));
    }
    return Container();
  }

  Container _letterTile(int letterIndex, CommonLetter letter) => Container(
        margin: const EdgeInsets.only(right: 1, left: 1),
        decoration: BoxDecoration(color: themeColors.tileColor, borderRadius: BorderRadius.circular(7)),
        child: LetterTileWidget(
          letter,
          fontSizeLetter: 20,
          fontSizePoint: 10,
        ),
      );

  Container _placementTile(int letterIndex, CommonLetter letter) => Container(
        margin: const EdgeInsets.only(right: 1, left: 1),
        decoration: BoxDecoration(
          color: themeColors.tileColor,
          borderRadius: BorderRadius.circular(7),
          border: Border.all(color: Colors.blue, width: 2),
        ),
        child: LetterTileWidget(
          letter,
          fontSizeLetter: 20,
          fontSizePoint: 10,
        ),
      );

  Container _tile() => Container(
        alignment: Alignment.center,
        decoration: BoxDecoration(border: Border.all(color: _getBorderColor(index)), color: _getBackgroundColor(index)),
        child: Text(
          _getTextTileFromIndex(index),
          textAlign: TextAlign.center,
          textScaleFactor: _getTextScaleFactor(index),
          style: TextStyle(
            color: themeColors.tileFontColor,
            fontWeight: FontWeight.normal,
          ),
        ),
      );

  int _containLetter(int index, List<PositionLetterIndex> listLetter) {
    for (int i = 0; i < listLetter.length; i++) {
      if (listLetter[i].index == index) return i;
    }
    return INDEX_NOT_FOUND;
  }

  Color _getBorderColor(int index) {
    if (_isNumberLabel(index)) {
      return Colors.transparent;
    } else {
      return themeColors.boardBorderColor!;
    }
  }

  Color _getBackgroundColor(int index) {
    if (_isNumberLabel(index)) return Colors.transparent;

    switch (_getTypecaseFromIndex(index)) {
      case TileType.Word3:
        return const Color(0xFFBA614D);
      case TileType.Word2:
        return const Color(0xFF9E4DBA);

      case TileType.Letter3:
        return const Color(0xFFBA614D);

      case TileType.Letter2:
        return const Color(0xFF4DADBA);

      case TileType.Normal:
        return themeColors.defaultBoardColor!;

      case TileType.Star:
        return const Color(0xFF9E4DBA);
    }
  }

  double _getTextScaleFactor(int index) {
    if (_isNumberLabel(index)) return 1.0;
    TileType tile = _getTypecaseFromIndex(index);
    if (tile == TileType.Letter2 || tile == TileType.Letter3) return 0.8;
    if (tile == TileType.Star) return 1.7;
    return 1.0;
  }

  TileType _getTypecaseFromIndex(int index) {
    int xPosition = (index - 1) % NUMBER_TILE_ROW;
    int yPosition = (index - 1) ~/ NUMBER_TILE_ROW - 1;
    return DEFAULT_BOARD[yPosition][xPosition];
  }

  String _getTextTileFromIndex(int index) {
    if (index == 0) return '';
    if (index < NUMBER_TILE_ROW) return BOARD_COLUMNS[index - 1];
    if ((index % NUMBER_TILE_ROW) == 0) return BOARD_ROW[index ~/ NUMBER_TILE_ROW - 1];

    switch (_getTypecaseFromIndex(index)) {
      case TileType.Word3:
        return 'Mot X3';
      case TileType.Word2:
        return 'Mot X2';

      case TileType.Letter3:
        return 'Lettre X3';

      case TileType.Letter2:
        return 'Lettre X2';

      case TileType.Normal:
        return '';

      case TileType.Star:
        return '★';
    }
  }

  bool _isNumberLabel(int index) => (index < NUMBER_TILE_ROW || (index % NUMBER_TILE_ROW) == 0);
}
