import 'package:Scrabble/constants/fake/fake_lobby_update.dart';
import 'package:Scrabble/data/models/interfaces/chat/all_chat.dart';
import 'package:Scrabble/data/models/interfaces/chat/chat.dart';
import 'package:Scrabble/data/models/interfaces/chat/chat_name.dart';
import 'package:Scrabble/data/models/interfaces/chat/messages_from_chat.dart';
import 'package:Scrabble/data/models/interfaces/chat/server_message.dart';
import 'package:Scrabble/data/models/interfaces/user/user.dart';

import 'unique_stamp.dart';

const String FAKE_CHAT_ID_1 = '1';
const String FAKE_CHAT_ID_2 = '2';
const String FAKE_CHAT_ID_3 = '3';
const String FAKE_CHAT_ID_4 = '4';

const String FAKE_CHAT_NAME_1 = 'Chat 1';
const String FAKE_CHAT_NAME_2 = 'Chat 2';
const String FAKE_CHAT_NAME_3 = 'Chat 3';
const String FAKE_CHAT_NAME_4 = 'Chat 4';

final String FAKE_USER_NAME_1 = "user";
final String FAKE_USER_ID_1 = "1234";

final String FAKE_PROFILE_PICTURE = "ABC";

final FAKE_CREATOR_1 = () {
  return User(FAKE_USER_NAME_1, FAKE_USER_ID_1);
};

final FAKE_CHAT_1 = () {
  return Chat(FAKE_CHAT_NAME_1, FAKE_LIST_MESSAGE_1(), FAKE_USER_1(), FAKE_CHAT_ID_1);
};

final FAKE_CHAT_2 = () {
  return Chat(FAKE_CHAT_NAME_2, FAKE_LIST_MESSAGE_2(), FAKE_USER_2(), FAKE_CHAT_ID_2);
};

final FAKE_CHAT_3 = () {
  return Chat(FAKE_CHAT_NAME_3, FAKE_LIST_MESSAGE_3(), FAKE_USER_3(), FAKE_CHAT_ID_3);
};

final FAKE_CHAT_LIST = () {
  return [FAKE_CHAT_1(), FAKE_CHAT_2(), FAKE_CHAT_3()];
};

final FAKE_DATE_1 = DateTime.now();
final String FAKE_MESSAGE_1 = 'Message 1${UNIQUE_STAMP()}';

final FAKE_SERVER_MESSAGE_1 = () {
  return ServerMessage(
    FAKE_DATE_1,
    FAKE_USER_1(),
    FAKE_PROFILE_PICTURE,
    FAKE_MESSAGE_1,
  );
};

final FAKE_DATE_2 = DateTime.now();
final String FAKE_MESSAGE_2 = 'Message 2${UNIQUE_STAMP()}';

final FAKE_SERVER_MESSAGE_2 = () {
  return ServerMessage(
    FAKE_DATE_2,
    FAKE_USER_1(),
    FAKE_MESSAGE_2,
    FAKE_PROFILE_PICTURE,
  );
};

final FAKE_CHAT_N_1 = () {
  return ChatName(FAKE_CHAT_ID_1, FAKE_CHAT_NAME_1, FAKE_CREATOR_1());
};

final FAKE_CHAT_N_2 = () {
  return ChatName(FAKE_CHAT_ID_2, FAKE_CHAT_NAME_2, FAKE_CREATOR_1());
};

final FAKE_CHAT_N_3 = () {
  return ChatName(FAKE_CHAT_ID_3, FAKE_CHAT_NAME_3, FAKE_CREATOR_1());
};
final FAKE_CHAT_N_4 = () {
  return ChatName(FAKE_CHAT_ID_4, FAKE_CHAT_NAME_4, FAKE_CREATOR_1());
};

final FAKE_CHAT_N_LIST = () {
  return [FAKE_CHAT_N_1(), FAKE_CHAT_N_2(), FAKE_CHAT_N_3()];
};

final FAKE_ALL_CHAT = () {
  return AllChat(FAKE_CHAT_LIST(), FAKE_CHAT_N_LIST());
};

final FAKE_DATE_3 = DateTime.now();
final String FAKE_MESSAGE_3 = 'Message 3${UNIQUE_STAMP()}';

final FAKE_SERVER_MESSAGE_3 = () {
  return ServerMessage(
    FAKE_DATE_3,
    FAKE_USER_2(),
    FAKE_MESSAGE_3,
    FAKE_PROFILE_PICTURE,
  );
};

final FAKE_MESSAGES_FROM_CHAT_1 = () {
  return MessagesFromChat(
    FAKE_CHAT_ID_1,
    FAKE_LIST_MESSAGE_1(),
  );
};

final FAKE_LIST_MESSAGE_1 = () {
  return [
    FAKE_SERVER_MESSAGE_1(),
    FAKE_SERVER_MESSAGE_2(),
    FAKE_SERVER_MESSAGE_3(),
  ];
};

final FAKE_LIST_MESSAGE_2 = () {
  return [
    FAKE_SERVER_MESSAGE_3(),
    FAKE_SERVER_MESSAGE_1(),
    FAKE_SERVER_MESSAGE_2(),
  ];
};

final FAKE_LIST_MESSAGE_3 = () {
  return [
    FAKE_SERVER_MESSAGE_3(),
    FAKE_SERVER_MESSAGE_2(),
    FAKE_SERVER_MESSAGE_1(),
  ];
};
