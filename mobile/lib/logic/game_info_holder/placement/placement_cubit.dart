import 'package:Scrabble/constants/array.dart';
import 'package:Scrabble/constants/communication.dart';
import 'package:Scrabble/constants/game.dart';
import 'package:Scrabble/data/models/classes/letters/common_letter.dart';
import 'package:Scrabble/data/models/classes/letters/position_index_letter.dart';
import 'package:Scrabble/data/models/classes/letters/position_letter.dart';
import 'package:Scrabble/data/models/classes/placement.dart';
import 'package:Scrabble/data/models/enums/orientation_type.dart';
import 'package:Scrabble/data/models/interfaces/game_info/board_update.dart';
import 'package:Scrabble/data/models/interfaces/game_info/coordinate.dart';
import 'package:Scrabble/data/models/interfaces/game_info/easel_update.dart';
import 'package:Scrabble/data/models/interfaces/vector_2d.dart';
import 'package:Scrabble/logic/command_sender/command_sender_cubit.dart';
import 'package:Scrabble/logic/form/blank_letter_form/blank_letter_form_cubit.dart';
import 'package:Scrabble/logic/game_info_holder/board_holder/board_holder_cubit.dart';
import 'package:Scrabble/logic/game_info_holder/easel_letter_holder/easel_letter_holder_cubit.dart';
import 'package:Scrabble/logic/socket/socket_manager_bloc.dart';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

part 'placement_state.dart';

class PlacementCubit extends Cubit<PlacementState> {
  late Placement placement;
  final SocketManagerBloc socketManager;
  final BlankLetterFormCubit blankLetterFormCubit;
  final BoardHolderCubit boardHolderCubit;
  final CommandSenderCubit commandSenderCubit;
  final EaselLetterHolderCubit easelLetterHolderCubit;

  PlacementCubit(this.socketManager, this.blankLetterFormCubit, this.easelLetterHolderCubit, this.commandSenderCubit,
      this.boardHolderCubit)
      : super(PlacementInitial()) {
    placement = Placement([], OrientationType.None, EMPTY_COORDINATE);
    socketManager.add(SocketManagerAddHandler(BOARD_UPDATE, reset, typeFactory: BoardUpdate.fromJson));
    socketManager.add(SocketManagerAddHandler(EASEL_UPDATE, reset, typeFactory: EaselUpdate.fromJson));
  }

  void sendPlacement() {
    if (state.placement.letters.isEmpty) return;
    commandSenderCubit.sendCommand(state.placement);
    reset(dynamic);
  }

  void reset(dynamic) {
    emit(PlacementInitial());
    easelLetterHolderCubit.cancel();
  }

  void addPlacementFromString(String placementString) {
    easelLetterHolderCubit.cancel();
    placement = Placement.fromCommand(placementString);
    placement.letters
        .forEach((PositionLetter positionLetter) => easelLetterHolderCubit.removeCommonLetter(positionLetter.letter));
    _updatePlacement();
  }

  void add(PositionLetterIndex positionLetter) {
    if (!positionLetter.letter.isBlank) return _addToPlacement(positionLetter);
    blankLetterFormCubit.show(onSubmit: _onBlankSubmit(positionLetter), onCancel: _onBlankCancel(positionLetter));
  }

  void remove(PositionLetterIndex? positionLetterIndex) {
    if (positionLetterIndex == null) return;
    placement = Placement.copy(state.placement);

    int index = placement.letters.indexWhere(
        (PositionLetter positionLetter) => positionLetter.position == positionLetterIndex.positionLetter.position);
    if (index == INDEX_NOT_FOUND) return;
    placement.letters.removeAt(index);

    if (this.placement.letters.length <= 1) this.placement.orientation = OrientationType.None;
    this._sortPlacement();
    this._updateStartPlacement();
    this._updatePlacement();
  }

  bool isPlacementValid() {
    if (placement.letters.isEmpty) return false;
    return true;
  }

  bool isAllowToAdd(Coordinate coordinate) {
    if (placement.letters.isEmpty || placement.orientation == OrientationType.None) return true;
    if (_alreadyInPlacement(coordinate)) return false;
    if (placement.orientation == OrientationType.Horizontal) return placement.start.row == coordinate.row;
    if (placement.orientation == OrientationType.Vertical) return placement.start.column == coordinate.column;

    return false;
  }

  Function(String) _onBlankSubmit(PositionLetterIndex letter) => (String value) {
        _addToPlacement(letter.copyWith(CommonLetter(value.toUpperCase(), BLANK_POINT)));
      };

  Function _onBlankCancel(PositionLetterIndex letter) => () {
        easelLetterHolderCubit.addLetter(letter);
      };

  void _addToPlacement(PositionLetterIndex positionLetter) {
    placement = Placement.copy(state.placement);
    if (placement.letters.length == 1 && placement.orientation == OrientationType.None) {
      placement.orientation =
          placement.start.row == positionLetter.position.row ? OrientationType.Horizontal : OrientationType.Vertical;
    }

    this.placement.letters.add(positionLetter.positionLetter);
    this._sortPlacement();
    this._updateStartPlacement();
    this._updatePlacement();
  }

  bool _alreadyInPlacement(Coordinate coordinate) =>
      placement.letters.any((PositionLetter positionLetter) => positionLetter.position == coordinate);

  void _sortPlacement() {
    placement.letters.sort((PositionLetter a, PositionLetter b) {
      Vector2D vector1 = Coordinate.toVector2D(a.position);
      Vector2D vector2 = Coordinate.toVector2D(b.position);

      if (placement.orientation == OrientationType.Vertical) return vector1.x.compareTo(vector2.x);
      return vector1.y.compareTo(vector2.y);
    });
  }

  void _updateStartPlacement() {
    if (placement.letters.isEmpty) return;
    placement.start = placement.letters[0].position;
  }

  void _updatePlacement() {
    if (placement.start == EMPTY_COORDINATE || placement.letters.isEmpty) return emit(PlacementInitial());
    final List<PositionLetter> existingBoardLetters = boardHolderCubit.state.boardPositions.toPositionLetters();
    final List<Vector2D> boardPositions =
        existingBoardLetters.map((positionLetter) => Vector2D.fromCoordinate(positionLetter.position)).toList();
    Vector2D position = Vector2D.fromCoordinate(this.placement.start);
    if (placement.orientation == OrientationType.None) {
      if (boardPositions.contains(position)) return emit(PlacementInitial());
      return emit(PlacementUpdated(Placement(
          [PositionLetter(placement.start, placement.letters[0].letter)], OrientationType.None, placement.start)));
    }
    placement = Placement(
        placement.letters.map((PositionLetter positionLetter) {
          while (boardPositions.contains(position)) {
            position = _getNextPosition(position);
          }
          final PositionLetter letter = PositionLetter(Coordinate.fromVector2D(position), positionLetter.letter);
          position = _getNextPosition(position);
          return letter;
        }).toList(),
        this.placement.orientation,
        placement.start);
    emit(PlacementUpdated(this.placement));
  }

  Vector2D _getNextPosition(Vector2D position) {
    if (placement.orientation == OrientationType.Horizontal) return position.add(const Vector2D(1, 0));
    if (placement.orientation == OrientationType.Vertical) return position.add(const Vector2D(0, 1));
    return position;
  }
}
