part of 'game_cubit.dart';

@immutable
abstract class GameState with EquatableMixin {
  final bool hasToResetHint;

  const GameState({
    required this.hasToResetHint,
  });
  @override
  List<Object?> get props => [hasToResetHint];
}

class GameInitial extends GameState {
  const GameInitial() : super(hasToResetHint: true);
}

class GameUpdated extends GameState {
  const GameUpdated({required bool hasToResetHint}) : super(hasToResetHint: hasToResetHint);
}
