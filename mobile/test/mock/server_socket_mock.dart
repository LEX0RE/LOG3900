import 'dart:convert';

import 'package:Scrabble/logic/socket/socket_manager_bloc.dart';
import 'package:Scrabble/logic/utils/dynamic_checking.dart';
import 'package:mockito/mockito.dart';

import 'bloc_mocks.mocks.dart';

class MockServerSocket {
  MockSocketManagerBloc socketManager;
  late final Map<String, List<SocketManagerAddHandler>> handlers;
  late final List<SocketManagerSend> sentMessages;
  late final List<SocketManagerSend> emitQueue;

  MockServerSocket(this.socketManager) {
    handlers = {};
    sentMessages = [];
    emitQueue = [];
    when(socketManager.add(any))
        .thenAnswer((Invocation realInvocation) => _handleSocketManagerEvent(realInvocation.positionalArguments[0]));
  }

  void emit(String eventId, Map<String, dynamic>? data) {
    if (!handlers.containsKey(eventId)) {
      emitQueue.add(SocketManagerSend(eventId, data));
      return;
    }
    handlers[eventId]!.forEach((addEvent) {
      if (!isNullEmptyOrFalse(data)) {
        addEvent.handler(addEvent.typeFactory!(jsonDecode(jsonEncode(data))));
      } else {
        addEvent.handler(data);
      }
    });
  }

  bool hasReceived(String eventId, dynamic data) =>
      sentMessages.any((element) => element.id == eventId && element.payLoad == data);

  bool hasReceivedAny(String eventId) => sentMessages.any((element) => element.id == eventId);

  void _handleSocketManagerEvent(SocketManagerEvent event) {
    if (event is SocketManagerSend) sentMessages.add(event);

    if (event is! SocketManagerAddHandler) return;

    if (!handlers.containsKey(event.id)) handlers[event.id] = [];
    handlers[event.id]!.add(event);

    if (emitQueue.isNotEmpty) {
      emitQueue.forEach((element) {
        if (element.id == event.id) {
          emit(element.id, element.payLoad);
          emitQueue.remove(element);
        }
      });
    }
  }
}
