part of 'social_manager_bloc.dart';

@immutable
abstract class SocialManagerState with EquatableMixin {
  const SocialManagerState();

  @override
  List<Object> get props => [];
}

class SocialManagerInitial extends SocialManagerState {}

class SocialManagerUpdateSocial extends SocialManagerState {
  final List<UserProfile> friends;
  final List<UserProfile> newFriends;
  final List<UserProfile> userBlock;
  final List<UserProfile> users;

  @override
  List<Object> get props => [friends, newFriends, userBlock, users];

  SocialManagerUpdateSocial(this.friends, this.newFriends, this.userBlock, this.users);
}

class SocialManagerScreen extends SocialManagerState {
  final bool friendRequestScreen;

  @override
  List<Object> get props => [friendRequestScreen];

  SocialManagerScreen(this.friendRequestScreen);
}
