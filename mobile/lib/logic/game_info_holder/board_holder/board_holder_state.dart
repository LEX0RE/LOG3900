part of 'board_holder_cubit.dart';

@immutable
abstract class BoardHolderState extends Equatable {
  final List<PositionLetterIndex> boardPositions;

  const BoardHolderState(this.boardPositions);

  @override
  List<Object> get props => [boardPositions];
}

class BoardHolderInitial extends BoardHolderState {
  BoardHolderInitial() : super([]);
}

class BoardHolderUpdated extends BoardHolderState {
  const BoardHolderUpdated(super.boardPositions);
}
