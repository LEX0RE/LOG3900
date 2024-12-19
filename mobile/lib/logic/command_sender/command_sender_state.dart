part of 'command_sender_cubit.dart';

@immutable
abstract class CommandSenderState with EquatableMixin {
  const CommandSenderState();

  @override
  List<Object> get props => [];
}

class CommandSenderInitial extends CommandSenderState {}
