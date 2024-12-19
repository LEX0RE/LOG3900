import 'package:Scrabble/constants/communication.dart';
import 'package:Scrabble/constants/route.dart';
import 'package:Scrabble/data/models/interfaces/bracket/common_end_tournament.dart';
import 'package:Scrabble/logic/router/router_manager.dart';
import 'package:Scrabble/logic/socket/socket_manager_bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

part 'end_tournament_state.dart';

class EndTournamentCubit extends Cubit<EndTournamentState> {
  final SocketManagerBloc socketManager;

  EndTournamentCubit(this.socketManager) : super(const EndTournamentInitial()) {
    socketManager.add(
        SocketManagerAddHandler(END_TOURNAMENT, handleEndTournamentUpdate, typeFactory: CommonEndTournament.fromJson));
    socketManager.add(SocketManagerAddHandler(TOURNAMENT_CONTINUE_EVENT, handleTournamentContinueUpdate));
  }

  bool canLeave() {
    return state.endTournament != null || state.canEndTournament;
  }

  void handleEndTournamentUpdate(dynamic update) {
    if (update is! CommonEndTournament) return;

    emit(EndTournamentUpdated(update, state.canEndTournament));
  }

  void handleTournamentContinueUpdate(dynamic update) {
    emit(EndTournamentUpdated(state.endTournament, true));
  }

  void reset(dynamic) => emit(const EndTournamentInitial());

  void leave(BuildContext context) {
    BlocProvider.of<RouterManager>(context).navigate(HOME_PATH, ROOT_PATH);
    socketManager.add(SocketManagerSend(LEAVE_TOURNAMENT));
    reset(dynamic);
  }

  void surrender(BuildContext context) {
    BlocProvider.of<RouterManager>(context).navigate(HOME_PATH, ROOT_PATH);
    socketManager.add(SocketManagerSend(SURRENDER_TOURNAMENT_EVENT));
    reset(dynamic);
  }
}
