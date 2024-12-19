part of 'joinable_games_cubit.dart';

@immutable
abstract class JoinableGamesState with EquatableMixin {
  final List<GameInfo> games;

  JoinableGamesState(this.games);

  @override
  List<Object> get props => [games];
}

class JoinableGamesInitial extends JoinableGamesState {
  JoinableGamesInitial() : super([]);
}

class JoinableGamesUpdated extends JoinableGamesState {
  JoinableGamesUpdated(List<GameInfo> updatedGames) : super(List.from(updatedGames));
}
