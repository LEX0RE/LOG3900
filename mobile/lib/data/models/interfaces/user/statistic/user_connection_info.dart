import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'user_connection_info.g.dart';

@JsonSerializable(explicitToJson: true)
class UserConnectionInfo extends Serializable<UserConnectionInfo> {
  final DateTime date;
  final String status;

  const UserConnectionInfo(this.date, this.status);

  @override
  List<Object> get props => [date, status];

  factory UserConnectionInfo.fromJson(Map<String, dynamic> json) => _$UserConnectionInfoFromJson(json);

  @override
  UserConnectionInfo fromJson(Map<String, dynamic> json) => _$UserConnectionInfoFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$UserConnectionInfoToJson(this);
}
