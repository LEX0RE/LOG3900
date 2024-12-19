part of 'notification_cubit.dart';

@immutable
abstract class NotificationState with EquatableMixin {
  const NotificationState();

  @override
  List<Object?> get props => [];
}

class NotificationInitial extends NotificationState {}

class newNotificationState extends NotificationState {
  Map chatNotifications;
  int numberOfNewMessages;
  bool messagesOpen;
  bool chatOpen;

  @override
  List<Object> get props => [chatNotifications, numberOfNewMessages, messagesOpen, chatOpen];

  newNotificationState(
      {required this.chatNotifications,
      required this.numberOfNewMessages,
      required this.messagesOpen,
      required this.chatOpen});
}
