part of 'social_manager_bloc.dart';

@immutable
abstract class SocialManagerEvent {}

class SocialManagerEventSendRequest extends SocialManagerEvent {
  final String userId;

  SocialManagerEventSendRequest(this.userId);
}

class SocialManagerEventAcceptFriend extends SocialManagerEvent {
  final String userId;

  SocialManagerEventAcceptFriend(this.userId);
}

class SocialManagerEventRefuseFriend extends SocialManagerEvent {
  final String userId;

  SocialManagerEventRefuseFriend(this.userId);
}

class SocialManagerEventRemoveFriend extends SocialManagerEvent {
  final String userId;

  SocialManagerEventRemoveFriend(this.userId);
}

class SocialManagerEventAddUserToBlock extends SocialManagerEvent {
  final String userId;

  SocialManagerEventAddUserToBlock(this.userId);
}

class SocialManagerEventRemoveUserToBlock extends SocialManagerEvent {
  final String userId;

  SocialManagerEventRemoveUserToBlock(this.userId);
}
