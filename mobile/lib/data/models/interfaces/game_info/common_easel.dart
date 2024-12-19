import 'package:Scrabble/constants/game.dart';
import 'package:Scrabble/data/models/classes/letters/common_letter.dart';
import 'package:Scrabble/data/models/classes/letters/position_index_letter.dart';
import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'common_easel.g.dart';

@JsonSerializable(explicitToJson: true)
class CommonEasel extends Serializable<CommonEasel> with EquatableMixin {
  final List<CommonLetter> letters;

  const CommonEasel(this.letters);

  static List<PositionLetterIndex> toPositionLetterIndex(CommonEasel easel) {
    List<PositionLetterIndex> positionLetterIndex = [];
    easel.letters.asMap().forEach((int index, CommonLetter letter) {
      positionLetterIndex.add(letter.toPositionLetterIndex(index, EMPTY_COORDINATE));
    });
    return positionLetterIndex;
  }

  factory CommonEasel.copy(CommonEasel easel) => CommonEasel(List.from(easel.letters));

  factory CommonEasel.fromJson(Map<String, dynamic> json) => _$CommonEaselFromJson(json);

  @override
  CommonEasel fromJson(Map<String, dynamic> json) => _$CommonEaselFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$CommonEaselToJson(this);

  @override
  List<Object> get props => [letters];
}
