part of 'router_manager.dart';

@immutable
abstract class RouterManagerState with EquatableMixin {
  const RouterManagerState();

  @override
  List<Object> get props => [];
}

class RouterManagerInitial extends RouterManagerState {}
