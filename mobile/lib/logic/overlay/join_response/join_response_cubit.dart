import 'package:Scrabble/constants/communication.dart';
import 'package:Scrabble/data/models/interfaces/join-response.dart';
import 'package:Scrabble/data/models/interfaces/lobby/lobby_info.dart';
import 'package:Scrabble/data/models/interfaces/user/user.dart';
import 'package:Scrabble/logic/socket/socket_manager_bloc.dart';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

part 'join_response_state.dart';

class JoinResponseCubit extends Cubit<JoinResponseState> {
  final SocketManagerBloc socketManager;
  JoinResponseCubit(this.socketManager) : super(JoinResponseInitial()) {
    socketManager.add(SocketManagerAddHandler(PUBLISH_LOBBY_INFO, _openOverlay, typeFactory: LobbyInfo.fromJson));
  }

  void accept(User potentialPlayer, String lobbyId) {
    JoinResponse approval = JoinResponse(potentialPlayer, lobbyId);

    socketManager.send(JOIN_GAME_CONFIRMATION_PLAYER, approval);
    emit(const JoinResponseHidden([]));
  }

  void decline(User potentialPlayer, String lobbyId) {
    JoinResponse rejection = JoinResponse(potentialPlayer, lobbyId);

    socketManager.send(REJECT_THAT_PLAYER_FROM_JOINING, rejection);
    emit(const JoinResponseHidden([]));
  }

  void _openOverlay(dynamic lobbyInfo) async {
    emit(const JoinResponseHidden([]));
    await Future.delayed(const Duration(milliseconds: 30));

    if (!lobbyInfo.potentialPlayers.isEmpty) {
      emit(JoinResponseNewRequest(lobbyInfo.potentialPlayers));
    }
  }
}
