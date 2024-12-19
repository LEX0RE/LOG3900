import 'dart:convert';

import 'package:Scrabble/constants/array.dart';
import 'package:Scrabble/constants/communication.dart';
import 'package:Scrabble/data/models/interfaces/replay/replay.dart';
import 'package:Scrabble/data/models/interfaces/user/user.dart';
import 'package:Scrabble/data/repositories/replay_repository.dart';
import 'package:Scrabble/logic/identity/identity_cubit.dart';
import 'package:Scrabble/logic/socket/socket_manager_bloc.dart';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

part 'replay_state.dart';

class ReplayCubit extends Cubit<ReplayState> {
  Replay? replay;
  String userIdForPointOfView = '';
  int turnIndex = 0;
  final ReplayRepository replayRepository;
  final IdentityHolder identityHolder;
  final SocketManagerBloc socketManager;

  ReplayCubit(this.replayRepository, this.identityHolder, this.socketManager) : super(ReplayInitial());

  void fetchReplay(String gameId, Function onSuccess) {
    replayRepository.getReplay(gameId).then((Replay replay) {
      _setReplay(replay);
      onSuccess();
    }).catchError((_) => (replay = null));
  }

  void clearReplay() {
    emit(ReplayInitial());
  }

  bool isSelected(String userId) => userIdForPointOfView == userId;

  bool isLastTurn() => turnIndex >= (state.nTurns - 1);

  bool isFirstTurn() => turnIndex == 0;

  void nextTurn() {
    if (isLastTurn()) {
      emit(ReplayUpdated(state.pointOfViews, state.nTurns, turnIndex, userIdForPointOfView, false, true));
      return;
    }
    _setTurn(turnIndex + 1);
  }

  void previousTurn() {
    if (isFirstTurn()) {
      emit(ReplayUpdated(state.pointOfViews, state.nTurns, turnIndex, userIdForPointOfView, true, false));
      return;
    }
    _setTurn(turnIndex - 1);
  }

  setPointOfView(String userId) {
    userIdForPointOfView = userId;
    _showReplay();
  }

  void _setTurn(int turnIndex) {
    this.turnIndex = turnIndex;
    _showReplay();
  }

  void _setReplay(Replay replay) {
    this.replay = replay;
    turnIndex = 0;
    userIdForPointOfView = identityHolder.identity.userId;
    _showReplay();
  }

  void _showReplay() {
    if (replay == null) return;
    final turnInfoEntryIndex =
        replay!.turns[turnIndex].infos.indexWhere((info) => (info.item1 == userIdForPointOfView));
    if (turnInfoEntryIndex == INDEX_NOT_FOUND) return;
    final turnInfo = replay!.turns[turnIndex].infos[turnInfoEntryIndex].item2;

    final gameUpdateHandlers = socketManager.handlers[GAME_UPDATE];
    if (gameUpdateHandlers == null) return;
    gameUpdateHandlers.forEach((handler) => handler(jsonDecode(turnInfo.gameUpdate.encode())));

    final easelUpdateHandlers = socketManager.handlers[EASEL_UPDATE];
    if (easelUpdateHandlers == null) return;
    easelUpdateHandlers.forEach((handler) => handler(jsonDecode(turnInfo.easelUpdate.encode())));

    final boardUpdateHandlers = socketManager.handlers[BOARD_UPDATE];
    if (boardUpdateHandlers == null) return;
    boardUpdateHandlers.forEach((handler) => handler(jsonDecode(replay!.turns[turnIndex].boardUpdate.encode())));

    emit(ReplayUpdated(_pointOfViews(turnInfoEntryIndex), replay!.turns.length, turnIndex, userIdForPointOfView,
        isFirstTurn(), isLastTurn()));
  }

  List<User> _pointOfViews(int turnInfoEntryIndex) {
    final currentGameUpdate = replay!.turns[turnIndex].infos[turnInfoEntryIndex].item2.gameUpdate;
    return [
      User(currentGameUpdate.playerInfo.name, currentGameUpdate.playerInfo.userId),
      ...currentGameUpdate.otherPlayersInfo.map((player) => User(player.name, player.userId)),
    ];
  }
}
