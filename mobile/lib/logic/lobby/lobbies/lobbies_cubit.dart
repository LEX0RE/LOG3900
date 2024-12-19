import 'package:Scrabble/constants/communication.dart';
import 'package:Scrabble/constants/route.dart';
import 'package:Scrabble/data/models/enums/game_modes.dart';
import 'package:Scrabble/data/models/interfaces/lobby/available_lobbies.dart';
import 'package:Scrabble/data/models/interfaces/lobby/lobby_info.dart';
import 'package:Scrabble/logic/gamemode/gamemode_cubit.dart';
import 'package:Scrabble/logic/router/router_manager.dart';
import 'package:Scrabble/logic/socket/socket_manager_bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

part 'lobbies_state.dart';

class LobbiesCubit extends Cubit<LobbiesState> {
  final SocketManagerBloc socketManager;
  final GamemodeCubit gamemodeCubit;
  LobbiesCubit(this.socketManager, this.gamemodeCubit) : super(const LobbiesInitial()) {
    socketManager
      ..add(SocketManagerAddHandler(PUBLISH_CLASSIC_LOBBIES, _updateLobbies, typeFactory: AvailableLobbies.fromJson))
      ..add(
          SocketManagerAddHandler(PUBLISH_COOPERATIVE_LOBBIES, _updateLobbies, typeFactory: AvailableLobbies.fromJson))
      ..add(SocketManagerAddHandler(PUBLISH_TOURNAMENT_LOBBIES, _updateLobbies, typeFactory: AvailableLobbies.fromJson))
      ..add(SocketManagerAddHandler(PUBLISH_LOBBY_INFO, _navigateToLobby, typeFactory: LobbyInfo.fromJson));
    _subscribeToLobbies();
  }

  void joinLobby(String lobbyId) {
    socketManager.add(SocketManagerSend(JOIN_LOBBY, lobbyId));
  }

  void _subscribeToLobbies() {
    switch (gamemodeCubit.state.gamemode.value) {
      case GameModes.CLASSIC:
        socketManager.add(SocketManagerSend(SUBSCRIBE_CLASSIC_LOBBIES));
        break;
      case GameModes.COOPERATIVE:
        socketManager.add(SocketManagerSend(SUBSCRIBE_COOPERATIVE_LOBBIES));
        break;
      case GameModes.TOURNAMENT:
        socketManager.add(SocketManagerSend(SUBSCRIBE_TOURNAMENT_LOBBIES));
        break;
    }
  }

  void _updateLobbies(dynamic updatedLobbies) {
    if (updatedLobbies is! AvailableLobbies || isClosed) return;
    emit(LobbiesUpdated(updatedLobbies.availableLobbies));
  }

  void _navigateToLobby(dynamic lobby) {
    if (lobby is! LobbyInfo || isClosed) return;
    emit(LobbiesConfirmJoinLobby(lobby));
  }

  void observeLobby(String lobbyId, BuildContext context) {
    BlocProvider.of<RouterManager>(context).navigate(HOME_PATH, ROOT_PATH);
    socketManager.add(SocketManagerSend(ADD_OBSERVER_TO_LOBBY, lobbyId));
  }

  @override
  Future<void> close() {
    socketManager.add(SocketManagerSend(UNSUBSCRIBE_CLASSIC_LOBBIES));
    socketManager.add(SocketManagerSend(UNSUBSCRIBE_COOPERATIVE_LOBBIES));
    socketManager.add(SocketManagerSend(UNSUBSCRIBE_TOURNAMENT_LOBBIES));
    socketManager
      ..removeHandlersForEvent(PUBLISH_CLASSIC_LOBBIES)
      ..removeHandlersForEvent(PUBLISH_COOPERATIVE_LOBBIES)
      ..removeHandlersForEvent(PUBLISH_TOURNAMENT_LOBBIES);
    return super.close();
  }
}
