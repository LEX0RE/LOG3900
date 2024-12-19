import 'dart:async';

import 'package:Scrabble/constants/communication.dart';
import 'package:Scrabble/data/models/interfaces/social.dart';
import 'package:Scrabble/data/models/interfaces/user/user_profile.dart';
import 'package:Scrabble/logic/identity/identity_cubit.dart';
import 'package:Scrabble/logic/socket/socket_manager_bloc.dart';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter/widgets.dart';

part 'social_manager_event.dart';
part 'social_manager_state.dart';

class SocialManagerBloc extends Bloc<SocialManagerEvent, SocialManagerState> {
  final SocketManagerBloc socketManager;
  final IdentityHolder identityHolder;
  late final StreamSubscription identitySubscription;
  late FocusNode focusNode;
  late List<UserProfile> friends;
  late List<UserProfile> newFriends;
  late List<UserProfile> userBlock;
  late List<UserProfile> users;
  late bool friendRequestScreen;

  SocialManagerBloc(
    this.socketManager,
    this.identityHolder,
    this.focusNode,
  ) : super(SocialManagerInitial()) {
    this.identitySubscription = this.identityHolder.stream.listen(this.handleIdentity);
    this.friendRequestScreen = false;
    this.newFriends = [];
    this.friends = [];
    this.userBlock = [];
    on<SocialManagerEventSendRequest>(this._sendRequest);
    on<SocialManagerEventAcceptFriend>(this._acceptFriend);
    on<SocialManagerEventRefuseFriend>(this._refuseFriend);
    on<SocialManagerEventRemoveFriend>(this._removeFriend);
    on<SocialManagerEventAddUserToBlock>(this._addUserToBlock);
    on<SocialManagerEventRemoveUserToBlock>(this._removeUserToBlock);
  }

  void handleIdentity(IdentityState state) async {
    if (!(state is IdentityAvailable)) return;
    this.socketManager
      ..add(SocketManagerAddHandler(GET_SOCIAL, this._receiveSocial, typeFactory: Social.fromJson))
      ..add(SocketManagerSend(GET_SOCIAL, ''))
      ..add(SocketManagerAddHandler(UPDATE_FRIENDS, this._receiveUpdateFriends, typeFactory: Social.fromJson))
      ..add(SocketManagerAddHandler(UPDATE_FRIENDS_REQUEST, this._receiveUpdateFriendsRequest,
          typeFactory: Social.fromJson))
      ..add(SocketManagerAddHandler(UPDATE_USER_BLOCK, this._receiveUpdateUserBlock, typeFactory: Social.fromJson));
  }

  void _sendRequest(SocialManagerEventSendRequest event, emit) {
    socketManager.add(SocketManagerSend(SEND_REQUEST, event.userId));
  }

  void _acceptFriend(SocialManagerEventAcceptFriend event, emit) {
    socketManager.add(SocketManagerSend(ACCEPT_FRIEND, event.userId));
  }

  void _refuseFriend(SocialManagerEventRefuseFriend event, Emitter<SocialManagerState> emit) {
    socketManager.add(SocketManagerSend(REFUSE_FRIEND, event.userId));
  }

  void _removeFriend(SocialManagerEventRemoveFriend event, Emitter<SocialManagerState> emit) {
    socketManager.add(SocketManagerSend(REMOVE_FRIEND, event.userId));
  }

  void _addUserToBlock(SocialManagerEventAddUserToBlock event, Emitter<SocialManagerState> emit) {
    socketManager.add(SocketManagerSend(ADD_USER_TO_BLOCK, event.userId));
  }

  void _removeUserToBlock(SocialManagerEventRemoveUserToBlock event, Emitter<SocialManagerState> emit) {
    socketManager.add(SocketManagerSend(REMOVE_USER_FROM_BLOCK, event.userId));
  }

  void _receiveSocial(dynamic social) {
    if (social is! Social) return;
    this.users = social.allUser;
    this.friends = social.friends;
    this.newFriends = social.friendsRequest;
    this.userBlock = social.usersBlock;

    this.emit(SocialManagerUpdateSocial(this.friends, this.newFriends, this.userBlock, this.users));
  }

  void _receiveUpdateFriends(dynamic social) {
    if (social is! Social) return;
    this.users = social.allUser;
    this.friends = social.friends;

    this.emit(SocialManagerUpdateSocial(this.friends, this.newFriends, this.userBlock, this.users));
  }

  void _receiveUpdateFriendsRequest(dynamic social) {
    if (social is! Social) return;
    this.users = social.allUser;
    this.newFriends = social.friendsRequest;

    this.emit(SocialManagerUpdateSocial(this.friends, this.newFriends, this.userBlock, this.users));
  }

  void _receiveUpdateUserBlock(dynamic social) {
    if (social is! Social) return;
    this.users = social.allUser;
    this.newFriends = social.friendsRequest;
    this.userBlock = social.usersBlock;

    this.emit(SocialManagerUpdateSocial(this.friends, this.newFriends, this.userBlock, this.users));
  }

  @override
  Future<void> close() {
    this.identitySubscription.cancel();
    return super.close();
  }
}
