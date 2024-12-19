import 'dart:async';

import 'package:Scrabble/constants/route.dart';
import 'package:Scrabble/logic/authentication/authentication_manager/authentication_manager_bloc.dart';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter/material.dart';

part 'navigator_proxy.dart';
part 'router_manager_state.dart';

class RouterManager extends Cubit<RouterManagerState> {
  final BuildContext context;
  final AuthenticationManagerBloc authenticationManagerBloc;
  final NavigatorProxy navigatorProxy;
  late StreamSubscription authenticationManagerBlocSubscription;

  RouterManager(this.context, this.authenticationManagerBloc, {this.navigatorProxy = const NavigatorProxy()})
      : super(RouterManagerInitial()) {
    authenticationManagerBlocSubscription = authenticationManagerBloc.stream.listen(authenticationHandler);
  }

  void authenticationHandler(AuthenticationManagerState state) {
    if (state is! AuthenticationManagerStateLoggedOut) return;
    navigate(LOGIN_PATH, ROOT_PATH);
  }

  void navigate(String newChildPathName, String parentPathName) {
    this.navigatorProxy.pushNamedAndRemoveUntil(
          this.context,
          newChildPathName,
          ModalRoute.withName(parentPathName),
        );
  }

  @override
  Future<void> close() {
    authenticationManagerBlocSubscription.cancel();
    return super.close();
  }
}
