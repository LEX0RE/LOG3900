part of 'surrender_overlay_cubit.dart';

@immutable
abstract class SurrenderOverlayState with EquatableMixin {
  const SurrenderOverlayState();

  @override
  List<Object> get props => [];
}

class SurrenderOverlayShow extends SurrenderOverlayState {
  const SurrenderOverlayShow();
}

class SurrenderOverlayHidden extends SurrenderOverlayState {
  const SurrenderOverlayHidden();
}
