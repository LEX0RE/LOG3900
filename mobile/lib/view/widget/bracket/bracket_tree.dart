import 'package:Scrabble/data/models/interfaces/bracket/common_bracket.dart';
import 'package:Scrabble/logic/bracket/bracket_cubit.dart';
import 'package:Scrabble/view/widget/bracket/bracket_line.dart';
import 'package:Scrabble/view/widget/bracket/bracket_node.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class BracketTree extends StatelessWidget {
  const BracketTree({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final brackets = context.watch<BracketCubit>().state.brackets;
    AppLocalizations localizations = AppLocalizations.of(context);

    return Center(
      child: IntrinsicHeight(
        child: Column(
          children: [
            if (brackets.isNotEmpty)
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  if (brackets[0].children.isNotEmpty)
                    BracketNode(brackets[0].children[0], reverse: false, fillRemaining: true),
                  const BracketLine(false),
                  if (brackets[0].children.length > 1)
                    BracketNode(
                        CommonBracket([brackets[0].children[1]], brackets[0].currentPlayers,
                            brackets[0].isMatchInProgress, brackets[0].gameId),
                        reverse: true,
                        fillRemaining: true),
                ],
              ),
            if (brackets.length > 1)
              Column(
                children: [
                  const SizedBox(height: 15),
                  Text(localizations.consolation, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                  BracketNode(brackets[1], reverse: false, fillRemaining: false),
                ],
              )
          ],
        ),
      ),
    );
  }
}
