import 'package:Scrabble/logic/socket/socket_manager_bloc.dart';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter/widgets.dart';

part 'surrender_overlay_state.dart';

class SurrenderOverlayCubit extends Cubit<SurrenderOverlayState> {
  final SocketManagerBloc socketManager;

  SurrenderOverlayCubit(this.socketManager) : super(const SurrenderOverlayHidden());

  void show() => emit(const SurrenderOverlayShow());

  void hide() => emit(const SurrenderOverlayHidden());

  @override
  Future<void> close() {
    hide();
    return super.close();
  }
}
