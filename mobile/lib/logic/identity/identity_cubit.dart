import 'package:Scrabble/data/models/enums/language.dart';
import 'package:Scrabble/data/models/enums/theme.dart';
import 'package:Scrabble/data/models/interfaces/identity.dart';
import 'package:Scrabble/data/models/interfaces/user/user.dart';
import 'package:Scrabble/data/models/interfaces/user/user_interface.dart';
import 'package:Scrabble/logic/profile/language/language_cubit.dart';
import 'package:Scrabble/view/theme/cubit/theme_cubit.dart';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter/widgets.dart';

part 'identity_state.dart';

const EMPTY_IDENTITY = Identity(user: User('', ''), token: '');
const EMPTY_USER_PROFILE = UserInterface('', '', '', '', '', '', '', '', [], [], []);

class IdentityHolder extends Cubit<IdentityState> {
  Identity get identity => state is IdentityAvailable ? (state as IdentityAvailable).identity : EMPTY_IDENTITY;
  UserInterface get userProfile =>
      state is IdentityAvailable ? (state as IdentityAvailable).userProfile : EMPTY_USER_PROFILE;
  final ThemeCubit themeCubit;
  final LanguageCubit languageCubit;

  IdentityHolder(this.themeCubit, this.languageCubit) : super(IdentityInitial());

  void setIdentity(UserInterface userProfile) {
    Identity identity = Identity(user: User(userProfile.userName, userProfile.userId), token: userProfile.token);
    themeCubit.changeTheme(ThemeEnum.fromString(userProfile.theme));
    languageCubit.setLanguage(LanguageEnum.fromString(userProfile.language));
    emit(IdentityAvailable(identity, userProfile));
  }

  void clearIdentity() {
    if (isClosed) return;
    themeCubit.changeTheme(ThemeEnum(AppTheme.Default));
    languageCubit.setLanguage(LanguageEnum(LanguageType.French));
    emit(IdentityNotAvailable());
  }
}
