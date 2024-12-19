import 'package:Scrabble/view/screens/game/game_screen.dart';
import 'package:Scrabble/view/widget/overlay/replay_overlay_widget.dart';
import 'package:flutter/material.dart';

class ReplayScreen extends StatelessWidget {
  const ReplayScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Stack(children: [
      // TODO : Revoir la sortie du Replay (Le bouton Leave car il est relié avec Game)
      const GameScreen(),
      Container(
          margin: const EdgeInsets.only(left: 320),
          width: 960,
          height: double.infinity,
          color: Colors.black.withOpacity(0),
          child: ReplayOverlayWidget()),
    ]);
  }
}
