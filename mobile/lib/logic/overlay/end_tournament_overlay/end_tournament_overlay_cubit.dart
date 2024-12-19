import 'package:Scrabble/constants/communication.dart';
import 'package:Scrabble/data/models/interfaces/bracket/common_end_tournament.dart';
import 'package:Scrabble/logic/socket/socket_manager_bloc.dart';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter/widgets.dart';

part 'end_tournament_overlay_state.dart';

class EndTournamentOverlayCubit extends Cubit<EndTournamentOverlayState> {
  final SocketManagerBloc socketManager;

  EndTournamentOverlayCubit(this.socketManager) : super(EndTournamentOverlayInitial()) {
    this
        .socketManager
        .add(SocketManagerAddHandler(END_TOURNAMENT, this.show, typeFactory: CommonEndTournament.fromJson));
  }

  void show(dynamic) => emit(EndTournamentOverlayShow());

  void hide() => emit(EndTournamentOverlayHidden());
}
