part of 'observer_cubit.dart';

@immutable
abstract class ObserverState with EquatableMixin {
  final LobbyInfo lobby;
  const ObserverState(this.lobby);

  @override
  List<Object> get props => [lobby];
}

class ObserverInitial extends ObserverState {
  ObserverInitial() : super(EMPTY_LOBBY_CLASSIC);
}

class ObserverRedirectToObserve extends ObserverState {
  const ObserverRedirectToObserve(super.lobby);
}
