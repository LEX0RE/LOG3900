part of 'login_bloc.dart';

@immutable
abstract class LoginEvent with EquatableMixin {
  @override
  List<Object?> get props => [];
}

class LoginEventLogin extends LoginEvent {}
