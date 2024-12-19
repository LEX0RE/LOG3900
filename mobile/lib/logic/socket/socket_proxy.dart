part of 'socket_manager_bloc.dart';

class SocketIOProxy {
  const SocketIOProxy();

  io_lib.Socket io(String url, Map<String, dynamic> options) => io_lib.io(url, options);
}
