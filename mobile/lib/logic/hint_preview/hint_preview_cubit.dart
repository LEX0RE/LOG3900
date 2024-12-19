import 'package:Scrabble/constants/communication.dart';
import 'package:Scrabble/constants/hint.dart';
import 'package:Scrabble/data/models/interfaces/game_info/hint_to_send.dart';
import 'package:Scrabble/data/models/interfaces/game_info/hints.dart';
import 'package:Scrabble/data/models/interfaces/game_info/previewable_hint.dart';
import 'package:Scrabble/logic/game_info_holder/placement/placement_cubit.dart';
import 'package:Scrabble/logic/socket/socket_manager_bloc.dart';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:meta/meta.dart';

part 'hint_preview_state.dart';

class HintPreviewCubit extends Cubit<HintPreviewState> {
  final SocketManagerBloc socketManager;
  final PlacementCubit placementCubit;
  final AppLocalizations localization;
  int currentPreviewIndex = -1;

  HintPreviewCubit(
    this.socketManager,
    this.placementCubit,
    this.localization,
  ) : super(const HintPreviewInitial()) {
    _configureSocket();
  }

  void previewHint(int index) {
    if (index >= state.hints.length) return;
    PreviewableHint hint;
    if (index == currentPreviewIndex) {
      hint = const PreviewableHint('', '');
      currentPreviewIndex = -1;
    } else {
      hint = state.hints[index];
      currentPreviewIndex = index;
    }

    placementCubit.addPlacementFromString(hint.command);
    emit(state.copyWith(isPreviewingHint: true));
  }

  void cancelPreviewing() {
    emit(state.copyWith(isPreviewingHint: false));
    placementCubit.reset(dynamic);
  }

  void reset() {
    cancelPreviewing();
    emit(state.copyWith(
      hints: const [],
    ));
  }

  void _configureSocket() {
    socketManager
      ..add(SocketManagerAddHandler(HINT_COMMAND_RESULTS, _handleReceivedHints, typeFactory: Hints.fromJson))
      ..add(SocketManagerAddHandler(HINT_COMMAND_PARTIAL_RESULTS, _handleReceivedHints,
          typeFactory: DEFAULT_TYPE_FACTORY))
      ..add(SocketManagerAddHandler(HINT_COMMAND_NO_RESULT, (dynamic) => _handleReceivedHints(const Hints([])),
          typeFactory: DEFAULT_TYPE_FACTORY))
      ..add(SocketManagerAddHandler(RESEARCH_HINT, (dynamic) => _handleLookingForHints(),
          typeFactory: DEFAULT_TYPE_FACTORY));
  }

  void _handleReceivedHints(dynamic receivedHints) {
    if (receivedHints is! Hints || isClosed) return;
    final List<HintToSend> hints = receivedHints.hints;
    final List<PreviewableHint> previewableHints = _generateHintsToDisplay(hints);
    String hintStateMessage = localization.noHintFound;
    if (hints.isNotEmpty) hintStateMessage = localization.hintFoundSome;
    if (hints.length == MAX_HINTS) hintStateMessage = localization.hintFoundAll;
    emit(state.copyWith(
      hints: previewableHints,
      hintStateMessage: hintStateMessage,
      isLookingForHints: false,
    ));
  }

  void _handleLookingForHints() {
    if (isClosed) return;
    emit(state.copyWith(
      isLookingForHints: true,
      hintStateMessage: localization.hintResearch,
    ));
  }

  List<PreviewableHint> _generateHintsToDisplay(List<HintToSend> hints) {
    return hints.map((HintToSend hint) {
      return PreviewableHint(
        '${localization.place} ${hint.wordPlacement} ${hint.command.split(' ')[3]} points(s)',
        hint.command,
      );
    }).toList();
  }

  @override
  Future<void> close() {
    socketManager
      ..removeHandlersForEvent(HINT_COMMAND_RESULTS)
      ..removeHandlersForEvent(HINT_COMMAND_PARTIAL_RESULTS)
      ..removeHandlersForEvent(HINT_COMMAND_NO_RESULT)
      ..removeHandlersForEvent(RESEARCH_HINT);
    return super.close();
  }
}
