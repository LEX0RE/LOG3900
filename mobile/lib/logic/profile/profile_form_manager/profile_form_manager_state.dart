part of 'profile_form_manager_cubit.dart';

@immutable
abstract class ProfileFormManagerState with EquatableMixin {
  @override
  List<Object> get props => [];

  const ProfileFormManagerState();
}

class ProfileFormManagerInitial extends ProfileFormManagerState {}

class ProfileFormManagerError extends ProfileFormManagerState {
  final String message;

  const ProfileFormManagerError(this.message);

  @override
  List<Object> get props => [message];
}
