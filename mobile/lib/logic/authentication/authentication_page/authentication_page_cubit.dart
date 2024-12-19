import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

part 'authentication_page_state.dart';

class AuthenticationPageCubit extends Cubit<AuthenticationPageState> {
  AuthenticationPageCubit() : super(AuthenticationPageLogin());

  void switchToLogin() {
    emit(AuthenticationPageLogin());
  }

  void switchToRegister() {
    emit(AuthenticationPageRegister());
  }
}
