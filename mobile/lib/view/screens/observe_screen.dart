import 'package:Scrabble/view/screens/game/game_screen.dart';
import 'package:Scrabble/view/widget/overlay/observer_overlay.dart';
import 'package:flutter/material.dart';

class ObserveScreen extends StatelessWidget {
  const ObserveScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Stack(children: [
      GameScreen(),
      Container(
          margin: EdgeInsets.only(left: 320), width: 960, height: double.infinity, color: Colors.black.withOpacity(0)),
      ObserverOverlayWidget()
    ]);
  }
}
