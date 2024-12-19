import 'dart:convert';

import 'package:Scrabble/constants/http_status.dart';
import 'package:Scrabble/data/data_providers/authentication_provider.dart';
import 'package:Scrabble/data/models/interfaces/user/user_login.dart';
import 'package:Scrabble/data/models/interfaces/user/user_interface.dart';

class AuthenticationRepository {
  final AuthenticationProvider authenticationProvider;

  AuthenticationRepository({required this.authenticationProvider});

  Future<UserInterface> login(UserLogin loginInfo) async {
    final response = await authenticationProvider.login(loginInfo);
    if (response.statusCode == HttpStatus.OK) {
      Map<String, dynamic> jsonBody = jsonDecode(response.body);
      return UserInterface.fromJson(jsonBody);
    }
    throw Exception(response.body.toString());
  }

  Future<UserInterface> register(UserInterface newUser) async {
    final response = await authenticationProvider.register(newUser);
    if (response.statusCode == HttpStatus.CREATED) {
      Map<String, dynamic> jsonBody = jsonDecode(response.body);
      return UserInterface.fromJson(jsonBody);
    }
    throw Exception(response.body.toString());
  }
}
