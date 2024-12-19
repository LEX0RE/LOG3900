import 'package:Scrabble/constants/array.dart';
import 'package:Scrabble/constants/communication.dart';
import 'package:Scrabble/constants/easel.dart';
import 'package:Scrabble/constants/game.dart';
import 'package:Scrabble/data/models/classes/letters/common_letter.dart';
import 'package:Scrabble/data/models/classes/letters/position_index_letter.dart';
import 'package:Scrabble/data/models/interfaces/game_info/common_easel.dart';
import 'package:Scrabble/data/models/interfaces/game_info/easel_update.dart';
import 'package:Scrabble/logic/socket/socket_manager_bloc.dart';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

part 'easel_letter_holder_state.dart';

class EaselLetterHolderCubit extends Cubit<EaselLetterHolderState> {
  CommonEasel? easel;
  List<CommonLetter> letters = [];

  final SocketManagerBloc socketManager;

  EaselLetterHolderCubit(this.socketManager) : super(EaselLetterHolderInitial()) {
    socketManager.add(SocketManagerAddHandler(EASEL_UPDATE, handleEaselUpdate, typeFactory: EaselUpdate.fromJson));
  }

  void handleEaselUpdate(dynamic update) {
    if (update is! EaselUpdate) return;

    this.easel = update.easel;
    letters = List.from(update.easel.letters);
    this.emit(EaselLetterHolderUpdated(update.easel));
  }

  void cancel() {
    handleEaselUpdate(EaselUpdate(CommonEasel(letters)));
  }

  void clear() {
    easel = null;
    emit(EaselLetterHolderInitial());
  }

  CommonLetter removeCommonLetter(CommonLetter letter) {
    if (this.easel == null) return CommonLetter.empty();
    final index = this.easel!.letters.indexWhere((CommonLetter element) {
      if (letter.isBlank) return element.isBlank;
      return letter.letter == element.letter;
    });
    if (index == INDEX_NOT_FOUND) return CommonLetter.empty();
    return this.removeLetterAt(index);
  }

  CommonLetter removeLetter(PositionLetterIndex? positionLetterIndex) {
    if (this.easel == null || positionLetterIndex == null) return CommonLetter.empty();
    return this.removeLetterAt(positionLetterIndex.index);
  }

  CommonLetter removeLetterAt(int index) {
    if (this.easel == null) return CommonLetter.empty();
    final letter = this.easel!.letters.removeAt(index);
    this.emit(EaselLetterHolderUpdated(this.easel!));
    return letter;
  }

  void addLetter(PositionLetterIndex? positionLetterIndex) {
    if (easel == null || positionLetterIndex == null) return;
    if (positionLetterIndex.letter.isBlank) {
      positionLetterIndex = positionLetterIndex.copyWith(CommonLetter(BLANK, BLANK_POINT));
    }
    easel!.letters.add(positionLetterIndex.letter);
    emit(EaselLetterHolderUpdated(easel!));
  }

  bool isAllowToAddLetter(PositionLetterIndex? positionLetterIndex) {
    if (easel == null || positionLetterIndex == null) return false;
    return easel!.letters.length < MAX_NUMBER_OF_LETTER;
  }
}
