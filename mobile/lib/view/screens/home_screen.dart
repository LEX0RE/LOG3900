import 'package:Scrabble/constants/route.dart';
import 'package:Scrabble/data/models/classes/letters/common_letter.dart';
import 'package:Scrabble/logic/router/router_manager.dart';
import 'package:Scrabble/view/constants/HUD_interface.dart';
import 'package:Scrabble/view/widget/board_game/letter_tile_feedback.dart';
import 'package:Scrabble/view/widget/game_mode_choice.dart';
import 'package:Scrabble/view/widget/scrabble_widget/button.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final localization = AppLocalizations.of(context);
    return HUDInterface(
      SizedBox(
        width: double.infinity,
        height: double.infinity,
        child: Stack(
          children: <Widget>[
            Center(
              child: Column(
                children: [
                  const GameModeChoice(),
                  const SizedBox(height: 20),
                  ScrabbleButtonWidget(
                      width: 300,
                      height: 80,
                      text: localization.myProfile,
                      onPressed: () => context.read<RouterManager>().navigate(PROFILE_PATH, ROOT_PATH))
                ],
              ),
            ),
            ...leftLetters(context),
            ...rightLetters(context),
          ],
        ),
      ),
      context,
    );
  }

  List<Widget> leftLetters(BuildContext context) {
    return [
      backgroundLetter(context,
          letter: 'K',
          points: 10,
          rotationDeg: -40,
          top: 120 - 30,
          left: 220,
          right: null,
          height: 150,
          width: 150,
          fontSizeLetter: 90,
          fontSizePoints: 30),
      backgroundLetter(context,
          letter: 'E',
          points: 1,
          rotationDeg: -35,
          top: 320 - 30,
          left: 360,
          right: null,
          height: 120,
          width: 120,
          fontSizeLetter: 85,
          fontSizePoints: 30),
      backgroundLetter(context,
          letter: 'A',
          points: 1,
          rotationDeg: -40,
          top: 360 - 30,
          left: 120,
          right: null,
          height: 150,
          width: 150,
          fontSizeLetter: 90,
          fontSizePoints: 30),
      backgroundLetter(context,
          letter: 'L',
          points: 1,
          rotationDeg: -30,
          top: 520 - 30,
          left: 300,
          right: null,
          height: 130,
          width: 130,
          fontSizeLetter: 90,
          fontSizePoints: 30),
    ];
  }

  List<Widget> rightLetters(BuildContext context) {
    return [
      backgroundLetter(context,
          letter: 'Y',
          points: 10,
          rotationDeg: 40,
          top: 120 - 30,
          left: null,
          right: 220,
          height: 150,
          width: 150,
          fontSizeLetter: 90,
          fontSizePoints: 30),
      backgroundLetter(context,
          letter: '*',
          points: 0,
          rotationDeg: 35,
          top: 320 - 30,
          left: null,
          right: 360,
          height: 120,
          width: 120,
          fontSizeLetter: 85,
          fontSizePoints: 30),
      backgroundLetter(context,
          letter: 'M',
          points: 2,
          rotationDeg: 40,
          top: 360 - 30,
          left: null,
          right: 120,
          height: 150,
          width: 150,
          fontSizeLetter: 90,
          fontSizePoints: 30),
      backgroundLetter(context,
          letter: 'B',
          points: 3,
          rotationDeg: 30,
          top: 520 - 30,
          left: null,
          right: 300,
          height: 130,
          width: 130,
          fontSizeLetter: 90,
          fontSizePoints: 30),
    ];
  }

  Widget backgroundLetter(
    BuildContext context, {
    required double rotationDeg,
    required double top,
    required double? left,
    required String letter,
    required int points,
    required double? right,
    double height = 100,
    double width = 100,
    double fontSizeLetter = 70,
    double fontSizePoints = 20,
  }) {
    return Positioned(
      top: top - 30,
      left: left,
      right: right,
      height: height,
      width: width,
      child: RotationTransition(
        turns: AlwaysStoppedAnimation(rotationDeg / 360),
        child: LetterTileFeedbackWidget(
          [CommonLetter(letter, points)],
          0,
          context,
          height: height,
          width: width,
          fontSizeLetter: fontSizeLetter,
          fontSizePoints: fontSizePoints,
        ),
      ),
    );
  }
}
