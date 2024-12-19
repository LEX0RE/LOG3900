import 'package:Scrabble/constants/communication.dart';
import 'package:Scrabble/logic/socket/socket_manager_bloc.dart';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter/widgets.dart';

part 'game_manager_state.dart';

class GameManagerCubit extends Cubit<GameManagerState> {
  final SocketManagerBloc socketManager;

  GameManagerCubit(this.socketManager) : super(GameManagerInitial()) {
    this.socketManager.add(SocketManagerAddHandler(REDIRECT_TO_TOURNAMENT, this._redirectToTournament));
    this.socketManager.add(SocketManagerAddHandler(REDIRECT_TO_GAME, this._redirectToGame));
    this.socketManager.add(SocketManagerAddHandler(REDIRECT_TO_HOME, this._redirectToHome));
  }

  void reset(dynamic) => emit(GameManagerInitial());

  void _redirectToTournament(dynamic) => emit(GameManagerRedirectToTournament());

  void _redirectToGame(dynamic) => emit(GameManagerRedirectToGame());

  void _redirectToHome(dynamic) => emit(GameManagerRedirectToHome());
}
