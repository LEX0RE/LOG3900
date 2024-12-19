import 'package:Scrabble/constants/communication.dart';
import 'package:Scrabble/data/models/interfaces/game_info/common_timer.dart';
import 'package:Scrabble/logic/socket/socket_manager_bloc.dart';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

part 'timer_state.dart';

class TimerCubit extends Cubit<TimerState> {
  CommonTimer? timer;
  final SocketManagerBloc socketManager;
  TimerCubit(this.socketManager) : super(TimerInitial()) {
    socketManager.add(SocketManagerAddHandler(TIMER, handleTimerUpdate, typeFactory: CommonTimer.fromJson));
  }

  void reset() {
    timer = null;
    emit(TimerInitial());
  }

  void handleTimerUpdate(dynamic timer) {
    if (timer is! CommonTimer) return;

    this.timer = timer;
    emit(TimerUpdated(timer));
  }
}
