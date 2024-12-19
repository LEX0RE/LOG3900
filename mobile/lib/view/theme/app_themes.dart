import 'package:Scrabble/data/models/enums/theme.dart';
import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:flutter/material.dart';

final Map<AppTheme, ThemeData> appThemeData = {
  AppTheme.Default: ThemeData(
    primaryColor: const Color.fromRGBO(186, 143, 77, 1),
    textTheme: const TextTheme(
      displayLarge: TextStyle(fontSize: 72.0, fontWeight: FontWeight.bold),
      titleLarge: TextStyle(fontSize: 36.0, color: Colors.white),
      bodyMedium: TextStyle(fontSize: 14.0, fontFamily: 'Hind'),
      bodySmall: TextStyle(fontSize: 12.0, fontFamily: 'Hind', color: Colors.white),
      bodyLarge: TextStyle(fontSize: 30, fontFamily: 'Hind', color: Colors.black),
      titleMedium: TextStyle(fontSize: 18.0, fontFamily: 'Hind', color: Colors.white),
      titleSmall: TextStyle(fontSize: 16.0, fontFamily: 'Helevtica Neue', color: Colors.white),
      headlineSmall: TextStyle(
          fontSize: 18.0,
          fontFamily: 'Helvetica Neue',
          color: Color.fromRGBO(107, 54, 4, 1),
          fontWeight: FontWeight.bold),
      headlineMedium:
          TextStyle(fontSize: 16.0, fontFamily: 'Helvetica Neue', color: Colors.red, fontWeight: FontWeight.bold),
      headlineLarge: TextStyle(
          color: Color.fromRGBO(107, 54, 4, 1),
          fontSize: 30.0,
          fontFamily: 'Helvetica Neue',
          fontWeight: FontWeight.bold),
      labelMedium: TextStyle(fontSize: 25.0, fontFamily: 'Hind', color: Colors.white),
    ),
    colorScheme: ColorScheme.fromSwatch(
      primarySwatch: const MaterialColor(1, {
        50: Color.fromRGBO(231, 188, 122, 1),
        100: Color.fromRGBO(226, 183, 117, 1),
        200: Color.fromRGBO(216, 173, 107, 1),
        300: Color.fromRGBO(206, 163, 97, 1),
        400: Color.fromRGBO(196, 153, 87, 1),
        500: Color.fromRGBO(186, 143, 77, 1),
        600: Color.fromRGBO(176, 133, 67, 1),
        700: Color.fromRGBO(166, 123, 57, 1),
        800: Color.fromRGBO(156, 113, 47, 1),
        900: Color.fromRGBO(146, 103, 37, 1),
      }),
      backgroundColor: const Color.fromRGBO(227, 218, 197, 1),
      cardColor: const Color.fromRGBO(186, 143, 77, 1),
    ),
    disabledColor: const Color.fromRGBO(137, 112, 71, 1),
    buttonTheme: const ButtonThemeData(
      buttonColor: Color.fromRGBO(186, 143, 77, 1),
      textTheme: ButtonTextTheme.normal,
    ),
    inputDecorationTheme: const InputDecorationTheme(
      contentPadding: EdgeInsets.only(),
      border: OutlineInputBorder(),
      labelStyle: TextStyle(color: Colors.black),
      hintStyle: TextStyle(color: Color.fromRGBO(168, 168, 168, 1)),
    ),
    iconTheme: const IconThemeData(color: Colors.black),
    appBarTheme: const AppBarTheme(
      color: Color.fromRGBO(186, 143, 77, 1),
    ),
    scaffoldBackgroundColor: const Color.fromRGBO(227, 218, 197, 1),
    extensions: const <ThemeExtension<dynamic>>[
      ColorExtension.defaultExtension,
    ],
  ),
  AppTheme.Dark: ThemeData(
    primaryColor: const Color.fromRGBO(104, 104, 104, 1),
    textTheme: const TextTheme(
      displayLarge: TextStyle(fontSize: 72.0, fontWeight: FontWeight.bold),
      titleLarge: TextStyle(fontSize: 36.0, color: Color.fromRGBO(221, 221, 221, 1)),
      bodyLarge: TextStyle(fontSize: 30, fontFamily: 'Hind', color: Colors.white),
      bodyMedium: TextStyle(fontSize: 14.0, fontFamily: 'Hind'),
      bodySmall: TextStyle(fontSize: 12.0, fontFamily: 'Hind', color: Colors.white),
      titleMedium: TextStyle(fontSize: 18.0, fontFamily: 'Hind', color: Colors.white),
      titleSmall: TextStyle(fontSize: 16.0, fontFamily: 'Helevtica Neue', color: Colors.white),
      headlineSmall: TextStyle(
        fontSize: 18.0,
        fontFamily: 'Helvetica Neue',
        color: Color.fromRGBO(221, 221, 221, 1),
        fontWeight: FontWeight.bold,
      ),
      headlineMedium: TextStyle(
          fontSize: 16.0,
          fontFamily: 'Helvetica Neue',
          color: Color.fromRGBO(223, 5, 5, 1),
          fontWeight: FontWeight.bold),
      headlineLarge: TextStyle(
          color: Color.fromRGBO(221, 221, 221, 1),
          fontSize: 30.0,
          fontFamily: 'Helvetica Neue',
          fontWeight: FontWeight.bold),
      labelMedium: TextStyle(fontSize: 25.0, fontFamily: 'Hind', color: Colors.white),
    ),
    colorScheme: ColorScheme.fromSwatch(
      primarySwatch: const MaterialColor(1, {
        50: Color.fromRGBO(100, 100, 100, 1),
        100: Color.fromRGBO(92, 92, 92, 1),
        200: Color.fromRGBO(84, 84, 84, 1),
        300: Color.fromRGBO(76, 76, 76, 1),
        400: Color.fromRGBO(68, 68, 68, 1),
        500: Color.fromRGBO(60, 60, 60, 1),
        600: Color.fromRGBO(52, 52, 52, 1),
        700: Color.fromRGBO(44, 44, 44, 1),
        800: Color.fromRGBO(36, 36, 36, 1),
        900: Color.fromRGBO(32, 32, 32, 1),
      }),
      backgroundColor: const Color.fromRGBO(50, 51, 51, 1),
      cardColor: const Color.fromRGBO(104, 104, 104, 1),
    ),
    disabledColor: const Color.fromRGBO(80, 80, 80, 1),
    buttonTheme: const ButtonThemeData(
      buttonColor: Color.fromRGBO(104, 104, 104, 1),
      textTheme: ButtonTextTheme.normal,
    ),
    inputDecorationTheme: const InputDecorationTheme(
      contentPadding: EdgeInsets.only(),
      border: OutlineInputBorder(),
      labelStyle: TextStyle(color: Color.fromRGBO(147, 147, 147, 1)),
      hintStyle: TextStyle(color: Color.fromRGBO(168, 168, 168, 1)),
    ),
    iconTheme: const IconThemeData(color: Colors.white),
    appBarTheme: const AppBarTheme(
      color: Color.fromRGBO(68, 68, 68, 1),
    ),
    scaffoldBackgroundColor: const Color.fromRGBO(50, 51, 51, 1),
    extensions: const <ThemeExtension<dynamic>>[
      ColorExtension.darkExtension,
    ],
  ),
  AppTheme.UnderTheSea: ThemeData(
    primaryColor: const Color.fromRGBO(143, 174, 169, 1),
    textTheme: const TextTheme(
      displayLarge: TextStyle(fontSize: 72.0, fontWeight: FontWeight.bold),
      titleLarge: TextStyle(
        fontSize: 36.0,
        color: Color.fromRGBO(76, 113, 106, 1),
      ),
      bodyLarge: TextStyle(fontSize: 30, fontFamily: 'Hind', color: Colors.black),
      bodyMedium: TextStyle(fontSize: 14.0, fontFamily: 'Hind'),
      bodySmall: TextStyle(fontSize: 12.0, fontFamily: 'Hind', color: Colors.black),
      titleMedium: TextStyle(fontSize: 18.0, fontFamily: 'Hind', color: Colors.black),
      titleSmall: TextStyle(fontSize: 16.0, fontFamily: 'Helevtica Neue', color: Colors.black),
      headlineSmall: TextStyle(
        fontSize: 18.0,
        fontFamily: 'Helvetica Neue',
        color: Color.fromRGBO(84, 112, 120, 1),
        fontWeight: FontWeight.bold,
      ),
      headlineMedium: TextStyle(
          fontSize: 16.0,
          fontFamily: 'Helvetica Neue',
          color: Color.fromRGBO(223, 5, 5, 1),
          fontWeight: FontWeight.bold),
      headlineLarge: TextStyle(
          color: Color.fromRGBO(84, 112, 120, 1),
          fontSize: 30.0,
          fontFamily: 'Helvetica Neue',
          fontWeight: FontWeight.bold),
      labelMedium: TextStyle(fontSize: 25.0, fontFamily: 'Hind', color: Colors.black),
    ),
    colorScheme: ColorScheme.fromSwatch(
      primarySwatch: const MaterialColor(1, {
        50: Color.fromRGBO(188, 219, 204, 1),
        100: Color.fromRGBO(183, 214, 209, 1),
        200: Color.fromRGBO(173, 204, 199, 1),
        300: Color.fromRGBO(163, 194, 189, 1),
        400: Color.fromRGBO(153, 184, 179, 1),
        500: Color.fromRGBO(143, 174, 169, 1),
        600: Color.fromRGBO(133, 164, 159, 1),
        700: Color.fromRGBO(123, 154, 149, 1),
        800: Color.fromRGBO(113, 144, 139, 1),
        900: Color.fromRGBO(103, 134, 129, 1),
      }),
      backgroundColor: const Color.fromRGBO(221, 237, 234, 1),
      cardColor: const Color.fromRGBO(143, 174, 169, 1),
    ),
    disabledColor: const Color.fromRGBO(116, 136, 133, 1),
    buttonTheme: const ButtonThemeData(
      buttonColor: Color.fromRGBO(143, 174, 169, 1),
      textTheme: ButtonTextTheme.normal,
    ),
    inputDecorationTheme: const InputDecorationTheme(
      contentPadding: EdgeInsets.only(),
      border: OutlineInputBorder(),
      labelStyle: TextStyle(color: Color.fromRGBO(147, 147, 147, 1)),
      hintStyle: TextStyle(color: Color.fromRGBO(168, 168, 168, 1)),
    ),
    iconTheme: const IconThemeData(color: Colors.white),
    appBarTheme: const AppBarTheme(
      color: Color.fromRGBO(91, 133, 125, 1),
    ),
    scaffoldBackgroundColor: const Color.fromRGBO(221, 237, 234, 1),
    extensions: const <ThemeExtension<dynamic>>[
      ColorExtension.underTheSeaExtension,
    ],
  )
};
