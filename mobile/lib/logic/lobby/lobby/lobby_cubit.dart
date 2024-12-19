import 'package:Scrabble/constants/communication.dart';
import 'package:Scrabble/constants/lobby.dart';
import 'package:Scrabble/data/models/interfaces/lobby/lobby_info.dart';
import 'package:Scrabble/logic/socket/socket_manager_bloc.dart';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

part 'lobby_state.dart';

class LobbyCubit extends Cubit<LobbyState> {
  final SocketManagerBloc socketManager;
  LobbyCubit(this.socketManager) : super(LobbyInitial()) {
    socketManager.add(SocketManagerAddHandler(PUBLISH_LOBBY_INFO, _updateLobbyInfo, typeFactory: LobbyInfo.fromJson));
  }

  void leaveLobby() {
    socketManager.add(SocketManagerSend(LEAVE_LOBBY, state.lobby.lobbyId));
  }

  void start(String communicationEventId) {
    socketManager.add(SocketManagerSend(communicationEventId, state.lobby.lobbyId));
  }

  void _updateLobbyInfo(dynamic updatedLobbyInfo) {
    if (updatedLobbyInfo is! LobbyInfo || isClosed) return;
    if (updatedLobbyInfo.players.length >= N_MINIMUM_PLAYERS_LOBBY) {
      emit(LobbyReady(updatedLobbyInfo));
    } else {
      emit(LobbyUpdated(updatedLobbyInfo));
    }
  }
}
