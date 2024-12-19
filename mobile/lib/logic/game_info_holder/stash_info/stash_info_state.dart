part of 'stash_info_cubit.dart';

@immutable
abstract class StashInfoState with EquatableMixin {
  @override
  List<Object?> get props => [];

  const StashInfoState();
}

class StashInfoInitial extends StashInfoState {}

class StashInfoUpdated extends StashInfoState {
  final CommonStash stash;

  const StashInfoUpdated(this.stash);

  @override
  List<Object?> get props => [stash];
}
