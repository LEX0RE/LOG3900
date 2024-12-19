import 'dart:async';

import 'package:Scrabble/constants/communication.dart';
import 'package:Scrabble/constants/form.dart';
import 'package:Scrabble/constants/game_user.dart';
import 'package:Scrabble/data/models/interfaces/chat/all_chat.dart';
import 'package:Scrabble/data/models/interfaces/chat/chat.dart';
import 'package:Scrabble/data/models/interfaces/chat/chat_name.dart';
import 'package:Scrabble/data/models/interfaces/chat/client_push_message.dart';
import 'package:Scrabble/data/models/interfaces/chat/messages_from_chat.dart';
import 'package:Scrabble/logic/identity/identity_cubit.dart';
import 'package:Scrabble/logic/notification/notification_cubit.dart';
import 'package:Scrabble/logic/socket/socket_manager_bloc.dart';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

part 'chat_manager_event.dart';
part 'chat_manager_state.dart';

class ChatManagerBloc extends Bloc<ChatManagerEvent, ChatManagerState> {
  final TextEditingController controller;
  final SocketManagerBloc socketManager;
  late final ScrollController scrollController;
  final IdentityHolder identityHolder;
  late final StreamSubscription identitySubscription;
  late FocusNode focusNode;
  late final List<TextInputFormatter>? formatters;
  late List<Chat> chatJoined;
  late List<ChatName> otherChat;
  late Chat? actualChat;
  late bool changeChatState;
  final NotificationCubit notificationCubit;

  ChatManagerBloc(this.controller, this.socketManager, this.identityHolder, this.scrollController, this.focusNode,
      this.notificationCubit)
      : super(ChatManagerInitial()) {
    this.identitySubscription = this.identityHolder.stream.listen(this.handleIdentity);
    this.formatters = [
      LengthLimitingTextInputFormatter(MAX_LENGTH_CHAT_INPUT),
    ];
    this.changeChatState = false;
    this.actualChat = null;
    on<ChatManagerEventSendMessage>(this._sendMessage);
    on<ChatManagerEventJoinChat>(this._joinChat);
    on<ChatManagerEventLeaveChat>(this._leaveOrDeleteChat);
    on<ChatManagerEventCreateChat>(this._sendNewChat);
  }

  void handleIdentity(IdentityState state) async {
    if (state is! IdentityAvailable) return;
    this.socketManager
      ..add(SocketManagerAddHandler(MESSAGE, this._receiveMessages, typeFactory: MessagesFromChat.fromJson))
      ..add(SocketManagerSend(NEED_CHAT, ''))
      ..add(SocketManagerAddHandler(NEED_CHAT, this._receiveAllChat, typeFactory: AllChat.fromJson))
      ..add(SocketManagerAddHandler(JOIN_CHAT, this._chatJoined, typeFactory: Chat.fromJson))
      ..add(SocketManagerAddHandler(DELETE_CHAT, this._deleteChat, typeFactory: ChatName.fromJson))
      ..add(SocketManagerAddHandler(LEAVE_CHAT, this._leaveChat, typeFactory: ChatName.fromJson))
      ..add(SocketManagerAddHandler(CREATE_CHAT, this._receiveCreateChat, typeFactory: ChatName.fromJson));
  }

  void _sendMessage(ChatManagerEventSendMessage event, emit) {
    String messageString = event.message.trim();
    if (messageString.isNotEmpty) {
      ClientPushMessage message = ClientPushMessage(messageString, DateTime.now(), actualChat!.id);
      socketManager.add(SocketManagerSend(MESSAGE, message));

      controller.clear();
      this.focusNode.requestFocus();
    }
  }

  void _receiveAllChat(dynamic allChat) {
    if (allChat is! AllChat) return;
    this.chatJoined = allChat.chatJoined;
    this.otherChat = allChat.otherChat;
    this.actualChat = allChat.chatJoined[0];
    this.emit(ChatManagerUpdateChat(this.chatJoined, this.otherChat, this.actualChat!));
    this.notificationCubit.initializeNotification(allChat.chatJoined);
  }

  void _sendNewChat(ChatManagerEventCreateChat event, emit) {
    String messageString = event.chatName.trim();
    if (messageString.isNotEmpty) {
      ClientPushMessage message = ClientPushMessage(event.chatName.trim(), DateTime.now(), '');
      socketManager.add(SocketManagerSend(CREATE_CHAT, message));
    }
  }

