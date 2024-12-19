import 'package:Scrabble/data/models/interfaces/lobby/lobby_send_invitation.dart';
import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'lobby_send_invitation_list.g.dart';

@JsonSerializable(explicitToJson: true)
class LobbySendInvitationList extends Serializable<LobbySendInvitationList> {
  final List<LobbySendInvitation> lobbySendInvitation;

  const LobbySendInvitationList(this.lobbySendInvitation);

  @override
  List<Object> get props => [lobbySendInvitation];

  factory LobbySendInvitationList.fromJson(Map<String, dynamic> json) => _$LobbySendInvitationListFromJson(json);

  @override
  LobbySendInvitationList fromJson(Map<String, dynamic> json) => _$LobbySendInvitationListFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$LobbySendInvitationListToJson(this);
}
