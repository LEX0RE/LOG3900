part of 'socket_manager_bloc.dart';

@immutable
abstract class SocketManagerState with EquatableMixin {
  @override
  List<Object> get props => [];
}

class SocketManagerInitial extends SocketManagerState {}

class SocketManagerError extends SocketManagerState {
  final Object error;

  @override
  List<Object> get props => [error];

  SocketManagerError(this.error);
}
