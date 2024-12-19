import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'approvals_list_update.g.dart';

@JsonSerializable(explicitToJson: true)
class ApprovalsListUpdate extends Serializable<ApprovalsListUpdate> with EquatableMixin {
  final List<String> approvingPlayersNames;
  final List<String> rejectingPlayersNames;
  final List<String> noResponsePlayersNames;

  const ApprovalsListUpdate(this.approvingPlayersNames, this.rejectingPlayersNames, this.noResponsePlayersNames);

  @override
  List<Object> get props => [approvingPlayersNames, rejectingPlayersNames, noResponsePlayersNames];

  factory ApprovalsListUpdate.fromJson(Map<String, dynamic> json) => _$ApprovalsListUpdateFromJson(json);

  @override
  ApprovalsListUpdate fromJson(Map<String, dynamic> json) => _$ApprovalsListUpdateFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$ApprovalsListUpdateToJson(this);
}
