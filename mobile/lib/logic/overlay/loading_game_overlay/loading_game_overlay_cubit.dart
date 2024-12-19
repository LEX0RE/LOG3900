import 'package:Scrabble/constants/communication.dart';
import 'package:Scrabble/data/models/interfaces/game_info/game_update.dart';
import 'package:Scrabble/logic/socket/socket_manager_bloc.dart';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter/widgets.dart';

part 'loading_game_overlay_state.dart';

class LoadingGameOverlayCubit extends Cubit<LoadingGameOverlayState> {
  final SocketManagerBloc socketManager;

  LoadingGameOverlayCubit(this.socketManager) : super(const LoadingGameOverlayShow()) {
    socketManager.add(SocketManagerAddHandler(GAME_UPDATE, hide, typeFactory: GameUpdate.fromJson));
  }

  void show() => emit(const LoadingGameOverlayShow());

  void hide(dynamic) => emit(const LoadingGameOverlayHidden());
}
