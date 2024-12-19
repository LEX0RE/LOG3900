import 'dart:convert';
import 'dart:io';
import 'dart:typed_data';

import 'package:Scrabble/data/models/enums/language.dart';
import 'package:Scrabble/data/models/enums/theme.dart';
import 'package:Scrabble/data/models/interfaces/user/user_interface.dart';
import 'package:Scrabble/data/models/interfaces/user/user_update.dart';
import 'package:Scrabble/data/repositories/user_repository.dart';
import 'package:Scrabble/logic/identity/identity_cubit.dart';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:image_picker/image_picker.dart';
import 'package:meta/meta.dart';

part 'profile_form_manager_state.dart';

class ProfileFormManagerCubit extends Cubit<ProfileFormManagerState> {
  final IdentityHolder identityHolder;
  final UserRepository userRepository;
  late final ImagePicker imagePicker;

  ProfileFormManagerCubit(this.identityHolder, this.userRepository, {ImagePicker? imagePicker})
      : super(ProfileFormManagerInitial()) {
    this.imagePicker = imagePicker ?? ImagePicker();
  }

  void updateName(String newName) {
    if (newName == identityHolder.userProfile.userName) return;
    _updateProfile(UserUpdate(userName: newName));
  }

  void updateEmail(String newEmail) {
    if (newEmail == identityHolder.userProfile.email) return;
    _updateProfile(UserUpdate(email: newEmail));
  }

  void updatePassword(String newPassword) {
    _updateProfile(UserUpdate(password: newPassword));
  }

  void updateTheme(AppTheme newTheme) {
    final theme = ThemeEnum(newTheme).toString();
    if (theme == identityHolder.userProfile.theme) return;
    _updateProfile(UserUpdate(theme: theme));
  }

  void updateLanguage(LanguageType newLanguage) {
    final language = LanguageEnum(newLanguage).toString();
    if (language == identityHolder.userProfile.language) return;
    _updateProfile(UserUpdate(language: language));
  }

  void getProfilePictureFromCamera() {
    imagePicker
        .pickImage(source: ImageSource.camera, imageQuality: 50, preferredCameraDevice: CameraDevice.front)
        .then((XFile? value) {
      if (value == null) return;
      File imageFile = File(value.path);
      Uint8List bytes = imageFile.readAsBytesSync();
      final imageString = 'data:image/png;base64,${base64Encode(bytes)}';
      if (imageString == identityHolder.userProfile.profilePicture) return;
      _updateProfile(UserUpdate(profilePicture: imageString));
    });
  }

  void reset() {
    emit(ProfileFormManagerInitial());
  }

  void _updateProfile(UserUpdate userUpdate) {
    userRepository
        .updateProfile(userUpdate)
        .then((UserInterface updatedProfile) => identityHolder.setIdentity(updatedProfile))
        .catchError((error) => emit(ProfileFormManagerError(error.toString())));
  }
}
