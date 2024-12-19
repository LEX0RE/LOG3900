import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'common_timer.g.dart';

@JsonSerializable(explicitToJson: true)
class CommonTimer extends Serializable<CommonTimer> with EquatableMixin {
  final int minute;
  final int second;

  const CommonTimer(this.minute, this.second);

  @override
  List<Object> get props => [minute, second];

  factory CommonTimer.fromJson(Map<String, dynamic> json) => _$CommonTimerFromJson(json);

  @override
  CommonTimer fromJson(Map<String, dynamic> json) => _$CommonTimerFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$CommonTimerToJson(this);
}
