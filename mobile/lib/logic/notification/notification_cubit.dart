import 'package:Scrabble/data/models/interfaces/chat/chat.dart';
import 'package:Scrabble/data/models/interfaces/chat/messages_from_chat.dart';
import 'package:Scrabble/data/models/interfaces/chat/server_message.dart';
import 'package:Scrabble/data/models/interfaces/identity.dart';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter/material.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:flutter_ringtone_player/flutter_ringtone_player.dart';

part 'notification_state.dart';

class NotificationCubit extends Cubit<NotificationState> {
  final FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin = FlutterLocalNotificationsPlugin();

  Map? get chatNotifications =>
      this.state is newNotificationState ? (this.state as newNotificationState).chatNotifications : null;

  int? get numberOfNewMessages =>
      this.state is newNotificationState ? (this.state as newNotificationState).numberOfNewMessages : null;

  bool? get messagesOpen =>
      this.state is newNotificationState ? (this.state as newNotificationState).messagesOpen : null;

  bool? get chatOpen => this.state is newNotificationState ? (this.state as newNotificationState).chatOpen : null;

  NotificationCubit() : super(NotificationInitial()) {
    this.emit(
        newNotificationState(chatNotifications: const {}, numberOfNewMessages: 0, messagesOpen: true, chatOpen: false));
  }

  void initializeNotification(List<Chat> chatJoined) {
    Map? notifications = Map.from(chatNotifications!);
    for (Chat chat in chatJoined) {
      if (!notifications.containsKey(chat.id)) notifications[chat.id] = 0;
    }
    this.emit(newNotificationState(
        chatNotifications: notifications,
        numberOfNewMessages: numberOfNewMessages!,
        messagesOpen: messagesOpen!,
        chatOpen: chatOpen!));
  }

  void updateNumberNotification() {
    int totalNumberNotifications = this.totalNumberNotifications(chatNotifications!);
    this.emit(newNotificationState(
        chatNotifications: chatNotifications!,
        numberOfNewMessages: totalNumberNotifications,
        messagesOpen: messagesOpen!,
        chatOpen: chatOpen!));
  }

  int totalNumberNotifications(Map chatNotification) {
    num total = chatNotification.values.fold(0, (previousValue, element) => previousValue + element);
    return total.toInt();
  }

  void removeChat(String chatId) {
    Map? notifications = Map.from(chatNotifications!);
    notifications.remove(chatId);
    int totalNumberNotifications = this.totalNumberNotifications(notifications);
    this.emit(newNotificationState(
        chatNotifications: notifications,
        numberOfNewMessages: totalNumberNotifications,
        messagesOpen: messagesOpen!,
        chatOpen: chatOpen!));
  }

  void addChat(String chatId) {
    Map? notifications = Map.from(chatNotifications!);
    notifications[chatId] = 0;
    int totalNumberNotifications = this.totalNumberNotifications(notifications);
    this.emit(newNotificationState(
        chatNotifications: notifications,
        numberOfNewMessages: totalNumberNotifications,
        messagesOpen: messagesOpen!,
        chatOpen: chatOpen!));
  }

  void playSound(MessagesFromChat messages, Identity? identity) {
    if (messages.messages.isNotEmpty) {
      ServerMessage newMessage = messages.messages.last;
      if (identity != null && identity.name != newMessage.user.name) {
        FlutterRingtonePlayer.playNotification();
      }
    }
  }

  void changeOpenMessage(bool state) {
    this.emit(newNotificationState(
        chatNotifications: chatNotifications!,
        numberOfNewMessages: numberOfNewMessages!,
        messagesOpen: state,
        chatOpen: chatOpen!));
  }

  void changeOpenChat(bool state) {
    this.emit(newNotificationState(
        chatNotifications: chatNotifications!,
        numberOfNewMessages: numberOfNewMessages!,
        messagesOpen: messagesOpen!,
        chatOpen: state));
  }

  void resetNotification(String chatId) {
    if (messagesOpen!) {
      chatNotifications?[chatId] = 0;
      this.updateNumberNotification();
    }
  }

  void showNotification(MessagesFromChat messages, Identity? identity) async {
    if (messages.messages.isNotEmpty) {
      ServerMessage newMessage = messages.messages.last;
      if (identity != null && identity.name != newMessage.user.name) {
        // Envoyer seulement la notification sur la tablette si l'app est dans le background
        if (WidgetsBinding.instance.lifecycleState != AppLifecycleState.resumed) {
          await flutterLocalNotificationsPlugin.show(
              12345,
              "${newMessage.user.name} sent you a message!",
              newMessage.content,
              const NotificationDetails(
                  android: AndroidNotificationDetails(
                'channelId',
                'channelName',
                'channelDescription',
                color: Color.fromARGB(255, 145, 83, 3),
                importance: Importance.high,
                priority: Priority.high,
                ticker: 'ticker',
                playSound: true,
                icon: 'icon',
              )),
              payload: 'data');
        } else {
          // aussi non, seulement jouer la musique
          FlutterRingtonePlayer.playNotification();
        }
      }

      chatNotifications?.update(messages.chatId, (value) => value + 1);
      int totalNumberNotifications = this.totalNumberNotifications(chatNotifications!);
      this.emit(newNotificationState(
          chatNotifications: chatNotifications!,
          numberOfNewMessages: totalNumberNotifications,
          messagesOpen: messagesOpen!,
          chatOpen: chatOpen!));
    }
  }
}
