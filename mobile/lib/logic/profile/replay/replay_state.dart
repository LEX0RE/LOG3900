part of 'replay_cubit.dart';

@immutable
abstract class ReplayState with EquatableMixin {
  late final List<User> pointOfViews;
  final int nTurns;
  final int turnIndex;
  final String userIdForPointOfView;
  final bool isLastTurn;
  final bool isFirstTurn;

  ReplayState(
      this.pointOfViews, this.nTurns, this.turnIndex, this.userIdForPointOfView, this.isFirstTurn, this.isLastTurn) {
    pointOfViews.sort((a, b) => a.id.compareTo(b.id));
  }

  @override
  List<Object> get props => [pointOfViews, nTurns, turnIndex, userIdForPointOfView, isFirstTurn, isLastTurn];
}

class ReplayInitial extends ReplayState {
  ReplayInitial() : super([], 0, 0, '', false, false);
}

class ReplayUpdated extends ReplayState {
  ReplayUpdated(List<User> pointOfViews, int nTurns, int turnIndex, String userIdForPointOfView, bool isFirstTurn,
      bool isLastTurn)
      : super(List.from(pointOfViews), nTurns, turnIndex, userIdForPointOfView, isFirstTurn, isLastTurn);
}
