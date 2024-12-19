part of 'authentication_manager_bloc.dart';

@immutable
abstract class AuthenticationManagerState with EquatableMixin {
  const AuthenticationManagerState();

  @override
  List<Object> get props => [];
}

class AuthenticationManagerInitial extends AuthenticationManagerState {}

class AuthenticationManagerStateLoggedIn extends AuthenticationManagerState {}

class AuthenticationManagerStateLoggedOut extends AuthenticationManagerState {}

class AuthenticationManagerStateLogFailed extends AuthenticationManagerState {
  final String message;

  const AuthenticationManagerStateLogFailed(this.message);

  @override
  List<Object> get props => [message];
}

class AuthenticationManagerStateRegisterFailed extends AuthenticationManagerState {
  final String message;

  const AuthenticationManagerStateRegisterFailed(this.message);

  @override
  List<Object> get props => [message];
}
