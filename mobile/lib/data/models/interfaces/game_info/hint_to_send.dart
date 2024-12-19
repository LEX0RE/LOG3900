import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'hint_to_send.g.dart';

@JsonSerializable(explicitToJson: true)
class HintToSend extends Serializable<HintToSend> with EquatableMixin {
  final String command;
  final wordPlacement;

  const HintToSend(this.command, this.wordPlacement);

  factory HintToSend.fromJson(Map<String, dynamic> json) => _$HintToSendFromJson(json);

  @override
  List<Object> get props => [command, wordPlacement];

  @override
  HintToSend fromJson(Map<String, dynamic> json) => _$HintToSendFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$HintToSendToJson(this);
}
