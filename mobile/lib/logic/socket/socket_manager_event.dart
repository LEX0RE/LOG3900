part of 'socket_manager_bloc.dart';

@immutable
abstract class SocketManagerEvent with EquatableMixin {
  @override
  List<Object?> get props => [];
}

class SocketManagerSend extends SocketManagerEvent {
  final String id;
  final dynamic payLoad;

  @override
  List<Object?> get props => [id, payLoad];

  SocketManagerSend(this.id, [this.payLoad = '']);
}

class SocketManagerAddHandler extends SocketManagerEvent {
  final String id;
  final Function(dynamic) handler;
  final dynamic Function(Map<String, dynamic>)? typeFactory;

  @override
  List<Object?> get props => [id, handler, typeFactory];

  SocketManagerAddHandler(this.id, this.handler, {this.typeFactory});
}
