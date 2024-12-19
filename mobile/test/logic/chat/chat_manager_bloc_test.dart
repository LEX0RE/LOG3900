import 'dart:async';

import 'package:Scrabble/constants/communication.dart';
import 'package:Scrabble/logic/chat/chat_manager_bloc.dart';
import 'package:bloc_test/bloc_test.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/mockito.dart';

import '../../constants/fake_chat.dart';
import '../../constants/fake_identity.dart';
import '../../mock/bloc_mocks.mocks.dart';
import '../../mock/class_mocks.mocks.dart';
import '../../mock/server_socket_mock.dart';

void main() {
  group('ChatManagerBloc', () {
    late MockSocketManagerBloc socketManager;
    late MockIdentityHolder identityHolder;
    late MockTextEditingController controller;
    late MockScrollController scrollController;
    late MockFocusNode focusNode;
    late MockServerSocket serverSocket;
    late MockNotificationCubit notificationCubit;
    late ChatManagerBloc bloc;

    setUp(() {
      identityHolder = MockIdentityHolder();
      socketManager = MockSocketManagerBloc();
      controller = MockTextEditingController();
      scrollController = MockScrollController();
      when(scrollController.position).thenReturn(MockScrollPosition());
      focusNode = MockFocusNode();
      serverSocket = MockServerSocket(socketManager);
      notificationCubit = MockNotificationCubit();

      when(identityHolder.stream).thenAnswer((_) => Stream.fromIterable([FAKE_IDENTITY_STATE()]));

      bloc = ChatManagerBloc(controller, socketManager, identityHolder, scrollController, focusNode, notificationCubit);
      bloc.actualChat = FAKE_CHAT_1();
      bloc.chatJoined = [FAKE_CHAT_2(), FAKE_CHAT_3()];
      bloc.otherChat = [FAKE_CHAT_N_1()];
    });

    tearDown(() => bloc.close());

    test('initial state is ChatManagerInitial', () {
      expect(bloc.state, ChatManagerInitial());
    });

    blocTest(
      'should send MESSAGE when on event ChatManagerEventSendMessage',
      build: () => bloc,
      act: (ChatManagerBloc bloc) {
        bloc.add(ChatManagerEventSendMessage(FAKE_SERVER_MESSAGE_1().content));
      },
      expect: () {
        expect(serverSocket.hasReceivedAny(MESSAGE), true);
        return [];
      },
    );

    blocTest(
      'should not send MESSAGE when on event ChatManagerEventSendMessage if message is empty',
      build: () => bloc,
      act: (ChatManagerBloc bloc) {
        bloc.add(ChatManagerEventSendMessage(''));
      },
      expect: () {
        expect(serverSocket.hasReceivedAny(MESSAGE), false);
        return [];
      },
    );

    blocTest(
      'should send the chat who user want to join with ChatManagerEventJoinChat ',
      build: () => bloc,
      act: (ChatManagerBloc bloc) {
        bloc.add(ChatManagerEventJoinChat(FAKE_CHAT_ID_1));
      },
      expect: () {
        expect(serverSocket.hasReceivedAny(JOIN_CHAT), true);
        return [];
      },
    );

    blocTest(
      'should send LEAVE_CHAT if creator is not the user',
      build: () => bloc,
      act: (ChatManagerBloc bloc) {
        bloc.add(ChatManagerEventLeaveChat(FAKE_CHAT_ID_1, false));
      },
      expect: () {
        expect(serverSocket.hasReceivedAny(LEAVE_CHAT), true);
        return [];
      },
    );

    blocTest(
      'should send DELETE_CHAT if creator is the user',
      build: () => bloc,
      act: (ChatManagerBloc bloc) {
        bloc.add(ChatManagerEventLeaveChat(FAKE_CHAT_ID_1, true));
      },
      expect: () {
        expect(serverSocket.hasReceivedAny(DELETE_CHAT), true);
        return [];
      },
    );
    blocTest(
      'should send CREATE_CHAT with ChatManagerEventCreateChat',
      build: () => bloc,
      act: (ChatManagerBloc bloc) {
        bloc.add(ChatManagerEventCreateChat(FAKE_CHAT_NAME_1));
      },
      expect: () {
        expect(serverSocket.hasReceivedAny(CREATE_CHAT), true);
        return [];
      },
    );
    blocTest(
      'should not send CREATE_CHAT with ChatManagerEventCreateChat if chatName is empty',
      build: () => bloc,
      act: (ChatManagerBloc bloc) {
        bloc.add(ChatManagerEventCreateChat(''));
      },
      expect: () {
        expect(serverSocket.hasReceivedAny(CREATE_CHAT), false);
        return [];
      },
    );

    blocTest(
      'should update all chat when receive NEED_CHAT',
      build: () => bloc,
      act: (ChatManagerBloc bloc) {
        serverSocket.emit(NEED_CHAT, FAKE_ALL_CHAT().toJson());
      },
      expect: () {
        expect(bloc.chatJoined, FAKE_ALL_CHAT().chatJoined);
        expect(bloc.otherChat, FAKE_ALL_CHAT().otherChat);
        expect(bloc.actualChat, FAKE_ALL_CHAT().chatJoined[0]);

        return [
          ChatManagerUpdateChat(FAKE_ALL_CHAT().chatJoined, FAKE_ALL_CHAT().otherChat, FAKE_ALL_CHAT().chatJoined[0])
        ];
      },
    );
    blocTest(
      'should add new CHAT when receive JOIN_CHAT',
      build: () => bloc,
      act: (ChatManagerBloc bloc) {
        serverSocket.emit(JOIN_CHAT, FAKE_CHAT_1().toJson());
      },
      expect: () {
        expect(bloc.chatJoined, [FAKE_CHAT_2(), FAKE_CHAT_3(), FAKE_CHAT_1()]);
        expect(bloc.otherChat, []);
        return [
          ChatManagerUpdateChat([FAKE_CHAT_2(), FAKE_CHAT_3(), FAKE_CHAT_1()], bloc.otherChat, bloc.actualChat!)
        ];
      },
    );

    blocTest(
      'should add new CHAT when receive LEAVE_CHAT',
      build: () => bloc,
      act: (ChatManagerBloc bloc) {
        serverSocket.emit(LEAVE_CHAT, FAKE_CHAT_N_2().toJson());
      },
      expect: () {
        expect(bloc.chatJoined, [FAKE_CHAT_3()]);
        expect(bloc.otherChat, [FAKE_CHAT_N_1(), FAKE_CHAT_N_2()]);
        return [
          ChatManagerUpdateChat([FAKE_CHAT_3()], [FAKE_CHAT_N_1(), FAKE_CHAT_N_2()], bloc.actualChat!)
        ];
      },
    );
    blocTest(
      'should delete  CHAT when receive DELETE_CHAT',
      build: () => bloc,
      act: (ChatManagerBloc bloc) {
        serverSocket.emit(DELETE_CHAT, FAKE_CHAT_N_1().toJson());
      },
      expect: () {
        expect(bloc.chatJoined, [FAKE_CHAT_2(), FAKE_CHAT_3()]);
        expect(bloc.otherChat, []);
        return [
          ChatManagerUpdateChat([FAKE_CHAT_2(), FAKE_CHAT_3()], bloc.otherChat, bloc.actualChat!)
        ];
      },
    );

    blocTest(
      'should delete  CHAT when receive DELETE_CHAT',
      build: () => bloc,
      act: (ChatManagerBloc bloc) {
        serverSocket.emit(DELETE_CHAT, FAKE_CHAT_N_1().toJson());
      },
      expect: () {
        expect(bloc.chatJoined, [FAKE_CHAT_2(), FAKE_CHAT_3()]);
        expect(bloc.otherChat, []);
        return [
          ChatManagerUpdateChat([FAKE_CHAT_2(), FAKE_CHAT_3()], bloc.otherChat, bloc.actualChat!)
        ];
      },
    );

    blocTest(
      'should add new Chat in other Chat when receive CREATE_CHAT',
      build: () => bloc,
      act: (ChatManagerBloc bloc) {
        serverSocket.emit(CREATE_CHAT, FAKE_CHAT_N_4().toJson());
      },
      expect: () {
        expect(bloc.chatJoined, [FAKE_CHAT_2(), FAKE_CHAT_3()]);
        expect(bloc.otherChat, [FAKE_CHAT_N_1(), FAKE_CHAT_N_4()]);
        return [ChatManagerUpdateChat(bloc.chatJoined, bloc.otherChat, bloc.actualChat!)];
      },
    );
  });
}
