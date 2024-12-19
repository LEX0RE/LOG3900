part of 'chat_manager_bloc.dart';

@immutable
abstract class ChatManagerState with EquatableMixin {
  const ChatManagerState();

  @override
  List<Object> get props => [];
}

class ChatManagerInitial extends ChatManagerState {}

class ChatManagerUpdateChat extends ChatManagerState {
  final List<Chat> chatJoined;
  final List<ChatName> otherChat;
  final Chat actualChat;

  @override
  List<Object> get props => [chatJoined, otherChat, actualChat];

  const ChatManagerUpdateChat(this.chatJoined, this.otherChat, this.actualChat);
}
