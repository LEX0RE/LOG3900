import 'package:Scrabble/constants/communication.dart';
import 'package:Scrabble/data/models/enums/joining_type.dart';
import 'package:Scrabble/data/models/interfaces/lobby-password.dart';
import 'package:Scrabble/data/models/interfaces/need-password.dart';
import 'package:Scrabble/data/repositories/visibility_repository.dart';
import 'package:Scrabble/logic/socket/socket_manager_bloc.dart';
import 'package:bloc/bloc.dart';
import 'package:meta/meta.dart';

part 'game_password_state.dart';

class GamePasswordCubit extends Cubit<GamePasswordState> {
  final VisibilityRepository visibilityRepository;
  final SocketManagerBloc socketManager;
  late String password = "";

  GamePasswordCubit(this.visibilityRepository, this.socketManager) : super(GamePasswordInitial());

  void needPassword(String lobbyId, JoiningType joiningType, bool isGame, bool isTournament) {
    emit(GamePasswordNeed(lobbyId, joiningType, isGame, isTournament, false));
  }

  void closePassword() {
    this.password = '';
    emit(const GamePasswordCanceled());
  }

  void validatePassword(String? lobbyId, JoiningType? joiningType, bool? isGame, bool? isTournament) {
    if (lobbyId == null || joiningType == null || isGame == null || isTournament == null) return;

    LobbyPassword lobbyPassword = LobbyPassword(lobbyId, password);
    visibilityRepository.verifyPassword(lobbyPassword).then((value) => {
          if (value)
            goToGame(lobbyId, joiningType, isGame)
          else
            emit(GamePasswordNeed(lobbyId, joiningType, isGame, isTournament, true))
        });
  }

  void goToGame(String lobbyId, JoiningType joiningType, bool isGame) {
    this.password = '';
    emit(const GamePasswordCanceled());
    if (joiningType == JoiningType.PLAY)
      socketManager.add(SocketManagerSend(JOIN_LOBBY, lobbyId));
    else if (isGame)
      socketManager.add(SocketManagerSend(ADD_OBSERVER_TO_GAME, lobbyId));
    else
      socketManager.add(SocketManagerSend(ADD_OBSERVER_TO_LOBBY, lobbyId));
  }

  void joinLobby(String lobbyId) {
    this.password = '';
    emit(const GamePasswordCanceled());
    socketManager.add(SocketManagerSend(JOIN_LOBBY, lobbyId));
  }

  void observeGame(String gameId) {
    this.password = '';
    emit(const GamePasswordCanceled());
    this.socketManager.add(SocketManagerSend(ADD_OBSERVER_TO_GAME, gameId));
  }

  void observeLobby(String lobbyId) {
    this.password = '';
    emit(const GamePasswordCanceled());
    this.socketManager.add(SocketManagerSend(ADD_OBSERVER_TO_LOBBY, lobbyId));
  }

  void setPassword(String password) {
    this.password = password;
  }
}
