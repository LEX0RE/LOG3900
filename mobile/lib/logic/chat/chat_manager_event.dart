part of 'chat_manager_bloc.dart';

@immutable
abstract class ChatManagerEvent {}

class ChatManagerEventSendMessage extends ChatManagerEvent {
  final String message;

  ChatManagerEventSendMessage(this.message);
}

class ChatManagerEventJoinChat extends ChatManagerEvent {
  final String chatId;

  ChatManagerEventJoinChat(this.chatId);
}

class ChatManagerEventLeaveChat extends ChatManagerEvent {
  final String chatId;
  final bool isPlayer;
  ChatManagerEventLeaveChat(this.chatId, this.isPlayer);
}

class ChatManagerEventCreateChat extends ChatManagerEvent {
  final String chatName;
  ChatManagerEventCreateChat(this.chatName);
}
