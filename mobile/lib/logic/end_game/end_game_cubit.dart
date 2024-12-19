import 'package:Scrabble/constants/communication.dart';
import 'package:Scrabble/constants/route.dart';
import 'package:Scrabble/data/models/interfaces/game_info/common_end_game.dart';
import 'package:Scrabble/logic/bracket/bracket_cubit.dart';
import 'package:Scrabble/logic/router/router_manager.dart';
import 'package:Scrabble/logic/socket/socket_manager_bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

part 'end_game_state.dart';

class EndGameCubit extends Cubit<EndGameState> {
  final SocketManagerBloc socketManager;

  EndGameCubit(this.socketManager) : super(const EndGameInitial()) {
    socketManager.add(SocketManagerAddHandler(END_GAME, handleEndGameUpdate, typeFactory: CommonEndGame.fromJson));
    socketManager.add(SocketManagerAddHandler(GAME_CONTINUE_EVENT, handleGameContinueUpdate));
    socketManager.add(SocketManagerAddHandler(REDIRECT_TO_TOURNAMENT, reset));
  }

  bool canLeave() {
    return state.endGame != null || state.canEndGame;
  }

  void handleEndGameUpdate(dynamic update) {
    if (update is! CommonEndGame) return;

    emit(EndGameUpdated(update, state.canEndGame));
  }

  void handleGameContinueUpdate(dynamic update) {
    emit(EndGameUpdated(state.endGame, true));
  }

  void reset(dynamic) => emit(const EndGameInitial());

  void leave(BuildContext context) {
    if (context.read<BracketCubit>().state.brackets.isNotEmpty) {
      BlocProvider.of<RouterManager>(context).navigate(BRACKET_SCREEN_PATH, ROOT_PATH);
    } else {
      BlocProvider.of<RouterManager>(context).navigate(HOME_PATH, ROOT_PATH);
    }
    socketManager.add(SocketManagerSend(LEAVE_GAME));
    reset(dynamic);
  }

  void surrender() {
    socketManager.add(SocketManagerSend(SURRENDER_EVENT));
    reset(dynamic);
  }
}
