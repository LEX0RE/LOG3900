part of 'invitation_manager_bloc.dart';

@immutable
abstract class InvitationManagerEvent {}

class InvitationManagerInviteFriendEvent extends InvitationManagerEvent {
  final String friendId;
  final String lobbyId;

  InvitationManagerInviteFriendEvent(this.friendId, this.lobbyId);
}

class InvitationManagerInvitationDecisionEvent extends InvitationManagerEvent {
  final bool decision;
  final String lobbyId;

  InvitationManagerInvitationDecisionEvent(this.decision, this.lobbyId);
}
