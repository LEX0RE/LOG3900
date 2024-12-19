import 'package:Scrabble/logic/bracket/bracket_cubit.dart';
import 'package:Scrabble/logic/end_tournament/end_tournament_cubit.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

part 'tournament_state.dart';

class TournamentCubit extends Cubit<TournamentState> {
  TournamentCubit() : super(TournamentInitial());

  void reset(BuildContext context) {
    try {
      context.read<EndTournamentCubit>().reset(dynamic);
      context.read<BracketCubit>().clearBracket();
    } catch (e) {
      debugPrint('Fail to reset Tournament widget');
    }
  }
}
