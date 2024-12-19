import 'package:Scrabble/constants/communication.dart';
import 'package:Scrabble/data/models/interfaces/game_info/common_end_game.dart';
import 'package:Scrabble/logic/socket/socket_manager_bloc.dart';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter/widgets.dart';

part 'end_game_overlay_state.dart';

class EndGameOverlayCubit extends Cubit<EndGameOverlayState> {
  final SocketManagerBloc socketManager;

  EndGameOverlayCubit(this.socketManager) : super(EndGameOverlayHidden()) {
    this.socketManager.add(SocketManagerAddHandler(END_GAME, this.show, typeFactory: CommonEndGame.fromJson));
  }

  void show(dynamic) => emit(EndGameOverlayShow());

  void hide() => emit(EndGameOverlayHidden());
}
