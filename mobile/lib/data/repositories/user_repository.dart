import 'dart:convert';

import 'package:Scrabble/constants/http_status.dart';
import 'package:Scrabble/data/data_providers/user_provider.dart';
import 'package:Scrabble/data/models/interfaces/user/user_interface.dart';
import 'package:Scrabble/data/models/interfaces/user/user_update.dart';
import 'package:Scrabble/logic/identity/identity_cubit.dart';

class UserRepository {
  final UserProvider userProvider;
  final IdentityHolder identityHolder;

  UserRepository({required this.userProvider, required this.identityHolder});

  Future<UserInterface> updateProfile(UserUpdate userUpdate) async {
    final response = await userProvider.updateProfile(userUpdate);
    if (response.statusCode != HttpStatus.OK) throw Exception(response.body.toString());
    Map<String, dynamic> jsonBody = jsonDecode(response.body);
    jsonBody['token'] = identityHolder.userProfile.token;
    return UserInterface.fromJson(jsonBody);
  }
}
