import 'package:equatable/equatable.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

abstract class ScrabbleEnum<T extends Enum> with EquatableMixin {
  final T value;
  const ScrabbleEnum(this.value);

  @override
  List<Object> get props => [value];

  Map<ScrabbleEnum<T>, String> mapInternationalNames(AppLocalizations localization);

  String toEnumValueString();

  String internationalName(AppLocalizations localization) => mapInternationalNames(localization)[this] ?? '';

  T fromString(String value);

  @override
  String toString() => toEnumValueString();
}
