import 'package:Scrabble/data/models/enums/bracket_result.dart';
import 'package:Scrabble/data/models/interfaces/bracket/bracket_user.dart';
import 'package:Scrabble/data/models/interfaces/identity.dart';
import 'package:Scrabble/logic/identity/identity_cubit.dart';
import 'package:Scrabble/logic/utils/image_utils.dart';
import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:Scrabble/view/widget/bracket/loser_overlay.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class BracketPlayer extends StatelessWidget {
  final BracketUser user;
  const BracketPlayer(this.user, {super.key});

  @override
  Widget build(BuildContext context) {
    AppLocalizations localizations = AppLocalizations.of(context);
    final Identity identity = BlocProvider.of<IdentityHolder>(context).identity;

    return Stack(
      clipBehavior: Clip.none,
      children: [
        Container(
          margin: EdgeInsets.only(
            left: identity.user.id == user.id ? 2.0 : 8.0,
            top: identity.user.id == user.id ? 0.0 : 4.0,
            right: identity.user.id == user.id ? 2.0 : 8.0,
            bottom: identity.user.id == user.id ? 0.0 : 4.0,
          ),
          width: identity.user.id == user.id ? 242 : 230,
          height: identity.user.id == user.id ? 72 : 60,
          clipBehavior: Clip.hardEdge,
          decoration: BoxDecoration(
            color: ColorExtension.profileBackground!,
            borderRadius: BorderRadius.circular(10),
            border: identity.user.id == user.id ? Border.all(color: Colors.green.shade800, width: 6) : const Border(),
          ),
          child: Row(children: [
            if (user.name != '')
              if (user.profilePicture != null && user.profilePicture != '')
                Image.memory(decodeStringImage(user.profilePicture!))
              else
                Image.asset('lib/assets/images/player.png'),
            Container(
                margin: const EdgeInsets.only(left: 4.0),
                child: Text(user.name, style: const TextStyle(fontSize: 18.0))),
          ]),
        ),
        if (user.winner == bracketResultToInt(BracketResult.LOSER)) const LoserOverlay()
      ],
    );
  }
}
