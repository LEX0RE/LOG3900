part of 'loading_game_overlay_cubit.dart';

@immutable
abstract class LoadingGameOverlayState with EquatableMixin {
  const LoadingGameOverlayState();
  @override
  List<Object> get props => [];
}

class LoadingGameOverlayShow extends LoadingGameOverlayState {
  const LoadingGameOverlayShow();
}

class LoadingGameOverlayHidden extends LoadingGameOverlayState {
  const LoadingGameOverlayHidden();
}