  void _receiveMessages(dynamic messages) {
    if (messages is! MessagesFromChat) return;
    int chatIndex = this.chatJoined.indexWhere((chat) => chat.id == messages.chatId);
    if (chatIndex != -1) {
      Chat newChat = Chat(this.chatJoined[chatIndex].name, messages.messages, this.chatJoined[chatIndex].creator,
          this.chatJoined[chatIndex].id);
      this.chatJoined[chatIndex] = newChat;
      if (messages.chatId == this.actualChat!.id) this.actualChat = newChat;
      if (messages.chatId != this.actualChat!.id || !this.notificationCubit.messagesOpen!)
        this.notificationCubit.showNotification(messages, identityHolder.identity);
      else if (!this.notificationCubit.chatOpen!)
        this.notificationCubit.showNotification(messages, identityHolder.identity);
      else
        this.notificationCubit.playSound(messages, identityHolder.identity);
      this.scrollController.animateTo(
            this.scrollController.position.maxScrollExtent,
            duration: const Duration(milliseconds: 200),
            curve: Curves.elasticInOut,
          );
      this.emit(ChatManagerUpdateChat(this.chatJoined, this.otherChat, this.actualChat!));
    }
  }

  _joinChat(ChatManagerEventJoinChat event, emit) {
    ClientPushMessage chatId = ClientPushMessage('', DateTime.now(), event.chatId);

    this.socketManager.add(SocketManagerSend(JOIN_CHAT, chatId));
  }

  _leaveOrDeleteChat(ChatManagerEventLeaveChat event, emit) {
    ClientPushMessage chatId = ClientPushMessage('', DateTime.now(), event.chatId);
    String communication = event.isPlayer ? DELETE_CHAT : LEAVE_CHAT;

    this.socketManager.add(SocketManagerSend(communication, chatId));
  }

  _chatJoined(dynamic newChat) {
    if (newChat is! Chat) return;
    if (this.chatJoined.indexWhere((chat) => chat.id == newChat.id) == -1) this.chatJoined.add(newChat);

    this.otherChat = this.otherChat.where((chat) => chat.id != newChat.id).toList();
    this.emit(ChatManagerUpdateChat(this.chatJoined, this.otherChat, this.actualChat!));
    this.notificationCubit.addChat(newChat.id);
  }

  _leaveChat(dynamic otherChat) {
    if (otherChat is! ChatName) return;

    if (this.otherChat.indexWhere((chat) => chat.id == otherChat.id) == -1 &&
        GAME_USER.id != otherChat.creator.id &&
        GAME_USER.name != otherChat.creator.name) this.otherChat.add(otherChat);
    this.chatJoined = this.chatJoined.where((chat) => chat.id != otherChat.id).toList();
    if (otherChat.id == this.actualChat!.id) this.changeChatState = true;
    this.emit(ChatManagerUpdateChat(this.chatJoined, this.otherChat, this.actualChat!));
    this.notificationCubit.removeChat(otherChat.id);
  }

  _deleteChat(dynamic deleteChat) {
    if (deleteChat is! ChatName) return;

    this.chatJoined = this.chatJoined.where((chat) => chat.id != deleteChat.id).toList();
    this.otherChat = this.otherChat.where((chat) => chat.id != deleteChat.id).toList();
    if (deleteChat.id == this.actualChat!.id) this.changeChatState = true;
    this.emit(ChatManagerUpdateChat(this.chatJoined, this.otherChat, this.actualChat!));
    this.notificationCubit.removeChat(deleteChat.id);
  }

  _receiveCreateChat(dynamic newChat) {
    if (newChat is! ChatName) return;
    if (this.otherChat.indexWhere((chat) => chat.id == newChat.id) == -1) this.otherChat.add(newChat);
    this.emit(ChatManagerUpdateChat(this.chatJoined, this.otherChat, this.actualChat!));
  }

  setActualChat(Chat actualChat) {
    this.actualChat = this.chatJoined.firstWhere((chat) => chat.id == actualChat.id);
    this.emit(ChatManagerUpdateChat(this.chatJoined, this.otherChat, this.actualChat!));
  }

  @override
  Future<void> close() {
    this.identitySubscription.cancel();
    return super.close();
  }
}
