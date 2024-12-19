part of 'game_manager_cubit.dart';

@immutable
abstract class GameManagerState with EquatableMixin {
  @override
  List<Object?> get props => [];
}

class GameManagerInitial extends GameManagerState {}

class GameManagerRedirectToTournament extends GameManagerState {}

class GameManagerRedirectToGame extends GameManagerState {}

class GameManagerRedirectToHome extends GameManagerState {}
