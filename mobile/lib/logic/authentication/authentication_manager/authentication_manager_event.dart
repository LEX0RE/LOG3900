part of 'authentication_manager_bloc.dart';

@immutable
abstract class AuthenticationManagerEvent with EquatableMixin {
  const AuthenticationManagerEvent();

  @override
  List<Object> get props => [];
}

class AuthenticationManagerEventLogin extends AuthenticationManagerEvent {
  final UserLogin userLogin;

  @override
  List<Object> get props => [userLogin];

  const AuthenticationManagerEventLogin(this.userLogin);
}

class AuthenticationManagerEventRegister extends AuthenticationManagerEvent {
  final UserInterface newUser;

  @override
  List<Object> get props => [newUser];

  const AuthenticationManagerEventRegister(this.newUser);
}

class AuthenticationManagerEventLogout extends AuthenticationManagerEvent {}

class AuthenticationManagerEventIdentity extends AuthenticationManagerEvent {
  final IdentityState state;

  @override
  List<Object> get props => [state];

  const AuthenticationManagerEventIdentity(this.state);
}
