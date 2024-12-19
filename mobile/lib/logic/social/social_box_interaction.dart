import 'dart:ui';

import 'package:flutter_bloc/flutter_bloc.dart';

class SocialInteraction extends Cubit<SocialState> {
  SocialInteraction() : super(SocialState(isFriendsList: true, searchPlayer: "", position: Offset.zero));

  void switchToBlockList() =>
      emit(SocialState(isFriendsList: false, searchPlayer: state.searchPlayer, position: state.position));
  void switchToFriendsList() =>
      emit(SocialState(isFriendsList: true, searchPlayer: state.searchPlayer, position: state.position));
  void onChanged(String searchPlayer) =>
      emit(SocialState(isFriendsList: state.isFriendsList, searchPlayer: searchPlayer, position: state.position));
  void changePosition(Offset position) =>
      emit(SocialState(isFriendsList: state.isFriendsList, searchPlayer: state.searchPlayer, position: position));
}

class SocialState {
  bool isFriendsList;
  late String searchPlayer;
  late Offset position;
  SocialState({required this.isFriendsList, required this.searchPlayer, required this.position});
}
