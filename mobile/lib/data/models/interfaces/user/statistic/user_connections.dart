import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:Scrabble/data/models/interfaces/user/statistic/user_connection_info.dart';
import 'package:json_annotation/json_annotation.dart';

part 'user_connections.g.dart';

@JsonSerializable(explicitToJson: true)
class UserConnections extends Serializable<UserConnections> {
  final String userId;
  final List<UserConnectionInfo> connections;

  const UserConnections(this.userId, this.connections);

  @override
  List<Object> get props => [userId, connections];

  factory UserConnections.fromJson(Map<String, dynamic> json) => _$UserConnectionsFromJson(json);

  @override
  UserConnections fromJson(Map<String, dynamic> json) => _$UserConnectionsFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$UserConnectionsToJson(this);
}
