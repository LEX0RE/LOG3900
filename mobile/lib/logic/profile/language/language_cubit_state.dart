part of 'language_cubit.dart';

@immutable
abstract class LanguageCubitState with EquatableMixin {
  final Locale language;

  const LanguageCubitState(this.language);

  @override
  List<Object> get props => [language];
}

class LanguageCubitInitial extends LanguageCubitState {
  const LanguageCubitInitial() : super(const Locale('fr'));
}

class LanguageCubitUpdated extends LanguageCubitState {
  const LanguageCubitUpdated(Locale language) : super(language);
}
