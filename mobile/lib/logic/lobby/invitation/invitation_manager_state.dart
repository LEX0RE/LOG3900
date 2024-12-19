part of 'invitation_manager_bloc.dart';

@immutable
abstract class InvitationManagerState with EquatableMixin {
  const InvitationManagerState();

  @override
  List<Object> get props => [];
}

class InvitationManagerInitial extends InvitationManagerState {}

class InvitationManagerUpdateInvitation extends InvitationManagerState {
  final List<LobbySendInvitation> lobbySendInvitation;
  final bool notAvailable;

  @override
  List<Object> get props => [lobbySendInvitation, notAvailable];

  InvitationManagerUpdateInvitation(this.lobbySendInvitation, this.notAvailable);
}
