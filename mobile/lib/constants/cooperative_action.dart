import 'package:Scrabble/data/models/enums/action_response.dart';
import 'package:Scrabble/data/models/interfaces/cooperative/approvals_list_update.dart';
import 'package:Scrabble/data/models/interfaces/cooperative/new_action_to_approve.dart';

const NewActionToApprove DEFAULT_ACTION_TO_APPROVE = NewActionToApprove('', '');

const ApprovalsListUpdate DEFAULT_APPROVALS_LIST_UPDATE = ApprovalsListUpdate([], [], []);

const ActionResponseEnum DEFAULT_ACTION_RESPONSE = ActionResponseEnum(ActionResponseType.NoResponse);
