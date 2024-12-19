import 'package:Scrabble/logic/socket/socket_manager_bloc.dart';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter/widgets.dart';

part 'surrender_tournament_overlay_state.dart';

class SurrenderTournamentOverlayCubit extends Cubit<SurrenderTournamentOverlayState> {
  final SocketManagerBloc socketManager;

  SurrenderTournamentOverlayCubit(this.socketManager) : super(SurrenderTournamentOverlayHidden());

  void show() => emit(SurrenderTournamentOverlayShow());

  void hide() => emit(SurrenderTournamentOverlayHidden());
}
