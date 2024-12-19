import 'dart:async';

import 'package:Scrabble/constants/communication.dart';
import 'package:Scrabble/data/models/interfaces/lobby/lobby_decision_to_join.dart';
import 'package:Scrabble/data/models/interfaces/lobby/lobby_friend_invitation.dart';
import 'package:Scrabble/data/models/interfaces/lobby/lobby_send_invitation.dart';
import 'package:Scrabble/data/models/interfaces/lobby/lobby_send_invitation_list.dart';
import 'package:Scrabble/logic/identity/identity_cubit.dart';
import 'package:Scrabble/logic/socket/socket_manager_bloc.dart';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter/widgets.dart';

part 'invitation_manager_event.dart';
part 'invitation_manager_state.dart';

class InvitationManagerBloc extends Bloc<InvitationManagerEvent, InvitationManagerState> {
  final SocketManagerBloc socketManager;
  final IdentityHolder identityHolder;
  late final StreamSubscription identitySubscription;
  late List<LobbySendInvitation> lobbySendInvitation;
  late bool notAvailable = false;

  InvitationManagerBloc(
    this.socketManager,
    this.identityHolder,
  ) : super(InvitationManagerInitial()) {
    this.lobbySendInvitation = [];
    this.identitySubscription = this.identityHolder.stream.listen(this.handleIdentity);

    on<InvitationManagerInviteFriendEvent>(this._inviteFriend);
    on<InvitationManagerInvitationDecisionEvent>(this._invitationDecision);
  }

  void handleIdentity(IdentityState state) async {
    if (!(state is IdentityAvailable)) return;
    this.socketManager
      ..add(SocketManagerAddHandler(NOT_AVAILABLE, this._updateUserNotAvailable))
      ..add(SocketManagerAddHandler(SEND_INVITATION, this._updateLobbySendInvitation,
          typeFactory: LobbySendInvitationList.fromJson));
  }

  _inviteFriend(InvitationManagerInviteFriendEvent event, emit) {
    LobbyFriendInvitation friendToInvite = LobbyFriendInvitation(event.lobbyId, event.friendId);
    this.socketManager.add(SocketManagerSend(INVITE_FRIEND, friendToInvite));
  }

  _invitationDecision(InvitationManagerInvitationDecisionEvent event, emit) {
    LobbyDecisionToJoin lobbyDecisionToJoin = LobbyDecisionToJoin(event.lobbyId, event.decision);
    this.socketManager.add(SocketManagerSend(DECISION_TO_JOIN, lobbyDecisionToJoin));
  }

  _updateLobbySendInvitation(dynamic newLobbyInvitation) {
    if (newLobbyInvitation is! LobbySendInvitationList) return;
    lobbySendInvitation = newLobbyInvitation.lobbySendInvitation;
    this.emit(InvitationManagerUpdateInvitation(lobbySendInvitation, notAvailable));
  }

  _updateUserNotAvailable(dynamic s) {
    notAvailable = true;
    this.emit(InvitationManagerUpdateInvitation(lobbySendInvitation, notAvailable));
  }

  @override
  Future<void> close() {
    this.identitySubscription.cancel();
    return super.close();
  }
}
