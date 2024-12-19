import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'previewable_hint.g.dart';

@JsonSerializable(explicitToJson: true)
class PreviewableHint extends Serializable<PreviewableHint> with EquatableMixin {
  final String wordHint;
  final String command;

  const PreviewableHint(this.wordHint, this.command);

  factory PreviewableHint.fromJson(Map<String, dynamic> json) => _$PreviewableHintFromJson(json);

  @override
  List<Object> get props => [wordHint, command];

  @override
  PreviewableHint fromJson(Map<String, dynamic> json) => _$PreviewableHintFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$PreviewableHintToJson(this);
}
