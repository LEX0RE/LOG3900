part of 'join_response_cubit.dart';

@immutable
abstract class JoinResponseState with EquatableMixin {
  final List<User>? potentialPlayers;

  const JoinResponseState(this.potentialPlayers);

  @override
  List<Object?> get props => [];
}

class JoinResponseInitial extends JoinResponseState {
  JoinResponseInitial() : super([]);
}

class JoinResponseNewRequest extends JoinResponseState {
  const JoinResponseNewRequest(List<User> potentialPlayers) : super(potentialPlayers);
}

class JoinResponseHidden extends JoinResponseState {
  const JoinResponseHidden(List<User> potentialPlayers) : super(potentialPlayers);
}
