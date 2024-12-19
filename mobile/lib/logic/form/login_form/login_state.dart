part of 'login_bloc.dart';

@immutable
abstract class LoginState with EquatableMixin {
  @override
  List<Object?> get props => [];
}

class LoginInitial extends LoginState {}

class LoginLoading extends LoginState {}
