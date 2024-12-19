import 'package:Scrabble/constants/communication.dart';
import 'package:Scrabble/data/models/classes/letters/position_index_letter.dart';
import 'package:Scrabble/data/models/classes/trade.dart';
import 'package:Scrabble/data/models/interfaces/game_info/easel_update.dart';
import 'package:Scrabble/logic/command_sender/command_sender_cubit.dart';
import 'package:Scrabble/logic/game_info_holder/easel_letter_holder/easel_letter_holder_cubit.dart';
import 'package:Scrabble/logic/socket/socket_manager_bloc.dart';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

part 'trade_state.dart';

class TradeCubit extends Cubit<TradeState> {
  final SocketManagerBloc socketManager;
  final EaselLetterHolderCubit easelLetterHolderCubit;
  final CommandSenderCubit commandSenderCubit;

  late final List<int> easelIndexes;

  TradeCubit(this.socketManager, this.easelLetterHolderCubit, this.commandSenderCubit) : super(TradeInitial()) {
    easelIndexes = [];
    socketManager.add(SocketManagerAddHandler(EASEL_UPDATE, resetTrade, typeFactory: EaselUpdate.fromJson));
  }

  bool has(int index) => easelIndexes.contains(index);

  Trade get trade =>
      Trade(easelIndexes.map((index) => easelLetterHolderCubit.state.letters[index]).toList().toPositionLetters());

  void resetTrade(dynamic) {
    emit(TradeInitial());
  }

  void toggleToTrade(int index) {
    if (has(index)) {
      removeFromTrade(index);
    } else {
      easelIndexes.add(index);
    }
    emit(TradeUpdated(easelIndexes));
  }

  void removeFromTrade(int index) {
    easelIndexes.remove(index);
    emit(TradeUpdated(easelIndexes));
  }

  void sendTrade() {
    if (trade.letters.isEmpty) return;
    commandSenderCubit.sendCommand(trade);
  }
}
