@GenerateNiceMocks([
  MockSpec<ScrollController>(),
  MockSpec<FocusNode>(),
  MockSpec<TextEditingController>(),
  MockSpec<ScrollPosition>(),
  MockSpec<BuildContext>(),
  MockSpec<AuthenticationRepository>(),
  MockSpec<NavigatorProxy>(),
  MockSpec<HttpProxy>(),
  MockSpec<http.Response>(),
  MockSpec<Uri>(),
  MockSpec<ImagePicker>(),
  MockSpec<AssetBundle>(),
  MockSpec<NewGameRepository>(),
])
import 'package:Scrabble/data/data_providers/data_provider.dart';
import 'package:Scrabble/data/repositories/authentication_repository.dart';
import 'package:Scrabble/data/repositories/new_game_configuration_repository.dart';
import 'package:Scrabble/logic/router/router_manager.dart';
import 'package:flutter/widgets.dart';
import 'package:http/http.dart' as http;
import 'package:image_picker/image_picker.dart';
import 'package:mockito/annotations.dart';
