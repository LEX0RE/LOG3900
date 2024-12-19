part of 'game_continue_overlay_cubit.dart';

@immutable
abstract class GameContinueOverlayState with EquatableMixin {
  @override
  List<Object?> get props => [];
}

class GameContinueOverlayShow extends GameContinueOverlayState {}

class GameContinueOverlayHidden extends GameContinueOverlayState {}
