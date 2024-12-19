part of 'lobbies_cubit.dart';

@immutable
abstract class LobbiesState with EquatableMixin {
  final List<LobbyInfo> lobbies;

  const LobbiesState(this.lobbies);

  @override
  List<Object> get props => [lobbies];
}

class LobbiesInitial extends LobbiesState {
  const LobbiesInitial() : super(const []);
}

class LobbiesUpdated extends LobbiesState {
  LobbiesUpdated(List<LobbyInfo> lobbies) : super(List.from(lobbies));
}

class LobbiesConfirmJoinLobby extends LobbiesState {
  LobbiesConfirmJoinLobby(LobbyInfo lobbies) : super([lobbies]);
}
