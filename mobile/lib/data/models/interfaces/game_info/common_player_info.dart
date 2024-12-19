import 'package:Scrabble/data/models/interfaces/game_info/common_easel.dart';
import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'common_player_info.g.dart';

@JsonSerializable(explicitToJson: true)
class CommonPlayerInfo extends Serializable<CommonPlayerInfo> with EquatableMixin {
  final String name;
  final int score;
  final int nLetterLeft;
  final bool turn;
  final String userId;
  CommonEasel? easel;
  final String? profilePicture;

  @override
  List<Object?> get props => [name, score, nLetterLeft, turn, userId, profilePicture];

  CommonPlayerInfo(this.name, this.userId, this.score, this.nLetterLeft, this.turn, this.profilePicture, this.easel);

  factory CommonPlayerInfo.fromJson(Map<String, dynamic> json) => _$CommonPlayerInfoFromJson(json);

  @override
  CommonPlayerInfo fromJson(Map<String, dynamic> json) => _$CommonPlayerInfoFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$CommonPlayerInfoToJson(this);
}
