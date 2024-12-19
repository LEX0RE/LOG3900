part of 'hint_preview_cubit.dart';

@immutable
abstract class HintPreviewState with EquatableMixin {
  final List<PreviewableHint> hints;
  final bool isLookingForHints;
  final bool isPreviewingHint;
  final String hintStateMessage;
  final bool isHintSectionOpened;

  const HintPreviewState({
    required this.hints,
    required this.isLookingForHints,
    required this.isPreviewingHint,
    required this.hintStateMessage,
    required this.isHintSectionOpened,
  });

  copyWith({
    List<PreviewableHint>? hints,
    bool? isLookingForHints,
    bool? isPreviewingHint,
    String? hintStateMessage,
    bool? isHintSectionOpened,
  }) {
    return HintPreviewUpdate(
      hints: hints ?? List.from(this.hints),
      isLookingForHints: isLookingForHints ?? this.isLookingForHints,
      isPreviewingHint: isPreviewingHint ?? this.isPreviewingHint,
      hintStateMessage: hintStateMessage ?? this.hintStateMessage,
      isHintSectionOpened: isHintSectionOpened ?? this.isHintSectionOpened,
    );
  }

  @override
  List<Object> get props => [
        hints,
        isLookingForHints,
        isPreviewingHint,
        hintStateMessage,
        isHintSectionOpened,
      ];
}

class HintPreviewInitial extends HintPreviewState {
  const HintPreviewInitial()
      : super(
          hints: const [],
          isLookingForHints: false,
          isPreviewingHint: false,
          hintStateMessage: '',
          isHintSectionOpened: false,
        );
}

class HintPreviewUpdate extends HintPreviewState {
  HintPreviewUpdate({
    required List<PreviewableHint> hints,
    required bool isLookingForHints,
    required bool isPreviewingHint,
    required String hintStateMessage,
    required bool isHintSectionOpened,
  }) : super(
          hints: List.from(hints),
          isLookingForHints: isLookingForHints,
          isPreviewingHint: isPreviewingHint,
          hintStateMessage: hintStateMessage,
          isHintSectionOpened: isHintSectionOpened,
        );
}
