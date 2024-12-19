import 'package:flutter_bloc/flutter_bloc.dart';

class ChatBoxInteraction extends Cubit<CloseChatState> {
  ChatBoxInteraction()
      : super(CloseChatState(
          isClosed: true,
          chatState: ChatState.message,
          searchChat: '',
          needNewChat: false,
        ));

  void closeChat() => emit(CloseChatState(
        isClosed: true,
        chatState: state.chatState,
        searchChat: state.searchChat,
        needNewChat: state.needNewChat,
      ));

  void openChat() => emit(CloseChatState(
        isClosed: false,
        chatState: state.chatState,
        searchChat: state.searchChat,
        needNewChat: state.needNewChat,
      ));

  void setChatState(ChatState chatState) => emit(CloseChatState(
        isClosed: state.isClosed,
        chatState: chatState,
        searchChat: state.searchChat,
        needNewChat: state.needNewChat,
      ));

  void setSearchChat(String searchGroup) => {
        emit(CloseChatState(
          isClosed: state.isClosed,
          chatState: state.chatState,
          searchChat: state.chatState != ChatState.message ? searchGroup : '',
          needNewChat: state.needNewChat,
        ))
      };

  void setNeedNewChat(bool newChat) => emit(CloseChatState(
        isClosed: state.isClosed,
        chatState: state.chatState,
        searchChat: state.searchChat,
        needNewChat: newChat,
      ));

  bool isMessageSection() => state.chatState == ChatState.message;
}

class CloseChatState {
  bool isClosed;
  ChatState chatState;
  String? searchChat;
  bool needNewChat;

  CloseChatState({
    required this.isClosed,
    required this.chatState,
    required this.searchChat,
    required this.needNewChat,
  });
}

enum ChatState { message, groupJoined, searchGroup }

bool containName(String name, String? searchChat) =>
    name.length >= searchChat!.length && searchChat.toLowerCase() == name.substring(0, searchChat.length).toLowerCase();
