import 'package:Scrabble/constants/uri.dart';
import 'package:Scrabble/data/data_providers/data_provider.dart';
import 'package:Scrabble/data/models/interfaces/user/user_update.dart';
import 'package:Scrabble/logic/identity/identity_cubit.dart';
import 'package:http/http.dart' as http;

class UserProvider extends DataProvider {
  UserProvider({required IdentityHolder identity, HttpProxy proxy = const HttpProxy()}) : super(identity, proxy);

  Future<http.Response> updateProfile(UserUpdate userUpdate) async => patch(USER_URI, userUpdate);

  Future<http.Response> getConnectionSummary() async => get(USER_CONNECTIONS_URI);
}
