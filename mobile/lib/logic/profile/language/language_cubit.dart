import 'package:Scrabble/data/models/enums/language.dart';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter/material.dart';

part 'language_cubit_state.dart';

class LanguageCubit extends Cubit<LanguageCubitState> {
  LanguageCubit() : super(const LanguageCubitInitial());

  void setLanguage(LanguageEnum language) {
    emit(LanguageCubitUpdated(Locale(language.toString())));
  }
}
