part of 'game_history_cubit.dart';

@immutable
abstract class GameHistoryState with EquatableMixin {
  final List<GameInfoHistory> gameHistories;
  final List<UserConnectionInfo> connections;

  GameHistoryState(this.gameHistories, this.connections);

  @override
  List<Object> get props => [gameHistories];
}

class GameHistoryInitial extends GameHistoryState {
  GameHistoryInitial() : super([], []);
}

class GameHistoryUpdated extends GameHistoryState {
  GameHistoryUpdated(List<GameInfoHistory> gameHistories, List<UserConnectionInfo> connections)
      : super(List.from(gameHistories), List.from(connections));
}
