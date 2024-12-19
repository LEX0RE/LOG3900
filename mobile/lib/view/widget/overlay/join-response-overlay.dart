import 'package:Scrabble/data/models/interfaces/identity.dart';
import 'package:Scrabble/data/models/interfaces/lobby/lobby_info.dart';
import 'package:Scrabble/logic/identity/identity_cubit.dart';
import 'package:Scrabble/logic/lobby/lobby/lobby_cubit.dart';
import 'package:Scrabble/logic/overlay/join_response/join_response_cubit.dart';
import 'package:Scrabble/view/widget/overlay/overlay_widget.dart';
import 'package:Scrabble/view/widget/scrabble_widget/button.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class JoinResponseOverlay extends StatelessWidget {
  const JoinResponseOverlay({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    ThemeData theme = Theme.of(context);
    AppLocalizations localizations = AppLocalizations.of(context);
    final LobbyInfo lobbyInfo = context.select((LobbyCubit value) => value.state.lobby);
    final JoinResponseCubit joinResponseCubit = BlocProvider.of<JoinResponseCubit>(context);
    final Identity identity = BlocProvider.of<IdentityHolder>(context).identity;

    return Container(
      child: !isCreator(lobbyInfo.gameConfig.creator?.id, identity.userId) || lobbyInfo.potentialPlayers.isEmpty
          ? Container()
          : OverlayWidget<JoinResponseCubit, JoinResponseNewRequest, JoinResponseState>(
              margin: const EdgeInsets.only(top: 200, left: 400, right: 400, bottom: 200),
              removeExternalTap: false,
              child: ListView.builder(
                itemCount: lobbyInfo.potentialPlayers.length,
                itemBuilder: (BuildContext context, int index) {
                  return Column(
                    children: [
                      Text(
                        lobbyInfo.potentialPlayers[index].name + localizations.wantsToJoin,
                        style: theme.textTheme.headlineSmall,
                      ),
                      const SizedBox(height: 5),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          ScrabbleButtonWidget(
                              text: localizations.accept,
                              fontSize: 15,
                              width: 110,
                              height: 40,
                              onPressed: () =>
                                  joinResponseCubit.accept(lobbyInfo.potentialPlayers[index], lobbyInfo.lobbyId)),
                          const SizedBox(width: 20),
                          ScrabbleButtonWidget(
                              text: localizations.decline,
                              fontSize: 15,
                              width: 110,
                              height: 40,
                              onPressed: () =>
                                  joinResponseCubit.decline(lobbyInfo.potentialPlayers[index], lobbyInfo.lobbyId))
                        ],
                      ),
                      const SizedBox(height: 30),
                    ],
                  );
                },
              )),
    );
  }

  bool isCreator(String? creatorId, String userId) {
    return creatorId == null ? false : creatorId == userId;
  }
}
