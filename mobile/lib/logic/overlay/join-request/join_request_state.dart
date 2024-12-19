part of 'join_request_cubit.dart';

@immutable
abstract class JoinRequestState with EquatableMixin {
  final LobbyWaiting waitingForLobby;
  const JoinRequestState(this.waitingForLobby);

  @override
  List<Object> get props => [waitingForLobby];
}

class JoinRequestInitial extends JoinRequestState {
  const JoinRequestInitial() : super(const LobbyWaiting(false, null));
}

class JoinRequestWaiting extends JoinRequestState {
  JoinRequestWaiting(String lobbyId) : super(LobbyWaiting(true, lobbyId));
}

class JoinRequestCanceled extends JoinRequestState {
  const JoinRequestCanceled() : super(const LobbyWaiting(false, null));
}

class JoinRequestDeclined extends JoinRequestState {
  const JoinRequestDeclined() : super(const LobbyWaiting(false, null));
}

class JoinRequestClosed extends JoinRequestState {
  const JoinRequestClosed() : super(const LobbyWaiting(false, null));
}
