@GenerateNiceMocks([
  MockSpec<AuthenticationManagerBloc>(),
  MockSpec<AuthenticationPageCubit>(),
  MockSpec<ChatManagerBloc>(),
  MockSpec<IdentityHolder>(),
  MockSpec<LoginBloc>(),
  MockSpec<RegisterBloc>(),
  MockSpec<RouterManager>(),
  MockSpec<SocketManagerBloc>(),
  MockSpec<CommandSenderCubit>(),
  MockSpec<EaselLetterHolderCubit>(),
  MockSpec<BoardHolderCubit>(),
  MockSpec<PlacementCubit>(),
  MockSpec<PlayerInfoHolderCubit>(),
  MockSpec<StashInfoCubit>(),
  MockSpec<TimerCubit>(),
  MockSpec<TradeCubit>(),
  MockSpec<BlankLetterFormCubit>(),
  MockSpec<ReplayRepository>(),
  MockSpec<ThemeCubit>(),
  MockSpec<LanguageCubit>(),
  MockSpec<NotificationCubit>(),
  MockSpec<GamemodeCubit>(),
])
import 'package:Scrabble/data/repositories/replay_repository.dart';
import 'package:Scrabble/logic/authentication/authentication_manager/authentication_manager_bloc.dart';
import 'package:Scrabble/logic/authentication/authentication_page/authentication_page_cubit.dart';
import 'package:Scrabble/logic/chat/chat_manager_bloc.dart';
import 'package:Scrabble/logic/command_sender/command_sender_cubit.dart';
import 'package:Scrabble/logic/form/blank_letter_form/blank_letter_form_cubit.dart';
import 'package:Scrabble/logic/form/login_form/login_bloc.dart';
import 'package:Scrabble/logic/form/register_form/register_cubit.dart';
import 'package:Scrabble/logic/game_info_holder/board_holder/board_holder_cubit.dart';
import 'package:Scrabble/logic/game_info_holder/easel_letter_holder/easel_letter_holder_cubit.dart';
import 'package:Scrabble/logic/game_info_holder/placement/placement_cubit.dart';
import 'package:Scrabble/logic/game_info_holder/player_info_holder/player_info_holder_cubit.dart';
import 'package:Scrabble/logic/game_info_holder/stash_info/stash_info_cubit.dart';
import 'package:Scrabble/logic/game_info_holder/timer/timer_cubit.dart';
import 'package:Scrabble/logic/game_info_holder/trade/trade_cubit.dart';
import 'package:Scrabble/logic/gamemode/gamemode_cubit.dart';
import 'package:Scrabble/logic/identity/identity_cubit.dart';
import 'package:Scrabble/logic/notification/notification_cubit.dart';
import 'package:Scrabble/logic/profile/language/language_cubit.dart';
import 'package:Scrabble/logic/router/router_manager.dart';
import 'package:Scrabble/logic/socket/socket_manager_bloc.dart';
import 'package:Scrabble/view/theme/cubit/theme_cubit.dart';
import 'package:mockito/annotations.dart';
