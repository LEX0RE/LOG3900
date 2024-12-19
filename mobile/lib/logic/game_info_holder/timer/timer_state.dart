part of 'timer_cubit.dart';

@immutable
abstract class TimerState with EquatableMixin {
  @override
  List<Object?> get props => [];

  const TimerState();
}

class TimerInitial extends TimerState {}

class TimerUpdated extends TimerState {
  final CommonTimer timer;

  @override
  List<Object?> get props => [timer];

  const TimerUpdated(this.timer);
}
