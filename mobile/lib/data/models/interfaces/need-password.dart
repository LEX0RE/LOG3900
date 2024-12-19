import 'package:Scrabble/data/models/enums/joining_type.dart';
import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'need-password.g.dart';

@JsonSerializable(explicitToJson: true)
class NeedPassword extends Serializable<NeedPassword> {
  final bool needPassword;
  final String? lobbyId;
  final JoiningType? joiningType;
  final bool? isGame;
  final bool? isTournament;

  const NeedPassword(this.needPassword, this.lobbyId, this.joiningType, this.isGame, this.isTournament);

  @override
  List<Object> get props => [needPassword];

  factory NeedPassword.fromJson(Map<String, dynamic> json) => _$NeedPasswordFromJson(json);

  @override
  NeedPassword fromJson(Map<String, dynamic> json) => _$NeedPasswordFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$NeedPasswordToJson(this);
}
