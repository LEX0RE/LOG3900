import 'package:Scrabble/constants/form.dart';
import 'package:Scrabble/data/models/enums/dictionary_language.dart';
import 'package:Scrabble/data/models/enums/game_visibilities.dart';
import 'package:Scrabble/data/models/interfaces/game_info/common_timer.dart';
import 'package:Scrabble/data/models/interfaces/lobby/common_game_config.dart';
import 'package:Scrabble/data/models/interfaces/lobby/lobby_creation.dart';
import 'package:Scrabble/data/models/interfaces/user/user.dart';
import 'package:Scrabble/data/repositories/new_game_configuration_repository.dart';
import 'package:Scrabble/logic/form/lobby-password-validator/lobby-password-validator.dart';
import 'package:Scrabble/logic/gamemode/gamemode_cubit.dart';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

part 'new_game_configuration_state.dart';

class NewGameConfigurationCubit extends Cubit<NewGameConfigurationState> {
  final AppLocalizations localization;
  final NewGameRepository newGameRepository;
  final GamemodeCubit gameMode;
  late String dictionary = localization.frenchDictionary;
  late CommonTimer timer = const CommonTimer(1, 0);
  late GameVisibilities visibility = GameVisibilities.PUBLIC_NO_PASSWORD;
  late bool isPublic = true;
  late bool hasPassword = false;
  late String password = "";
  late List<User> invitedFriends = [];

  NewGameConfigurationCubit(this.localization, this.newGameRepository, this.gameMode)
      : super(NewGameConfigurationInitial());

  void setDictionary(String? newDictionary) {
    if (newDictionary == null) return;
    dictionary = newDictionary;
    emit(NewGameConfigurationDictionaryChanged(dictionary: newDictionary));
  }

  void setTurnDuration(double newTurnDuration) {
    double minutes = newTurnDuration / 60;
    double seconds = newTurnDuration % 60;
    CommonTimer newTimer = CommonTimer(minutes.floor(), seconds.ceil());
    timer = newTimer;
    emit(NewGameConfigurationTimerChanged(timer: newTimer));
  }

  void setVisibility(bool isPublic) {
    this.isPublic = isPublic;
    if (this.isPublic) {
      visibility = GameVisibilities.PUBLIC_NO_PASSWORD;
    } else {
      visibility = GameVisibilities.PRIVATE;
    }
    this.password = '';

    this.emit(NewGameConfigurationVisibilityChanged(isPublic: this.isPublic, hasPassword: false));
  }

  void setVisibilityPassword(bool hasPassword) {
    this.hasPassword = hasPassword;
    if (this.hasPassword) {
      visibility = GameVisibilities.PUBLIC_PASSWORD;
    } else if (this.isPublic) {
      visibility = GameVisibilities.PUBLIC_NO_PASSWORD;
    } else {
      visibility = GameVisibilities.PRIVATE;
    }
    this.password = '';

    this.emit(NewGameConfigurationVisibilityChanged(isPublic: this.isPublic, hasPassword: this.hasPassword));
  }

  void setPassword(String password) {
    this.password = password;
  }

  void submit() {
    CommonGameConfig gameConfig =
        CommonGameConfig(turnTimer: timer, dictionaryTitle: convertToCommonDictionary(dictionary, localization));
    String gameMode = this.gameMode.state.gamemode.toEnumValueString();
    String visibility = gameVisibilityToString(this.visibility);
    LobbyCreation gameToCreate = LobbyCreation(gameConfig, gameMode, visibility, password, invitedFriends);
    if (hasPassword) {
      if (password.isNotEmpty &&
          password.length <= MAX_LENGTH_PASSWORD_LOBBY &&
          password.length >= MIN_LENGTH_PASSWORD_LOBBY)
        newGameRepository.createLobby(gameToCreate).then((value) => this.emit(NewGameConfigurationGameCreated()));
    } else
      newGameRepository.createLobby(gameToCreate).then((value) => this.emit(NewGameConfigurationGameCreated()));
  }

  String? passwordValidator(String? value) => validatePassword(value, this.localization);
}
