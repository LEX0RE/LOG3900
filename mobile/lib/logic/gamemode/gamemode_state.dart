part of 'gamemode_cubit.dart';

@immutable
abstract class GamemodeState with EquatableMixin {
  final GameModesEnum gamemode;

  const GamemodeState(this.gamemode);

  @override
  List<Object> get props => [gamemode];
}

class GamemodeInitial extends GamemodeState {
  const GamemodeInitial() : super(const GameModesEnum(GameModes.CLASSIC));
}

class GamemodeUpdated extends GamemodeState {
  const GamemodeUpdated(super.gamemode);
}
