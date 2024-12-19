import 'package:Scrabble/constants/communication.dart';
import 'package:Scrabble/data/models/interfaces/game_info/game_update.dart';
import 'package:Scrabble/logic/end_game/end_game_cubit.dart';
import 'package:Scrabble/logic/game_info_holder/board_holder/board_holder_cubit.dart';
import 'package:Scrabble/logic/game_info_holder/easel_letter_holder/easel_letter_holder_cubit.dart';
import 'package:Scrabble/logic/game_info_holder/player_info_holder/player_info_holder_cubit.dart';
import 'package:Scrabble/logic/game_info_holder/stash_info/stash_info_cubit.dart';
import 'package:Scrabble/logic/game_info_holder/timer/timer_cubit.dart';
import 'package:Scrabble/logic/game_manager/game_manager_cubit.dart';
import 'package:Scrabble/logic/socket/socket_manager_bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

part 'game_state.dart';

class GameCubit extends Cubit<GameState> {
  final SocketManagerBloc socketManager;
  GameCubit(this.socketManager) : super(const GameInitial()) {
    socketManager.add(SocketManagerAddHandler(
      GAME_UPDATE,
      _handleGameUpdate,
      typeFactory: GameUpdate.fromJson,
    ));
  }

  void reset(BuildContext context) {
    try {
      context.read<BoardHolderCubit>().clearBoard();
      context.read<EaselLetterHolderCubit>().clear();
      context.read<PlayerInfoHolderCubit>().reset();
      context.read<StashInfoCubit>().reset();
      context.read<TimerCubit>().reset();
      context.read<EndGameCubit>().reset(dynamic);
      context.read<GameManagerCubit>().reset(context);
      emit(const GameUpdated(hasToResetHint: true));
    } catch (e) {
      debugPrint('Fail to reset Game widget');
    }
  }

  void hasToResetHintToFalse() {
    emit(const GameUpdated(hasToResetHint: false));
  }

  void _handleGameUpdate(dynamic gameUpdate) {
    if (gameUpdate is! GameUpdate) return;

    emit(GameUpdated(hasToResetHint: !gameUpdate.playerInfo.turn));
  }
}
