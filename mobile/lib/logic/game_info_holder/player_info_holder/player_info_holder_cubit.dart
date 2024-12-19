import 'package:Scrabble/constants/communication.dart';
import 'package:Scrabble/data/models/interfaces/game_info/common_player_info.dart';
import 'package:Scrabble/data/models/interfaces/game_info/game_update.dart';
import 'package:Scrabble/logic/socket/socket_manager_bloc.dart';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

import '../../../data/models/interfaces/game_info/easel_update.dart';

part 'player_info_holder_state.dart';

class PlayerInfoHolderCubit extends Cubit<PlayerInfoHolderState> {
  CommonPlayerInfo? playerInfo;
  List<CommonPlayerInfo>? otherPlayersInfo;
  final SocketManagerBloc socketManager;

  PlayerInfoHolderCubit(this.socketManager) : super(PlayerInfoHolderInitial()) {
    socketManager
        .add(SocketManagerAddHandler(GAME_UPDATE, this._handlePlayerInfoUpdate, typeFactory: GameUpdate.fromJson));
    socketManager
        .add(SocketManagerAddHandler(EASEL_UPDATE, this._observerEaselUpdate, typeFactory: UserEaselUpdate.fromJson));
  }

  void reset() {
    playerInfo = null;
    otherPlayersInfo = null;
    emit(PlayerInfoHolderInitial());
  }

  bool isPlayerTurn() => playerInfo?.turn ?? false;

  void _handlePlayerInfoUpdate(dynamic gameUpdate) {
    if (gameUpdate is! GameUpdate) return;

    playerInfo = gameUpdate.playerInfo;
    otherPlayersInfo = gameUpdate.otherPlayersInfo;
    emit(PlayerInfoHolderUpdated(gameUpdate.playerInfo, gameUpdate.otherPlayersInfo));
  }

  void _observerEaselUpdate(dynamic update) {
    if (this.playerInfo?.userId == update.userId) {
      this.playerInfo?.easel = update.easel;
    } else {
      final updatedUser =
          this.otherPlayersInfo?.firstWhere((CommonPlayerInfo player) => player.userId == update.userId);
      if (updatedUser != null) updatedUser.easel = update.easel;
    }
  }
}
