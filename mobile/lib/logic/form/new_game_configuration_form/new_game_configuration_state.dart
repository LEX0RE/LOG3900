part of 'new_game_configuration_cubit.dart';

@immutable
abstract class NewGameConfigurationState with EquatableMixin {
  @override
  List<Object?> get props => [];
}

class NewGameConfigurationInitial extends NewGameConfigurationState with EquatableMixin {}

class NewGameConfigurationDictionaryChanged extends NewGameConfigurationState {
  final String dictionary;

  @override
  List<Object?> get props => [dictionary];

  NewGameConfigurationDictionaryChanged({required this.dictionary});
}

class NewGameConfigurationTimerChanged extends NewGameConfigurationState {
  final CommonTimer timer;

  @override
  List<Object?> get props => [timer];

  NewGameConfigurationTimerChanged({required this.timer});
}

class NewGameConfigurationVisibilityChanged extends NewGameConfigurationState {
  final bool isPublic;
  final bool hasPassword;

  @override
  List<Object?> get props => [isPublic, hasPassword];

  NewGameConfigurationVisibilityChanged({required this.isPublic, required this.hasPassword});
}

class NewGameConfigurationGameCreated extends NewGameConfigurationState {
  @override
  List<Object?> get props => [];

  NewGameConfigurationGameCreated();
}
