import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:flutter/material.dart';

const int MAX_LENGTH_CHAT_INPUT = 500;
const int MAX_LENGTH_USERNAME = 15;
const int MIN_LENGTH_USERNAME = 3;
const int MAX_LENGTH_PASSWORD = 30;
const int MIN_LENGTH_PASSWORD = 5;
const int MAX_LENGTH_EMAIL = 50;
const int MAX_LENGTH_BLANK_LETTER = 1;
const int MAX_LENGTH_PASSWORD_LOBBY = 10;
const int MIN_LENGTH_PASSWORD_LOBBY = 2;

// Liste des caractères autorisés lettre et chiffre
// exemple: abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789
// ignore: non_constant_identifier_names
final RegExp USERNAME_REGEX = RegExp(r'^[a-zA-Z0-9éÉèÈàÀùÙêÊëË_-]+$');
// Liste des caractères autorisés lettre, chiffre et caractères spéciaux
// exemple: abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~`! @#$%^&*()_\-+={[}]:;<,>.?/
final RegExp PASSWORD_REGEX = RegExp(r'[A-Za-z0-9~`! @#$%^&*()_\-\+={[\]}|\\:;<,>.?/]');
// Liste des caractères autorisés pour les lettres blanches
// exemple: abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ
final RegExp BLANK_LETTER_REGEX = RegExp(r'[A-Za-z]');

// Liste des caractères autorisés lettre, chiffre  @ lettres et chiffres et . et lettre
// exemple: abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@.abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789
final RegExp EMAIL_VALIDATION_REGEX = RegExp(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._%+-]+\.[a-zA-Z]{2,4}$');

// ignore: non_constant_identifier_names
final TEXT_INPUT_DECORATION = (ThemeData theme) {
  BoxDecoration inputDecoration = BoxDecoration(
    border: Border.all(color: theme.extension<ColorExtension>()!.buttonBorderColor!),
    borderRadius: BorderRadius.circular(5),
    color: ColorExtension.inputBackgroundColor,
  );
  return inputDecoration;
};
