part of 'end_game_cubit.dart';

@immutable
abstract class EndGameState with EquatableMixin {
  final CommonEndGame? endGame;
  final bool canEndGame;

  const EndGameState(this.endGame, this.canEndGame);

  @override
  List<Object?> get props => [endGame, canEndGame];
}

class EndGameInitial extends EndGameState {
  const EndGameInitial() : super(null, false);
}

class EndGameUpdated extends EndGameState {
  const EndGameUpdated(super.endGame, super.canEndGame);
}
