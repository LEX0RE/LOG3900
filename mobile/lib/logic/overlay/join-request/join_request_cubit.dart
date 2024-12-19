import 'package:Scrabble/constants/communication.dart';
import 'package:Scrabble/data/models/interfaces/lobby-waiting.dart';
import 'package:Scrabble/data/models/interfaces/lobby/lobby_info.dart';
import 'package:Scrabble/logic/socket/socket_manager_bloc.dart';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

part 'join_request_state.dart';

class JoinRequestCubit extends Cubit<JoinRequestState> {
  final SocketManagerBloc socketManager;
  JoinRequestCubit(this.socketManager) : super(const JoinRequestInitial()) {
    socketManager.add(SocketManagerAddHandler(YOU_WERE_REJECTED, showDeclined));
    socketManager.add(SocketManagerAddHandler(PUBLISH_LOBBY_INFO, hideWaiting, typeFactory: LobbyInfo.fromJson));
  }

  void joinLobby(String lobbyId) {
    socketManager.send(HEY_I_WANNA_JOIN_THIS_GAME, lobbyId);
    showWaiting(lobbyId);
  }

  void cancelJoinRequest(String? lobbyId) {
    if (lobbyId == null) return;
    socketManager.send(CANCEL_JOIN_REQUEST, lobbyId);
    emit(const JoinRequestCanceled());
  }

  void showWaiting(String lobbyId) => emit(JoinRequestWaiting(lobbyId));

  void hideWaiting(dynamic) => emit(const JoinRequestClosed());

  void showDeclined(dynamic) => emit(const JoinRequestDeclined());

  void hideDeclined() => emit(const JoinRequestClosed());
}
