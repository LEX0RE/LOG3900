import 'dart:convert';
import 'dart:io';

import 'package:Scrabble/constants/avatars.dart';
import 'package:Scrabble/data/models/enums/image_source_type.dart';
import 'package:Scrabble/data/models/enums/language.dart';
import 'package:Scrabble/data/models/enums/theme.dart';
import 'package:Scrabble/data/models/interfaces/user/user_interface.dart';
import 'package:Scrabble/logic/authentication/authentication_manager/authentication_manager_bloc.dart';
import 'package:Scrabble/logic/user_validator/user_validator.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:image_picker/image_picker.dart';

part 'register_state.dart';

class RegisterBloc extends Cubit<RegisterState> {
  final AppLocalizations localizations;
  final AuthenticationManagerBloc authenticationManager;

  final TextEditingController usernameController;
  final TextEditingController passwordController;
  final TextEditingController emailController;

  final ImagePicker imagePicker;
  late Uint8List image;
  late int predefinedImageIndex;
  late ImageSourceType type;
  late AssetBundle assets;

  RegisterBloc({
    required this.localizations,
    required this.usernameController,
    required this.passwordController,
    required this.emailController,
    required this.authenticationManager,
    required this.imagePicker,
    AssetBundle? assets,
  }) : super(RegisterInitial()) {
    this.assets = assets ?? rootBundle;
    predefinedImageIndex = 0;
    type = ImageSourceType.predefined;

    nextPredefined();
  }

  void nextPredefined() {
    predefinedImageIndex = (predefinedImageIndex + 1) % AVATARS.length;
    assets.load(AVATARS[predefinedImageIndex]).then((ByteData value) {
      setImage(value.buffer.asUint8List(), ImageSourceType.predefined);
    });
  }

  void previousPredefined() {
    predefinedImageIndex = (predefinedImageIndex - 1) % AVATARS.length;
    assets.load(AVATARS[predefinedImageIndex]).then((ByteData value) {
      setImage(value.buffer.asUint8List(), ImageSourceType.predefined);
    });
  }

  void getProfilePictureFromCamera() {
    imagePicker
        .pickImage(source: ImageSource.camera, imageQuality: 50, preferredCameraDevice: CameraDevice.front)
        .then((XFile? value) {
      if (value == null) return;
      File imageFile = File(value.path);
      Uint8List bytes = imageFile.readAsBytesSync();
      setImage(bytes, type);
    });
  }

  void setImage(Uint8List image, ImageSourceType type) {
    this.image = image;
    this.type = type;
    emit(RegisterStateProfilePictureChanged(image: this.image));
  }

  void submit() {
    if (usernameController.text.isNotEmpty && passwordController.text.isNotEmpty && emailController.text.isNotEmpty) {
      emit(RegisterLoading());

      UserInterface newUser = UserInterface(
          usernameController.text,
          passwordController.text,
          emailController.text,
          'data:image/png;base64,${base64Encode(image)}',
          ThemeEnum(AppTheme.Default).toString(),
          LanguageEnum(LanguageType.French).toString(),
          "",
          "", [], [], []);

      authenticationManager.add(AuthenticationManagerEventRegister(newUser));
    }
    passwordController.clear();
    emailController.clear();
  }

  String? usernameValidator(String? value) => validateUsername(value, localizations);

  String? passwordValidator(String? value) => validatePassword(value, localizations);

  String? emailValidator(String? value) => validateEmail(value, localizations);

  @override
  Future<void> close() {
    dispose();
    return super.close();
  }

  void dispose() {
    usernameController.dispose();
    passwordController.dispose();
    emailController.dispose();
  }
}
