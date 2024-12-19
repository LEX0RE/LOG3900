import 'package:Scrabble/data/models/enums/game_modes.dart';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

part 'gamemode_state.dart';

class GamemodeCubit extends Cubit<GamemodeState> {
  GamemodeCubit() : super(const GamemodeInitial());

  void updateGamemode(GameModesEnum gamemode) {
    emit(GamemodeUpdated(gamemode));
  }
}
