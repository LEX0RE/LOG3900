import 'dart:async';

import 'package:Scrabble/constants/login.dart';
import 'package:Scrabble/data/models/interfaces/user/user_interface.dart';
import 'package:Scrabble/data/models/interfaces/user/user_login.dart';
import 'package:Scrabble/data/repositories/authentication_repository.dart';
import 'package:Scrabble/logic/identity/identity_cubit.dart';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

part 'authentication_manager_event.dart';
part 'authentication_manager_state.dart';

class AuthenticationManagerBloc extends Bloc<AuthenticationManagerEvent, AuthenticationManagerState> {
  final AuthenticationRepository authenticationRepository;
  final IdentityHolder identityHolder;
  late final StreamSubscription identitySubscription;

  AuthenticationManagerBloc({required this.authenticationRepository, required this.identityHolder})
      : super(AuthenticationManagerInitial()) {
    identitySubscription = identityHolder.stream.listen((state) => add(AuthenticationManagerEventIdentity(state)));

    on<AuthenticationManagerEventLogin>(_onAuthenticationManagerEventLogin);

    on<AuthenticationManagerEventRegister>(_onAuthenticationManagerEventRegister);

    on<AuthenticationManagerEventLogout>(_onAuthenticationManagerEventLogout);

    on<AuthenticationManagerEventIdentity>(_onIdentityState);
  }

  void _onIdentityState(AuthenticationManagerEventIdentity event, Emitter<AuthenticationManagerState> emit) {
    if (event.state is IdentityAvailable) emit(AuthenticationManagerStateLoggedIn());
    if (event.state is IdentityNotAvailable) emit(AuthenticationManagerStateLoggedOut());
  }

  void _onAuthenticationManagerEventLogin(
      AuthenticationManagerEventLogin event, Emitter<AuthenticationManagerState> emit) async {
    emit(const AuthenticationManagerStateLogFailed(LOADING));
    await authenticationRepository
        .login(event.userLogin)
        .then((UserInterface user) => identityHolder.setIdentity(user))
        .catchError((error) {
      emit(AuthenticationManagerStateLogFailed(error.toString()));
    });
  }

  void _onAuthenticationManagerEventLogout(
      AuthenticationManagerEventLogout event, Emitter<AuthenticationManagerState> emit) async {
    identityHolder.clearIdentity();
    emit(AuthenticationManagerStateLoggedOut());
  }

  void _onAuthenticationManagerEventRegister(
      AuthenticationManagerEventRegister event, Emitter<AuthenticationManagerState> emit) async {
    await authenticationRepository
        .register(event.newUser)
        .then((UserInterface user) => identityHolder.setIdentity(user))
        .catchError((error) {
      emit(AuthenticationManagerStateRegisterFailed(error.toString()));
    });
  }

  @override
  Future<void> close() {
    identitySubscription.cancel();
    return super.close();
  }
}
