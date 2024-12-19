part of 'statistic_cubit.dart';

@immutable
abstract class StatisticState with EquatableMixin {
  final List<UserGameStatistic> gameStatistics;
  final List<UserTournamentStatistic> tournamentStatistics;

  StatisticState(this.gameStatistics, this.tournamentStatistics);

  @override
  List<Object> get props => [gameStatistics, tournamentStatistics];
}

class StatisticInitial extends StatisticState {
  StatisticInitial() : super([], []);
}

class StatisticUpdated extends StatisticState {
  StatisticUpdated(List<UserGameStatistic> gameStatistics, List<UserTournamentStatistic> tournamentStatistics)
      : super(List.from(gameStatistics), List.from(tournamentStatistics));
}
