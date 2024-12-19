import 'package:Scrabble/data/models/interfaces/game_history/game_info_history.dart';
import 'package:Scrabble/data/models/interfaces/user/statistic/user_connection_info.dart';
import 'package:Scrabble/data/repositories/history_repository.dart';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

part 'game_history_state.dart';

class GameHistoryCubit extends Cubit<GameHistoryState> {
  final HistoryRepository historyRepository;
  GameHistoryCubit(this.historyRepository) : super(GameHistoryInitial()) {
    fetch();
  }

  void fetch() {
    historyRepository.getHistory().then((gameHistories) => historyRepository
        .getConnectionSummary()
        .then((connections) => emit(GameHistoryUpdated(gameHistories.gameHistories, connections.connections))));
  }

  void clearGameHistories() {
    emit(GameHistoryInitial());
  }
}
