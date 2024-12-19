part of 'hint_display_cubit.dart';

@immutable
abstract class HintDisplayState with EquatableMixin {
  final List<PreviewableHint> hints;
  final List<bool> selectionState;
  final bool isHintSectionOpened;
  final bool isLookingForHints;
  final String hintBoxMessage;

  const HintDisplayState({
    required this.hints,
    required this.selectionState,
    required this.isHintSectionOpened,
    required this.isLookingForHints,
    required this.hintBoxMessage,
  });

  copyWith({
    List<PreviewableHint>? hints,
    List<bool>? selectionState,
    bool? isHintSectionOpened,
    bool? isLookingForHints,
    String? hintBoxMessage,
  }) {
    return HintDisplayUpdate(
      hints: hints ?? List.from(this.hints),
      selectionState: selectionState ?? List.from(this.selectionState),
      isHintSectionOpened: isHintSectionOpened ?? this.isHintSectionOpened,
      isLookingForHints: isLookingForHints ?? this.isLookingForHints,
      hintBoxMessage: hintBoxMessage ?? this.hintBoxMessage,
    );
  }

  @override
  List<Object> get props => [
        hints,
        selectionState,
        isHintSectionOpened,
        isLookingForHints,
        hintBoxMessage,
      ];
}

class HintDisplayInitial extends HintDisplayState {
  const HintDisplayInitial()
      : super(
          hints: const [],
          selectionState: const [],
          isHintSectionOpened: false,
          isLookingForHints: false,
          hintBoxMessage: '',
        );
}

class HintDisplayUpdate extends HintDisplayState {
  HintDisplayUpdate({
    required List<PreviewableHint> hints,
    required List<bool> selectionState,
    required bool isHintSectionOpened,
    required bool isLookingForHints,
    required String hintBoxMessage,
  }) : super(
          hints: List.from(hints),
          selectionState: List.from(selectionState),
          isHintSectionOpened: isHintSectionOpened,
          isLookingForHints: isLookingForHints,
          hintBoxMessage: hintBoxMessage,
        );
}
