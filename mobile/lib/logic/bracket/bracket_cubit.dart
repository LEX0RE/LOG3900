import 'package:Scrabble/constants/communication.dart';
import 'package:Scrabble/data/models/interfaces/bracket/common_bracket.dart';
import 'package:Scrabble/data/models/interfaces/bracket/common_tournament.dart';
import 'package:Scrabble/logic/socket/socket_manager_bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:meta/meta.dart';

part 'bracket_state.dart';

class BracketCubit extends Cubit<BracketState> {
  final SocketManagerBloc socketManager;

  BracketCubit(this.socketManager) : super(BracketInitial()) {
    socketManager
        .add(SocketManagerAddHandler(TOURNAMENT_UPDATE, handleBracketUpdate, typeFactory: CommonTournament.fromJson));
  }

  void handleBracketUpdate(dynamic update) {
    if (update is! CommonTournament) return;

    emit(BracketUpdated(update.brackets));
  }

  void clearBracket() {
    emit(const BracketInitial());
  }
}
