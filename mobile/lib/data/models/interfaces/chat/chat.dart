import 'package:Scrabble/data/models/interfaces/chat/server_message.dart';
import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:Scrabble/data/models/interfaces/user/user.dart';
import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'chat.g.dart';

@JsonSerializable()
class Chat extends Serializable<Chat> with EquatableMixin {
  late List<ServerMessage> serverMessage;
  final String id;
  final String name;
  final User creator;

  Chat(this.name, this.serverMessage, this.creator, this.id);

  @override
  List<Object> get props => [
        name,
        serverMessage,
        creator,
        id,
      ];

  factory Chat.fromJson(Map<String, dynamic> json) => _$ChatFromJson(json);

  @override
  Chat fromJson(Map<String, dynamic> json) => _$ChatFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$ChatToJson(this);
}
