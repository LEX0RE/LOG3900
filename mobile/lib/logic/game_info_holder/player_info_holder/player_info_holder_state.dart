part of 'player_info_holder_cubit.dart';

@immutable
abstract class PlayerInfoHolderState with EquatableMixin {
  @override
  List<Object?> get props => [];

  const PlayerInfoHolderState();
}

class PlayerInfoHolderInitial extends PlayerInfoHolderState {}

class PlayerInfoHolderUpdated extends PlayerInfoHolderState {
  final CommonPlayerInfo playerInfo;
  final List<CommonPlayerInfo> otherPlayersInfo;

  const PlayerInfoHolderUpdated(this.playerInfo, this.otherPlayersInfo);

  @override
  List<Object?> get props => [playerInfo, otherPlayersInfo];
}
