part of 'theme_cubit.dart';

class ThemeState with EquatableMixin {
  final ThemeData? theme;
  final ThemeEnum themeEnum;
  const ThemeState({required this.theme, required this.themeEnum});

  @override
  List<Object?> get props => [theme, themeEnum];
}
