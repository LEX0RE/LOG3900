part of 'easel_letter_holder_cubit.dart';

@immutable
abstract class EaselLetterHolderState with EquatableMixin {
  final List<PositionLetterIndex> letters;
  const EaselLetterHolderState(this.letters);

  @override
  List<Object> get props => [letters];
}

class EaselLetterHolderInitial extends EaselLetterHolderState {
  EaselLetterHolderInitial() : super([]);
}

class EaselLetterHolderUpdated extends EaselLetterHolderState {
  EaselLetterHolderUpdated(CommonEasel easel) : super(CommonEasel.toPositionLetterIndex(CommonEasel.copy(easel)));
}
