import 'package:Scrabble/data/models/interfaces/chat/chat.dart';
import 'package:Scrabble/data/models/interfaces/chat/chat_name.dart';
import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'all_chat.g.dart';

@JsonSerializable()
class AllChat extends Serializable<AllChat> {
  final List<Chat> chatJoined;
  final List<ChatName> otherChat;

  AllChat(this.chatJoined, this.otherChat);

  @override
  List<Object> get props => [chatJoined, otherChat];

  factory AllChat.fromJson(Map<String, dynamic> json) => _$AllChatFromJson(json);

  @override
  AllChat fromJson(Map<String, dynamic> json) => _$AllChatFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$AllChatToJson(this);
}
