import 'package:Scrabble/constants/communication.dart';
import 'package:Scrabble/logic/socket/socket_manager_bloc.dart';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

part 'command_sender_state.dart';

class CommandSenderCubit extends Cubit<CommandSenderState> {
  final SocketManagerBloc socketManagerBloc;
  CommandSenderCubit(this.socketManagerBloc) : super(CommandSenderInitial());

  // it uses .toString() to generate the command
  void sendCommand<T>(T command) {
    socketManagerBloc.add(SocketManagerSend(COMMAND, command.toString()));
  }
}
