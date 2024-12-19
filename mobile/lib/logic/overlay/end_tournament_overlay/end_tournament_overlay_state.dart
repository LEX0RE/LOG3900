part of 'end_tournament_overlay_cubit.dart';

@immutable
abstract class EndTournamentOverlayState with EquatableMixin {
  @override
  List<Object?> get props => [];
}

class EndTournamentOverlayInitial extends EndTournamentOverlayState {}

class EndTournamentOverlayShow extends EndTournamentOverlayState {}

class EndTournamentOverlayHidden extends EndTournamentOverlayState {}
