part of 'end_game_overlay_cubit.dart';

@immutable
abstract class EndGameOverlayState with EquatableMixin {
  @override
  List<Object?> get props => [];
}

class EndGameOverlayShow extends EndGameOverlayState {}

class EndGameOverlayHidden extends EndGameOverlayState {}
