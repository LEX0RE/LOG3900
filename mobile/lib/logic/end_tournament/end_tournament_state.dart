part of 'end_tournament_cubit.dart';

@immutable
abstract class EndTournamentState with EquatableMixin {
  final CommonEndTournament? endTournament;
  final bool canEndTournament;

  const EndTournamentState(this.endTournament, this.canEndTournament);

  @override
  List<Object?> get props => [endTournament, canEndTournament];
}

class EndTournamentInitial extends EndTournamentState {
  const EndTournamentInitial() : super(null, false);
}

class EndTournamentUpdated extends EndTournamentState {
  const EndTournamentUpdated(super.endTournament, super.canEndTournament);
}
