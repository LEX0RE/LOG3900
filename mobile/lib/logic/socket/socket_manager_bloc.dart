import 'dart:async';

import 'package:Scrabble/constants/communication.dart';
import 'package:Scrabble/data/models/interfaces/identity.dart';
import 'package:Scrabble/environments/environment.dart' as dev_env;
import 'package:Scrabble/environments/environment.prod.dart' as prod_env;
import 'package:Scrabble/logic/authentication/authentication_manager/authentication_manager_bloc.dart';
import 'package:Scrabble/logic/identity/identity_cubit.dart';
import 'package:Scrabble/logic/utils/dynamic_checking.dart';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter/foundation.dart';
import 'package:socket_io_client/socket_io_client.dart' as io_lib;

part 'socket_manager_event.dart';
part 'socket_manager_state.dart';
part 'socket_proxy.dart';

class SocketManagerBloc extends Bloc<SocketManagerEvent, SocketManagerState> {
  final AuthenticationManagerBloc authenticationManager;
  final IdentityHolder identityHolder;
  late final StreamSubscription identitySubscription;
  late io_lib.Socket socket;
  final SocketIOProxy proxy;
  final Map<String, List<dynamic Function(dynamic)>> handlers = {};
  final env = (kReleaseMode) ? prod_env.Environnement.SOCKET_URL : dev_env.Environnement.SOCKET_URL;

  SocketManagerBloc(
      {required this.identityHolder, required this.authenticationManager, this.proxy = const SocketIOProxy()})
      : super(SocketManagerInitial()) {
    identitySubscription = identityHolder.stream.listen(handleIdentity);
    socket = proxy.io(env, <String, dynamic>{
      "transports": ['websocket'],
      "upgrade": false,
      "forceNew": true
    });
    socket.close();
    on<SocketManagerSend>(_onSocketManagerSend);
    on<SocketManagerAddHandler>(_onSocketManagerAddHandler);
  }

  void handleIdentity(IdentityState state) {
    if (state is IdentityNotAvailable) {
      socket.close();
      return;
    }
    if (state is! IdentityAvailable) return;
    connect(state.identity);
    add(SocketManagerAddHandler(CONNECT_ERROR, (_) => authenticationManager.add(AuthenticationManagerEventLogout())));
    add(SocketManagerAddHandler(DISCONNECT, (_) => authenticationManager.add(AuthenticationManagerEventLogout())));
  }

  @override
  Future<void> close() {
    socket.close();
    identitySubscription.cancel();
    return super.close();
  }

  void connect(Identity identity) {
    socket = proxy.io(env, <String, dynamic>{
      "transports": ['websocket'],
      "upgrade": false,
      "forceNew": true,
      "auth": {"key": identity.token}
    });
    handlers.forEach((eventId, handlers) {
      handlers.forEach((handler) {
        socket.on(eventId, handler);
      });
    });
    socket.connect();
  }

  void removeHandlersForEvent(String id) {
    if (this.handlers.containsKey(id)) {
      this.handlers[id]!.forEach((handler) {
        this.socket.off(id, handler);
      });
      this.handlers.remove(id);
    }
  }

  void _onSocketManagerSend(SocketManagerSend event, Emitter<SocketManagerState> emit) {
    try {
      send(event.id, event.payLoad);
    } catch (e) {
      debugPrint(e.toString());
    }
  }

  void _onSocketManagerAddHandler(SocketManagerAddHandler event, Emitter<SocketManagerState> emit) {
    try {
      handler(data) {
        try {
          if (isNullEmptyOrFalse(data) || event.id == DISCONNECT || event.id == CONNECT_ERROR) {
            event.handler(data);
            return;
          }
          event.handler(event.typeFactory!(data));
        } catch (e) {
          debugPrint(e.toString());
        }
      }

      if (!handlers.containsKey(event.id)) handlers[event.id] = [];
      handlers[event.id]!.add(handler);
      if (socket.active) socket.on(event.id, handler);
      // ignore: empty_catches
    } catch (e) {}
  }

  void send(String id, dynamic payLoad) {
    if (isNullEmptyOrFalse(payLoad)) {
      socket.emit(id);
    } else {
      socket.emit(id, payLoad);
    }
  }
}
