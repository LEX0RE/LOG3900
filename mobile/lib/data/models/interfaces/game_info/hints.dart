import 'package:Scrabble/data/models/interfaces/game_info/hint_to_send.dart';
import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'hints.g.dart';

@JsonSerializable(explicitToJson: true)
class Hints extends Serializable<Hints> with EquatableMixin {
  final List<HintToSend> hints;

  const Hints(this.hints);

  factory Hints.fromJson(Map<String, dynamic> json) => _$HintsFromJson(json);

  @override
  List<Object> get props => [hints];

  @override
  Hints fromJson(Map<String, dynamic> json) => _$HintsFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$HintsToJson(this);
}
