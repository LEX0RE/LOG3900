import 'package:Scrabble/data/models/enums/action_response.dart';
import 'package:Scrabble/data/models/enums/action_type.dart';
import 'package:Scrabble/logic/cooperative_game_approval/cooperative_game_approval_cubit.dart';
import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:Scrabble/view/widget/scrabble_widget/button.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class ApprovalPanel extends StatelessWidget {
  const ApprovalPanel({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    final ThemeData theme = Theme.of(context);
    final ColorExtension colorExtension = theme.extension<ColorExtension>()!;
    final CooperativeGameApprovalCubit approvalCubit = context.watch<CooperativeGameApprovalCubit>();
    final CooperativeGameApprovalState state = approvalCubit.state;
    final localization = AppLocalizations.of(context);

    return SizedBox(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          const SizedBox(height: 10),
          Center(child: Text(localization.actionToApprove, style: theme.textTheme.headlineSmall)),
          const SizedBox(height: 10),
          if (!state.isActionProposedByMe && state.actionToApprove.command.isNotEmpty)
            Center(child: Text(state.actionToApprove.command.substring(1), style: theme.textTheme.bodyMedium)),
          const SizedBox(height: 10),
          if (!state.isActionProposedByMe)
            SizedBox(
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  const SizedBox(width: 10),
                  Expanded(
                    child: ScrabbleButtonWidget(
                      text: localization.preview,
                      isEnabled: (BuildContext context) {
                        final CooperativeGameApprovalState state = context.watch<CooperativeGameApprovalCubit>().state;
                        final bool isActionPropositionPreviewable =
                            ActionEnum.fromString(state.actionToApprove.command).value == ActionType.PLACE_LETTER;
                        return !state.isPreviewingAction && isActionPropositionPreviewable;
                      },
                      onPressed: () => approvalCubit.previewActionProposed(),
                    ),
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: ScrabbleButtonWidget(
                      text: localization.cancel,
                      isEnabled: (BuildContext context) {
                        final CooperativeGameApprovalState state = context.watch<CooperativeGameApprovalCubit>().state;
                        return state.isPreviewingAction;
                      },
                      onPressed: () => approvalCubit.quitPreviewing(),
                    ),
                  ),
                  const SizedBox(width: 10),
                ],
              ),
            ),
          const SizedBox(height: 10),
          SizedBox(
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const SizedBox(width: 10),
                statusColumn(localization.approvals, theme, state.approvalsList.approvingPlayersNames),
                const SizedBox(width: 10),
                statusColumn(localization.pending, theme, state.approvalsList.noResponsePlayersNames),
                const SizedBox(width: 10),
                statusColumn(localization.rejected, theme, state.approvalsList.rejectingPlayersNames),
                const SizedBox(width: 10),
              ],
            ),
          ),
          const SizedBox(height: 10),
          if (!state.isActionProposedByMe)
            SizedBox(
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  const SizedBox(width: 10),
                  Expanded(
                    child: ScrabbleButtonWidget(
                      text: localization.approve,
                      backgroundColor: ColorExtension.playButtonColor,
                      borderColor: ColorExtension.playButtonBorderColor,
                      isEnabled: (BuildContext context) {
                        final CooperativeGameApprovalState state = context.watch<CooperativeGameApprovalCubit>().state;
                        return state.response.value != ActionResponseType.Approved;
                      },
                      onPressed: () => approvalCubit.approveAction(),
                    ),
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: ScrabbleButtonWidget(
                      text: localization.reject,
                      backgroundColor: ColorExtension.badButtonColor,
                      borderColor: ColorExtension.hardButtonBorderColor,
                      isEnabled: (BuildContext context) {
                        final CooperativeGameApprovalState state = context.watch<CooperativeGameApprovalCubit>().state;
                        return state.response.value != ActionResponseType.Rejected;
                      },
                      onPressed: () => approvalCubit.rejectAction(),
                    ),
                  ),
                  const SizedBox(width: 10),
                ],
              ),
            ),
          const SizedBox(height: 10),
          if (state.isActionProposedByMe)
            ScrabbleButtonWidget(
              text: localization.cancel,
              onPressed: () => approvalCubit.sendActionCancellation(),
            )
        ],
      ),
    );
  }

  Widget statusColumn(String header, ThemeData theme, List<String> names) {
    return SizedBox(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Center(
              child: Text(
            header,
            style: theme.textTheme.headlineSmall,
            textScaleFactor: 0.8,
          )),
          ...List.generate(
              names.length, (index) => Center(child: Text(names[index], style: theme.textTheme.bodyMedium))),
        ],
      ),
    );
  }
}
