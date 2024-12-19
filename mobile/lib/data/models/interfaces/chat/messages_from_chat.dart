import 'package:Scrabble/data/models/interfaces/chat/server_message.dart';
import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'messages_from_chat.g.dart';

@JsonSerializable()
class MessagesFromChat extends Serializable<MessagesFromChat> {
  final String chatId;
  final List<ServerMessage> messages;

  MessagesFromChat(this.chatId, this.messages);

  @override
  List<Object> get props => [chatId, messages];

  factory MessagesFromChat.fromJson(Map<String, dynamic> json) => _$MessagesFromChatFromJson(json);

  @override
  MessagesFromChat fromJson(Map<String, dynamic> json) => _$MessagesFromChatFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$MessagesFromChatToJson(this);
}
