import 'package:Scrabble/constants/communication.dart';
import 'package:Scrabble/logic/socket/socket_manager_bloc.dart';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter/widgets.dart';

part 'game_continue_overlay_state.dart';

class GameContinueOverlayCubit extends Cubit<GameContinueOverlayState> {
  final SocketManagerBloc socketManager;

  GameContinueOverlayCubit(this.socketManager) : super(GameContinueOverlayHidden()) {
    this.socketManager.add(SocketManagerAddHandler(GAME_CONTINUE_EVENT, this.show));
  }

  void show(dynamic) => emit(GameContinueOverlayShow());

  void hide() => emit(GameContinueOverlayHidden());
}
