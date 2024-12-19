import 'dart:convert';

import 'package:Scrabble/constants/communication.dart';
import 'package:Scrabble/constants/lobby.dart';
import 'package:Scrabble/constants/route.dart';
import 'package:Scrabble/data/models/interfaces/game_info/easel_update.dart';
import 'package:Scrabble/data/models/interfaces/lobby/lobby_info.dart';
import 'package:Scrabble/data/models/interfaces/replay/turn.dart';
import 'package:Scrabble/logic/bracket/bracket_cubit.dart';
import 'package:Scrabble/logic/router/router_manager.dart';
import 'package:Scrabble/logic/socket/socket_manager_bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

part 'observer_state.dart';

class ObserverCubit extends Cubit<ObserverState> {
  final SocketManagerBloc socketManager;

  ObserverCubit(this.socketManager) : super(ObserverInitial()) {
    socketManager.add(SocketManagerAddHandler(REDIRECT_TO_OBSERVE, _redirectToObserve));
    socketManager.add(SocketManagerAddHandler(NEW_TURN, _handleTurn, typeFactory: Turn.fromJson));
  }

  void stopObservingLobby(BuildContext context) {
    BlocProvider.of<RouterManager>(context).navigate(HOME_PATH, ROOT_PATH);
    socketManager.add(SocketManagerSend(STOP_OBSERVING_LOBBY));
  }

  void stopObservingGame(BuildContext context) {
    if (context.read<BracketCubit>().state.brackets.isNotEmpty) {
      BlocProvider.of<RouterManager>(context).navigate(BRACKET_SCREEN_PATH, ROOT_PATH);
    } else {
      BlocProvider.of<RouterManager>(context).navigate(HOME_PATH, ROOT_PATH);
    }
    socketManager.add(SocketManagerSend(STOP_OBSERVING_GAME));
  }

  void stopObservingTournament(BuildContext context) {
    BlocProvider.of<RouterManager>(context).navigate(HOME_PATH, ROOT_PATH);
    socketManager.add(SocketManagerSend(STOP_OBSERVING_TOURNAMENT));
  }

  void _redirectToObserve(dynamic) {
    emit(ObserverRedirectToObserve(state.lobby));
  }

  void _handleTurn(dynamic turn) {
    final turnInfos = turn.infos;

    final gameUpdateHandlers = socketManager.handlers[GAME_UPDATE];
    final easelUpdateHandlers = socketManager.handlers[EASEL_UPDATE];
    final boardUpdateHandlers = socketManager.handlers[BOARD_UPDATE];

    if (gameUpdateHandlers == null) return;
    gameUpdateHandlers.forEach((handler) => handler(jsonDecode(turnInfos[0].item2.gameUpdate.encode())));

    if (easelUpdateHandlers == null) return;
    easelUpdateHandlers.forEach(
      (handler) => turnInfos.forEach((turnInfo) =>
          handler(jsonDecode(UserEaselUpdate(turnInfo.item2.easelUpdate.easel, turnInfo.item1).encode()))),
    );

    if (boardUpdateHandlers == null) return;
    boardUpdateHandlers.forEach((handler) => handler(jsonDecode(turn.boardUpdate.encode())));
  }
}
