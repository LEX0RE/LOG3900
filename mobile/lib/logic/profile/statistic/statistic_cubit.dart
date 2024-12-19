import 'package:Scrabble/data/models/interfaces/user/statistic/user_game_statistic.dart';
import 'package:Scrabble/data/models/interfaces/user/statistic/user_tournament_statistic.dart';
import 'package:Scrabble/data/repositories/statistic_repository.dart';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter/material.dart';

part 'statistic_state.dart';

class StatisticCubit extends Cubit<StatisticState> {
  final StatisticRepository statisticRepository;
  StatisticCubit(this.statisticRepository) : super(StatisticInitial()) {
    fetch();
  }

  void fetch() {
    statisticRepository
        .getGameStatistics()
        .then((gameStatistics) => statisticRepository
            .getTournamentStatistics()
            .then((tournamentStatistics) => emit(StatisticUpdated([gameStatistics], [tournamentStatistics]))))
        .catchError((error) => debugPrint(error.toString()));
  }

  void reset() {
    emit(StatisticInitial());
  }
}
