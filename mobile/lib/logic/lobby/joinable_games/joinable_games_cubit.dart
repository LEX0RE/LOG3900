import 'package:Scrabble/constants/communication.dart';
import 'package:Scrabble/constants/route.dart';
import 'package:Scrabble/data/models/enums/game_modes.dart';
import 'package:Scrabble/data/models/interfaces/lobby/available_lobbies.dart';
import 'package:Scrabble/data/models/interfaces/lobby/game_info.dart';
import 'package:Scrabble/logic/gamemode/gamemode_cubit.dart';
import 'package:Scrabble/logic/router/router_manager.dart';
import 'package:Scrabble/logic/socket/socket_manager_bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

part 'joinable_games_state.dart';

class JoinableGamesCubit extends Cubit<JoinableGamesState> {
  final SocketManagerBloc socketManager;
  final GamemodeCubit gamemodeCubit;

  JoinableGamesCubit(this.socketManager, this.gamemodeCubit) : super(JoinableGamesInitial()) {
    socketManager
      ..add(SocketManagerAddHandler(PUBLISH_CLASSIC_GAMES, _updateGames, typeFactory: AvailableGames.fromJson))
      ..add(SocketManagerAddHandler(PUBLISH_COOPERATIVE_GAMES, _updateGames, typeFactory: AvailableGames.fromJson))
      ..add(SocketManagerAddHandler(PUBLISH_TOURNAMENT_GAMES, _updateGames, typeFactory: AvailableGames.fromJson));
    _subscribeToGames();
  }

  void _subscribeToGames() {
    switch (gamemodeCubit.state.gamemode.value) {
      case GameModes.CLASSIC:
        socketManager.add(SocketManagerSend(SUBSCRIBE_CLASSIC_GAMES));
        break;
      case GameModes.COOPERATIVE:
        socketManager.add(SocketManagerSend(SUBSCRIBE_COOPERATIVE_GAMES));
        break;
      case GameModes.TOURNAMENT:
        socketManager.add(SocketManagerSend(SUBSCRIBE_TOURNAMENT_GAMES));
        break;
    }
  }

  void observeGame(String gameId, BuildContext context) {
    BlocProvider.of<RouterManager>(context).navigate(OBSERVE_PATH, ROOT_PATH);
    if (gamemodeCubit.state.gamemode.value == GameModes.TOURNAMENT) {
      socketManager.add(SocketManagerSend(ADD_OBSERVER_TO_TOURNAMENT, gameId));
    } else {
      socketManager.add(SocketManagerSend(ADD_OBSERVER_TO_GAME, gameId));
    }
  }

  void observeGameInTournament(String gameId, BuildContext context) {
    BlocProvider.of<RouterManager>(context).navigate(OBSERVE_PATH, ROOT_PATH);
    socketManager.add(SocketManagerSend(ADD_OBSERVER_TO_GAME, gameId));
  }

  void _updateGames(dynamic updatedGames) {
    if (updatedGames is! AvailableGames) return;

    emit(JoinableGamesUpdated(updatedGames.availableGames));
  }

  @override
  Future<void> close() {
    socketManager.add(SocketManagerSend(UNSUBSCRIBE_CLASSIC_GAMES));
    socketManager.add(SocketManagerSend(UNSUBSCRIBE_COOPERATIVE_GAMES));
    socketManager.add(SocketManagerSend(UNSUBSCRIBE_TOURNAMENT_GAMES));
    socketManager
      ..removeHandlersForEvent(PUBLISH_CLASSIC_GAMES)
      ..removeHandlersForEvent(PUBLISH_COOPERATIVE_GAMES)
      ..removeHandlersForEvent(PUBLISH_TOURNAMENT_GAMES);
    return super.close();
  }
}
