import 'dart:async';

import 'package:Scrabble/data/models/enums/action_type.dart';
import 'package:Scrabble/data/models/interfaces/game_info/previewable_hint.dart';
import 'package:Scrabble/logic/command_sender/command_sender_cubit.dart';
import 'package:Scrabble/logic/game/game_cubit.dart';
import 'package:Scrabble/logic/hint_preview/hint_preview_cubit.dart';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:meta/meta.dart';

part 'hint_display_state.dart';

class HintDisplayCubit extends Cubit<HintDisplayState> {
  final HintPreviewCubit hintPreviewCubit;
  final CommandSenderCubit commandSenderCubit;
  late final StreamSubscription hintPreviewSubscription;
  final AppLocalizations localization;
  final GameCubit gameCubit;

  HintDisplayCubit(this.hintPreviewCubit, this.localization, this.commandSenderCubit, this.gameCubit)
      : super(const HintDisplayInitial()) {
    hintPreviewSubscription = hintPreviewCubit.stream.listen(
      (HintPreviewState previewState) => emit(
        state.copyWith(
          hints: previewState.hints,
          isLookingForHints: previewState.isLookingForHints,
          hintBoxMessage: previewState.hintStateMessage,
          selectionState: List.filled(previewState.hints.length, false),
        ),
      ),
    );
  }

  void sendHint() {
    emit(state.copyWith(isHintSectionOpened: !state.isHintSectionOpened));
    if (state.isHintSectionOpened) commandSenderCubit.sendCommand(const ActionEnum(ActionType.HINT));
  }

  bool isSelectedHint(int index) {
    if (index >= state.selectionState.length) return false;
    return state.selectionState[index];
  }

  void selectHint(int index) {
    _initiateSelectionState();
    final selectionState = state.selectionState;
    final nHints = state.selectionState.length;
    if (index < 0 || index >= nHints) return;
    for (int i = 0; i < nHints; i++) {
      if (i == index) {
        selectionState[i] = !selectionState[i];
        if (!selectionState[i]) {
          hintPreviewCubit.cancelPreviewing();
          return;
        }
      } else {
        selectionState[i] = false;
      }
    }
    emit(state.copyWith(selectionState: selectionState));
    hintPreviewCubit.previewHint(index);
  }

  bool canOpenHintSection() {
    if (!gameCubit.state.hasToResetHint) return state.isHintSectionOpened;
    hintPreviewCubit.reset();
    emit(state.copyWith(isHintSectionOpened: false));
    _initiateSelectionState();
    gameCubit.hasToResetHintToFalse();
    return false;
  }

  void _initiateSelectionState() {
    final nHints = state.hints.length;
    emit(state.copyWith(selectionState: List.filled(nHints, false)));
  }

  @override
  Future<void> close() {
    hintPreviewSubscription.cancel();
    return super.close();
  }
}
