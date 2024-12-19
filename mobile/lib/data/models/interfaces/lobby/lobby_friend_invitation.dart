import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'lobby_friend_invitation.g.dart';

@JsonSerializable(explicitToJson: true)
class LobbyFriendInvitation extends Serializable<LobbyFriendInvitation> {
  final String lobbyId;
  final String friendId;

  const LobbyFriendInvitation(this.lobbyId, this.friendId);

  @override
  List<Object> get props => [lobbyId, friendId];

  factory LobbyFriendInvitation.fromJson(Map<String, dynamic> json) => _$LobbyFriendInvitationFromJson(json);

  @override
  LobbyFriendInvitation fromJson(Map<String, dynamic> json) => _$LobbyFriendInvitationFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$LobbyFriendInvitationToJson(this);
}
