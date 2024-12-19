part of 'identity_cubit.dart';

@immutable
abstract class IdentityState with EquatableMixin {
  @override
  List<Object> get props => [];

  const IdentityState();
}

class IdentityInitial extends IdentityState {}

class IdentityAvailable extends IdentityState {
  final Identity identity;
  final UserInterface userProfile;

  @override
  List<Object> get props => [identity, userProfile];

  const IdentityAvailable(this.identity, this.userProfile);
}

class IdentityNotAvailable extends IdentityState {}
