part of 'tournament_cubit.dart';

@immutable
abstract class TournamentState with EquatableMixin {
  @override
  List<Object?> get props => [];
}

class TournamentInitial extends TournamentState {}
