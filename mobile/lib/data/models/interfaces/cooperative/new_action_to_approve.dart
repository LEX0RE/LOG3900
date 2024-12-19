import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'new_action_to_approve.g.dart';

@JsonSerializable(explicitToJson: true)
class NewActionToApprove extends Serializable<NewActionToApprove> with EquatableMixin {
  final String command;
  final String actionPlayerName;

  const NewActionToApprove(this.command, this.actionPlayerName);

  @override
  List<Object> get props => [command, actionPlayerName];

  factory NewActionToApprove.fromJson(Map<String, dynamic> json) => _$NewActionToApproveFromJson(json);

  @override
  NewActionToApprove fromJson(Map<String, dynamic> json) => _$NewActionToApproveFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$NewActionToApproveToJson(this);
}
