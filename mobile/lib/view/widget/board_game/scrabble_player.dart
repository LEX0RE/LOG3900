import 'package:Scrabble/data/models/interfaces/game_info/common_player_info.dart';
import 'package:Scrabble/logic/end_game/end_game_cubit.dart';
import 'package:Scrabble/logic/game_info_holder/player_info_holder/player_info_holder_cubit.dart';
import 'package:Scrabble/logic/utils/image_utils.dart';
import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class ScrabblePlayer extends StatelessWidget {
  final double widthHeightImage = 50;
  final int maxLetter = 7;
  late ColorExtension themeColors;

  ScrabblePlayer({super.key});
  @override
  Widget build(BuildContext context) {
    themeColors = Theme.of(context).extension<ColorExtension>()!;
    return BlocBuilder<PlayerInfoHolderCubit, PlayerInfoHolderState>(
      builder: (context, state) {
        List<CommonPlayerInfo> players = [];
        if (state is PlayerInfoHolderUpdated) players = [state.playerInfo] + state.otherPlayersInfo;

        return Container(
            alignment: Alignment.centerRight,
            child: Column(
                children: List.generate(
                    players.length, (int index) => Flexible(child: createPlayer(players[index], context)))));
      },
    );
  }

  Container createPlayer(CommonPlayerInfo player, BuildContext context) => Container(
      alignment: Alignment.bottomRight,
      child: Container(
          width: player.turn ? 262 : 250,
          height: player.turn ? 102 : 90,
          margin: player.turn ? const EdgeInsets.all(0) : const EdgeInsets.all(6),
          decoration: BoxDecoration(
            border: player.turn ? Border.all(color: Colors.green.shade800, width: 6) : const Border(),
          ),
          child: Column(children: <Widget>[
            Flexible(flex: 1, child: informationPlayer(player, '', context)),
            Flexible(flex: 1, child: scoreAndTile(player))
          ])));

  Widget informationPlayer(CommonPlayerInfo player, String image, BuildContext context) {
    final EndGameCubit endGameCubit = context.watch<EndGameCubit>();
    List<Widget> list = [
      Flexible(child: profileImage(player)),
      Flexible(child: playerName(player.name)),
    ];

    if (endGameCubit.state.endGame != null && endGameCubit.state.endGame!.winners.contains(player))
      list.add(Flexible(
        child: Container(
          alignment: Alignment.centerRight,
          margin: const EdgeInsets.only(left: 10.0, right: 7.0),
          child: Image.asset('lib/assets/images/crown.png'),
        ),
      ));

    return Container(
        height: 45,
        decoration: BoxDecoration(color: themeColors.buttonColor),
        child: Row(
          children: list,
        ));
  }

  Container playerName(String name) => Container(
      alignment: Alignment.center,
      constraints: const BoxConstraints(minWidth: 800, maxWidth: 800),
      child: FittedBox(
          fit: BoxFit.contain,
          child: Text(
            name,
            style: TextStyle(
              color: themeColors.buttonFontColor,
              fontWeight: FontWeight.bold,
              fontSize: 32.0,
            ),
          )));

  Container profileImage(CommonPlayerInfo player) => Container(
      margin: const EdgeInsets.only(left: 7.0, right: 7.0),
      constraints: BoxConstraints(
          minWidth: widthHeightImage,
          maxWidth: widthHeightImage,
          minHeight: widthHeightImage,
          maxHeight: widthHeightImage),
      child: player.profilePicture != null
          ? Image.memory(decodeStringImage(player.profilePicture!), scale: 2.5)
          : Image.asset('lib/assets/images/player.png', scale: 2.5));

  Widget scoreAndTile(CommonPlayerInfo player) => Container(
        decoration: BoxDecoration(color: themeColors.buttonBorderColor),
        child: Row(children: [
          Flexible(flex: 1, child: tile(player.nLetterLeft)),
          Flexible(flex: 1, child: score(player.score))
        ]),
      );

  Container tile(int nLetterLeft) => Container(
      margin: const EdgeInsets.only(left: 10.0, bottom: 3),
      child: Column(children: [
        Flexible(
            flex: 60,
            child: GridView.count(
                crossAxisCount: 7,
                childAspectRatio: 1,
                children: List.generate(
                    nLetterLeft,
                    (index) => Container(
                          margin: const EdgeInsets.only(right: 2.0),
                          decoration: BoxDecoration(color: themeColors.tileColor),
                        )))),
        Flexible(
            flex: 10,
            child: Container(
              alignment: Alignment.topCenter,
              decoration: BoxDecoration(color: themeColors.buttonColor),
            ))
      ]));

  Container score(int score) => Container(
      alignment: Alignment.centerRight,
      margin: const EdgeInsets.only(right: 15.0),
      child: Text(score.toString(),
          style: TextStyle(
            color: themeColors.buttonFontColor,
            fontWeight: FontWeight.bold,
            fontSize: 35.0,
          )));
}
