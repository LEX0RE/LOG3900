import 'package:Scrabble/constants/communication.dart';
import 'package:Scrabble/data/models/interfaces/game_info/common_stash.dart';
import 'package:Scrabble/data/models/interfaces/game_info/game_update.dart';
import 'package:Scrabble/logic/socket/socket_manager_bloc.dart';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

part 'stash_info_state.dart';

class StashInfoCubit extends Cubit<StashInfoState> {
  CommonStash? stash;
  final SocketManagerBloc socketManager;
  StashInfoCubit(this.socketManager) : super(StashInfoInitial()) {
    socketManager
        .add(SocketManagerAddHandler(GAME_UPDATE, handleStashUpdate, typeFactory: GameUpdate.fromJson));
  }

  void reset() {
    stash = null;
    emit(StashInfoInitial());
  }

  void handleStashUpdate(dynamic gameUpdate) {
    if (gameUpdate is! GameUpdate) return;

    stash = gameUpdate.stash;
    emit(StashInfoUpdated(gameUpdate.stash));
  }
}
