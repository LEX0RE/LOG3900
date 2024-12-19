part of 'placement_cubit.dart';

@immutable
abstract class PlacementState with EquatableMixin {
  final Placement placement;
  final List<PositionLetterIndex> letters;
  const PlacementState(this.placement, this.letters);

  @override
  List<Object> get props => [placement, letters];
}

class PlacementInitial extends PlacementState {
  PlacementInitial() : super(Placement([], OrientationType.None, EMPTY_COORDINATE), []);
}

class PlacementUpdated extends PlacementState {
  PlacementUpdated(Placement placement) : super(placement, List.from(PositionLetter.toGrid(placement.letters)));
}
