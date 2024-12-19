part of 'cooperative_game_approval_cubit.dart';

@immutable
abstract class CooperativeGameApprovalState with EquatableMixin {
  final NewActionToApprove actionToApprove;
  final ApprovalsListUpdate approvalsList;
  final ActionResponseEnum response;
  final bool isActionProposedByMe;
  final bool isPreviewingAction;

  const CooperativeGameApprovalState(
      this.actionToApprove, this.approvalsList, this.response, this.isActionProposedByMe, this.isPreviewingAction);

  @override
  List<Object> get props => [actionToApprove, approvalsList, response, isActionProposedByMe, isPreviewingAction];
}

class CooperativeGameApprovalInitial extends CooperativeGameApprovalState {
  const CooperativeGameApprovalInitial()
      : super(DEFAULT_ACTION_TO_APPROVE, DEFAULT_APPROVALS_LIST_UPDATE, DEFAULT_ACTION_RESPONSE, false, false);
}

class CooperativeGameApprovalUpdated extends CooperativeGameApprovalState {
  const CooperativeGameApprovalUpdated(NewActionToApprove actionToApprove, ApprovalsListUpdate approvalsList,
      ActionResponseEnum response, bool isActionProposedByMe, bool isPreviewingAction)
      : super(actionToApprove, approvalsList, response, isActionProposedByMe, isPreviewingAction);
}
