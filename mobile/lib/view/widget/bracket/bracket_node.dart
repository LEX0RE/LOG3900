import 'package:Scrabble/data/models/interfaces/bracket/bracket_user.dart';
import 'package:Scrabble/data/models/interfaces/bracket/common_bracket.dart';
import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:Scrabble/view/widget/bracket/bracket_line.dart';
import 'package:Scrabble/view/widget/bracket/bracket_player.dart';
import 'package:Scrabble/view/widget/bracket/observer_button.dart';
import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class BracketNode extends StatelessWidget {
  final CommonBracket bracket;
  final bool reverse;
  final bool fillRemaining;

  const BracketNode(this.bracket, {super.key, required this.reverse, required this.fillRemaining});

  @override
  Widget build(BuildContext context) {
    ThemeData theme = Theme.of(context);
    AppLocalizations localizations = AppLocalizations.of(context);
    final hasChildren = bracket.children.isNotEmpty;

    return Container(
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          reverse ? currentNode(theme) : childrenNode(),
          if (hasChildren) BracketLine(reverse),
          reverse ? childrenNode() : currentNode(theme),
        ],
      ),
    );
  }

  Widget childrenNode() {
    return Column(mainAxisAlignment: MainAxisAlignment.start, children: [
      ...bracket.children.map((child) => BracketNode(
            child,
            reverse: reverse,
            fillRemaining: fillRemaining,
          ))
    ]);
  }

  Widget currentNode(ThemeData theme) {
    return Container(
      padding: const EdgeInsets.only(top: 4.0, bottom: 4.0),
      decoration: BoxDecoration(
          color: theme.extension<ColorExtension>()!.tableColor!,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(
            color: theme.extension<ColorExtension>()!.tableBorderColor!,
            width: 8,
          )),
      child: Flex(
          direction: Axis.vertical,
          mainAxisAlignment: MainAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            ...bracket.currentPlayers.map((player) => Column(children: [
                  if (player != bracket.currentPlayers.first)
                    const Text('VS', style: TextStyle(fontSize: 20.0, fontWeight: FontWeight.bold)),
                  BracketPlayer(player)
                ])),
            if (fillRemaining)
              for (int i = bracket.currentPlayers.length; i < 2; i++)
                Column(children: [
                  if (i != 0) const Text('VS', style: TextStyle(fontSize: 20.0, fontWeight: FontWeight.bold)),
                  const BracketPlayer(BracketUser('', '', -1, ''))
                ]),
            Container(child: bracket.isMatchInProgress ? ObserverButton(bracket) : Container()),
          ]),
    );
  }
}
