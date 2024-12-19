import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'client_push_message.g.dart';

@JsonSerializable(explicitToJson: true)
class ClientPushMessage extends Serializable<ClientPushMessage> {
  final String content;
  final DateTime time;
  final String chatId;

  @override
  List<Object?> get props => [content, time, chatId];

  ClientPushMessage(this.content, this.time, this.chatId);

  factory ClientPushMessage.fromJson(Map<String, dynamic> json) => _$ClientPushMessageFromJson(json);

  @override
  ClientPushMessage fromJson(Map<String, dynamic> json) => _$ClientPushMessageFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$ClientPushMessageToJson(this);
}
