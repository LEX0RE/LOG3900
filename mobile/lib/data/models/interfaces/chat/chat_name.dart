import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:Scrabble/data/models/interfaces/user/user.dart';
import 'package:json_annotation/json_annotation.dart';

part 'chat_name.g.dart';

@JsonSerializable()
class ChatName extends Serializable<ChatName> {
  final String id;
  final String name;
  final User creator;

  ChatName(this.id, this.name, this.creator);

  @override
  List<Object> get props => [id, name, creator];

  factory ChatName.fromJson(Map<String, dynamic> json) => _$ChatNameFromJson(json);

  @override
  ChatName fromJson(Map<String, dynamic> json) => _$ChatNameFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$ChatNameToJson(this);
}
