import 'package:Scrabble/constants/communication.dart';
import 'package:Scrabble/constants/cooperative_action.dart';
import 'package:Scrabble/data/models/enums/action_response.dart';
import 'package:Scrabble/data/models/enums/action_type.dart';
import 'package:Scrabble/data/models/interfaces/cooperative/approvals_list_update.dart';
import 'package:Scrabble/data/models/interfaces/cooperative/new_action_to_approve.dart';
import 'package:Scrabble/logic/command_sender/command_sender_cubit.dart';
import 'package:Scrabble/logic/game_info_holder/placement/placement_cubit.dart';
import 'package:Scrabble/logic/game_info_holder/trade/trade_cubit.dart';
import 'package:Scrabble/logic/socket/socket_manager_bloc.dart';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

part 'cooperative_game_approval_state.dart';

class CooperativeGameApprovalCubit extends Cubit<CooperativeGameApprovalState> {
  final SocketManagerBloc socketManager;
  final PlacementCubit placementCubit;
  final TradeCubit tradeCubit;
  final CommandSenderCubit commandSenderCubit;

  CooperativeGameApprovalCubit(this.socketManager, this.placementCubit, this.tradeCubit, this.commandSenderCubit)
      : super(const CooperativeGameApprovalInitial()) {
    this._configureSocket();
  }

  void sendPlacementProposition() {
    sendActionProposition(placementCubit.state.placement.toString());
  }

  void sendTradeProposition() {
    sendActionProposition(tradeCubit.trade.toString());
  }

  void sendPassProposition() {
    sendActionProposition(const ActionEnum(ActionType.SKIP_TURN).toString());
  }

  void sendActionProposition(String commandToApprove) {
    if (isClosed) return;
    socketManager.add(SocketManagerSend(ACTION_SUGGESTION, commandToApprove));
    emit(CooperativeGameApprovalUpdated(
        NewActionToApprove(commandToApprove, ''), state.approvalsList, state.response, true, state.isPreviewingAction));
  }

  void approveAction() {
    if (isClosed) return;
    emit(CooperativeGameApprovalUpdated(state.actionToApprove, state.approvalsList,
        const ActionResponseEnum(ActionResponseType.Approved), state.isActionProposedByMe, state.isPreviewingAction));
    socketManager.add(SocketManagerSend(ACTION_APPROVAL));
  }

  void rejectAction() {
    if (isClosed) return;
    emit(CooperativeGameApprovalUpdated(state.actionToApprove, state.approvalsList,
        const ActionResponseEnum(ActionResponseType.Rejected), state.isActionProposedByMe, state.isPreviewingAction));
    socketManager.add(SocketManagerSend(ACTION_REJECTION));
  }

  void sendActionCancellation() {
    placementCubit.reset(dynamic);
    tradeCubit.resetTrade(dynamic);
    _resetActionToApprove();
    socketManager.add(SocketManagerSend(ACTION_CANCELLATION));
  }

  void previewActionProposed() {
    if (state.isActionProposedByMe || isClosed) return;
    emit(CooperativeGameApprovalUpdated(
        state.actionToApprove, state.approvalsList, state.response, state.isActionProposedByMe, true));
    final String command = state.actionToApprove.command;
    placementCubit.addPlacementFromString(command);
  }

  void quitPreviewing() {
    if (isClosed) return;
    emit(CooperativeGameApprovalUpdated(
        state.actionToApprove, state.approvalsList, state.response, state.isActionProposedByMe, false));
  }

  void _configureSocket() {
    socketManager
      ..add(SocketManagerAddHandler(NEW_ACTION_TO_APPROVE, _initializeActionToApprove,
          typeFactory: NewActionToApprove.fromJson))
      ..add(SocketManagerAddHandler(ACTION_APPROVED_BY_ALL, (dynamic) => _resetActionToApprove(),
          typeFactory: DEFAULT_TYPE_FACTORY))
      ..add(SocketManagerAddHandler(ACTION_CONFIRMATION, (dynamic) => _playAction(), typeFactory: DEFAULT_TYPE_FACTORY))
      ..add(SocketManagerAddHandler(APPROVALS_LIST_UPDATE, _updateApprovalsList,
          typeFactory: ApprovalsListUpdate.fromJson))
      ..add(SocketManagerAddHandler(ACTION_HAS_BEEN_CANCELLED, (dynamic) => _resetActionToApprove(),
          typeFactory: DEFAULT_TYPE_FACTORY));
  }

  void _playAction() {
    commandSenderCubit.sendCommand(state.actionToApprove.command);
    _resetActionToApprove();
  }

  void _updateApprovalsList(dynamic updatedApprovalsList) {
    if (updatedApprovalsList is! ApprovalsListUpdate || isClosed) return;
    emit(CooperativeGameApprovalUpdated(state.actionToApprove, updatedApprovalsList, state.response,
        state.isActionProposedByMe, state.isPreviewingAction));
  }

  void _initializeActionToApprove(dynamic newActionToApprove) {
    if (newActionToApprove is! NewActionToApprove || isClosed) return;
    _resetActionToApprove();
    emit(CooperativeGameApprovalUpdated(newActionToApprove, state.approvalsList,
        const ActionResponseEnum(ActionResponseType.NoResponse), state.isActionProposedByMe, state.isPreviewingAction));
  }

  void _resetActionToApprove() {
    if (isClosed) return;
    emit(const CooperativeGameApprovalInitial());
  }

  @override
  Future<void> close() {
    socketManager
      ..removeHandlersForEvent(NEW_ACTION_TO_APPROVE)
      ..removeHandlersForEvent(ACTION_APPROVED_BY_ALL)
      ..removeHandlersForEvent(ACTION_CONFIRMATION)
      ..removeHandlersForEvent(APPROVALS_LIST_UPDATE)
      ..removeHandlersForEvent(ACTION_HAS_BEEN_CANCELLED);
    return super.close();
  }
}
