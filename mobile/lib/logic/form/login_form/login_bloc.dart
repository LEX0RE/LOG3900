import 'package:Scrabble/data/models/interfaces/user/user_login.dart';
import 'package:Scrabble/logic/authentication/authentication_manager/authentication_manager_bloc.dart';
import 'package:Scrabble/logic/user_validator/user_validator.dart';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

part 'login_event.dart';
part 'login_state.dart';

class LoginBloc extends Bloc<LoginEvent, LoginState> {
  final AppLocalizations localizations;
  final AuthenticationManagerBloc authenticationManager;

  final TextEditingController usernameController;
  final TextEditingController passwordController;

  LoginBloc(
      {required this.usernameController,
      required this.passwordController,
      required this.localizations,
      required this.authenticationManager})
      : super(LoginInitial()) {
    on<LoginEvent>(_submitLogin);
  }

  void _submitLogin(LoginEvent event, Emitter<LoginState> emit) {
    if (this.usernameController.text.isNotEmpty && this.passwordController.text.isNotEmpty) {
      emit(LoginLoading());
      final UserLogin loginInfo = UserLogin(usernameController.text, passwordController.text);
      authenticationManager.add(AuthenticationManagerEventLogin(loginInfo));
    }
    passwordController.clear();
  }

  String? usernameValidator(String? value) => validateUsername(value, localizations);

  String? passwordValidator(String? value) => validatePassword(value, localizations);

  @override
  Future<void> close() {
    dispose();
    return super.close();
  }

  void dispose() {
    usernameController.dispose();
    passwordController.dispose();
  }
}
