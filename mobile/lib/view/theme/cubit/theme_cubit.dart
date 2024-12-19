import 'package:Scrabble/data/models/enums/theme.dart';
import 'package:Scrabble/view/theme/app_themes.dart';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter/material.dart';

part 'theme_state.dart';

class ThemeCubit extends Cubit<ThemeState> {
  ThemeCubit() : super(ThemeState(theme: appThemeData[AppTheme.Default], themeEnum: ThemeEnum(AppTheme.Default)));

  void changeTheme(ThemeEnum newTheme) => emit(ThemeState(theme: appThemeData[newTheme.value], themeEnum: newTheme));
}
