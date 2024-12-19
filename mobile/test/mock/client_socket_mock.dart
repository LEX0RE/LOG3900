@GenerateNiceMocks(
    [MockSpec<SocketIOProxy>(), MockSpec<FakeHandler>(), MockSpec<FakeHandler2>(), MockSpec<IO.Socket>()])
import 'dart:convert';

import 'package:Scrabble/data/models/interfaces/serializable.dart';
import 'package:Scrabble/logic/socket/socket_manager_bloc.dart';
import 'package:mockito/annotations.dart';
import 'package:mockito/mockito.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;

import 'client_socket_mock.mocks.dart';

class FakeHandler {
  FakeHandler();

  dynamic call(dynamic data) => null;
}

class FakeHandler2 {
  FakeHandler2();

  dynamic call() => null;
}

class MockClientSocket extends MockSocket {
  final MockSocketIOProxy proxy;
  late final Map<String, List<dynamic Function(dynamic)>> onMap;
  late final Map<String, List<dynamic>> emitMap;
  late final Map<String, List<dynamic>> serverEmitQueue;

  MockClientSocket(this.proxy) {
    onMap = {};
    emitMap = {};
    serverEmitQueue = {};

    when(proxy.io(any, any)).thenReturn(this);

    when(on(any, any)).thenAnswer((Invocation realInvocation) => _fakeOn(
        realInvocation.positionalArguments[0] as String,
        realInvocation.positionalArguments[1] as dynamic Function(dynamic)));
    when(emit(any, any)).thenAnswer((Invocation realInvocation) =>
        _fakeEmit(realInvocation.positionalArguments[0] as String, realInvocation.positionalArguments[1] as dynamic));

    when(connect()).thenAnswer((_) {
      when(active).thenReturn(true);
      return this;
    });

    when(close()).thenAnswer((_) {
      when(active).thenReturn(false);
      return this;
    });
  }

  void serverEmit<T extends Serializable>(String event, T? data) {
    dynamic payload = data != null ? json.decode(jsonEncode(data.toJson())) : null;
    if (!onMap.containsKey(event)) {
      if (!serverEmitQueue.containsKey(event)) serverEmitQueue[event] = [];
      serverEmitQueue[event]!.add(data);
      return;
    }
    onMap[event]!.forEach((dynamic Function(dynamic) handler) => handler(payload));
  }

  void _fakeOn(String? event, dynamic Function(dynamic)? handler) {
    if (event == null || handler == null) return;
    if (!onMap.containsKey(event)) onMap[event] = [];
    onMap[event]!.add(handler);
    if (serverEmitQueue.containsKey(event)) {
      serverEmitQueue[event]!.forEach((dynamic data) => serverEmit<Serializable>(event, data));
      serverEmitQueue[event]!.clear();
    }
  }

  void _fakeEmit(String? event, [dynamic data]) {
    if (event == null) return;
    data ??= <dynamic>[];
    if (emitMap[event] == null) emitMap[event] = [];
    emitMap[event]!.add(data);
  }
}
