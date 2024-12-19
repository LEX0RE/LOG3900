import 'package:Scrabble/logic/overlay/join-request/join_request_cubit.dart';
import 'package:Scrabble/view/widget/overlay/overlay_widget.dart';
import 'package:Scrabble/view/widget/scrabble_widget/button.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class JoinRequestWaitingOverlay extends StatelessWidget {
  const JoinRequestWaitingOverlay({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    JoinRequestCubit joinRequestCubit = BlocProvider.of<JoinRequestCubit>(context);
    AppLocalizations localizations = AppLocalizations.of(context);

    return OverlayWidget<JoinRequestCubit, JoinRequestWaiting, JoinRequestState>(
      margin: const EdgeInsets.only(top: 275, left: 400, right: 400, bottom: 275),
      removeExternalTap: false,
      child: Column(
        children: [
          const SizedBox(height: 15),
          Text(localizations.approvalWaiting, style: Theme.of(context).textTheme.headlineSmall),
          const SizedBox(height: 50),
          ScrabbleButtonWidget(
            text: localizations.cancel,
            width: 140,
            height: 55,
            onPressed: () => {joinRequestCubit.cancelJoinRequest(joinRequestCubit.state.waitingForLobby.lobbyId)},
          )
        ],
      ),
    );
  }
}

class JoinRequestDeclinedOverlay extends StatelessWidget {
  const JoinRequestDeclinedOverlay({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    JoinRequestCubit joinRequestCubit = BlocProvider.of<JoinRequestCubit>(context);
    AppLocalizations localizations = AppLocalizations.of(context);

    return OverlayWidget<JoinRequestCubit, JoinRequestDeclined, JoinRequestState>(
      margin: const EdgeInsets.only(top: 275, left: 400, right: 400, bottom: 275),
      removeExternalTap: false,
      child: Column(
        children: [
          const SizedBox(height: 15),
          Text(localizations.youWereRejected, style: Theme.of(context).textTheme.headlineSmall),
          const SizedBox(height: 50),
          ScrabbleButtonWidget(
            text: localizations.ok,
            width: 140,
            height: 55,
            onPressed: () => joinRequestCubit.hideDeclined(),
          )
        ],
      ),
    );
  }
}
