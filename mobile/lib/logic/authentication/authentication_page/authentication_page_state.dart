part of 'authentication_page_cubit.dart';

@immutable
abstract class AuthenticationPageState with EquatableMixin {
  const AuthenticationPageState();

  @override
  List<Object> get props => [];
}

class AuthenticationPageLogin extends AuthenticationPageState {}

class AuthenticationPageRegister extends AuthenticationPageState {}
