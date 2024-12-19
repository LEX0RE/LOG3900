part of 'register_cubit.dart';

@immutable
abstract class RegisterState with EquatableMixin {
  @override
  List<Object?> get props => [];
}

class RegisterInitial extends RegisterState with EquatableMixin {}

class RegisterLoading extends RegisterState {}

class RegisterStateProfilePictureChanged extends RegisterState {
  final Uint8List image;

  @override
  List<Object?> get props => [image];

  RegisterStateProfilePictureChanged({required this.image});
}
