part of 'game_password_cubit.dart';

@immutable
abstract class GamePasswordState {
  final NeedPassword needPassword;
  final bool passwordInvalid;
  const GamePasswordState(this.needPassword, this.passwordInvalid);

  @override
  List<Object> get props => [needPassword];
}

class GamePasswordInitial extends GamePasswordState {
  const GamePasswordInitial() : super(const NeedPassword(false, null, null, null, null), false);
}

class GamePasswordNeed extends GamePasswordState {
  GamePasswordNeed(String lobbyId, JoiningType joiningType, bool isGame, bool isTournament, bool invalidPassword)
      : super(NeedPassword(true, lobbyId, joiningType, isGame, isTournament), invalidPassword);
}

class GamePasswordCanceled extends GamePasswordState {
  const GamePasswordCanceled() : super(const NeedPassword(false, null, null, null, null), false);
}
