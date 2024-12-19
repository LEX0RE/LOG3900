part of 'blank_letter_form_cubit.dart';

@immutable
abstract class BlankLetterFormState with EquatableMixin {
  @override
  List<Object> get props => [];
}

class BlankLetterFormInitial extends BlankLetterFormState {}

class BlankLetterFormShow extends BlankLetterFormState {}
