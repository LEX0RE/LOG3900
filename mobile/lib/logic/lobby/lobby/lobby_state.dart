part of 'lobby_cubit.dart';

@immutable
abstract class LobbyState with EquatableMixin {
  final LobbyInfo lobby;
  const LobbyState(this.lobby);

  @override
  List<Object> get props => [lobby];
}

class LobbyInitial extends LobbyState {
  LobbyInitial() : super(EMPTY_LOBBY_CLASSIC);
}

class LobbyUpdated extends LobbyState {
  const LobbyUpdated(super.lobby);
}

class LobbyReady extends LobbyState {
  const LobbyReady(super.lobby);
}
