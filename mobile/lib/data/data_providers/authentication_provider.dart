import 'package:Scrabble/constants/uri.dart';
import 'package:Scrabble/data/data_providers/data_provider.dart';
import 'package:Scrabble/data/models/interfaces/user/user_login.dart';
import 'package:Scrabble/data/models/interfaces/user/user_interface.dart';
import 'package:Scrabble/logic/identity/identity_cubit.dart';
import 'package:http/http.dart' as http;

class AuthenticationProvider extends DataProvider {
  AuthenticationProvider({required IdentityHolder identity, HttpProxy proxy = const HttpProxy()})
      : super(identity, proxy);

  Future<http.Response> login(UserLogin loginInfo) async => post('$AUTHENTICATION_URI/$LOGIN_URI', loginInfo);

  Future<http.Response> register(UserInterface loginInfo) async => post('$AUTHENTICATION_URI/$REGISTER_URI', loginInfo);
}
