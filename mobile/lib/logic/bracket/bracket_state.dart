part of 'bracket_cubit.dart';

@immutable
abstract class BracketState extends Equatable {
  final List<CommonBracket> brackets;

  const BracketState(this.brackets);

  @override
  List<Object> get props => [brackets];
}

class BracketInitial extends BracketState {
  const BracketInitial() : super(const []);
}

class BracketUpdated extends BracketState {
  const BracketUpdated(super.brackets);
}
