import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:Scrabble/data/models/interfaces/user/user.dart';
import 'package:json_annotation/json_annotation.dart';

part 'lobby_send_invitation.g.dart';

@JsonSerializable(explicitToJson: true)
class LobbySendInvitation extends Serializable<LobbySendInvitation> {
  final String lobbyId;
  final User creator;
  final String profilePicture;

  const LobbySendInvitation(this.lobbyId, this.creator, this.profilePicture);

  @override
  List<Object> get props => [lobbyId, creator, profilePicture];

  factory LobbySendInvitation.fromJson(Map<String, dynamic> json) => _$LobbySendInvitationFromJson(json);

  @override
  LobbySendInvitation fromJson(Map<String, dynamic> json) => _$LobbySendInvitationFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$LobbySendInvitationToJson(this);
}
