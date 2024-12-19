import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:Scrabble/data/models/interfaces/user/user.dart';
import 'package:json_annotation/json_annotation.dart';

part 'server_message.g.dart';

@JsonSerializable(explicitToJson: true)
class ServerMessage extends Serializable<ServerMessage> {
  final DateTime time;
  final User user;
  final String profilePicture;
  final String content;

  ServerMessage(this.time, this.user, this.profilePicture, this.content);

  @override
  List<Object> get props => [time, user, profilePicture, content];

  factory ServerMessage.fromJson(Map<String, dynamic> json) => _$ServerMessageFromJson(json);

  @override
  ServerMessage fromJson(Map<String, dynamic> json) => _$ServerMessageFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$ServerMessageToJson(this);
}
