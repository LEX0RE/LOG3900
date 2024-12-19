import 'package:Scrabble/constants/form.dart';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

part 'blank_letter_form_state.dart';

class BlankLetterFormCubit extends Cubit<BlankLetterFormState> {
  final AppLocalizations localizations;
  final FocusNode focusNode;
  late Function onCancel;
  late Function(String) onSubmit;
  late final TextEditingController blankLetterController;
  late final List<TextInputFormatter> blankLetterFormatters;

  BlankLetterFormCubit({
    required this.blankLetterController,
    required this.localizations,
    required this.focusNode,
  }) : super(BlankLetterFormInitial()) {
    onCancel = () {};
    onSubmit = (String _) {};
    blankLetterFormatters = [
      LengthLimitingTextInputFormatter(MAX_LENGTH_BLANK_LETTER),
      FilteringTextInputFormatter(BLANK_LETTER_REGEX, allow: true)
    ];
  }

  void show({Function? onCancel, Function(String)? onSubmit}) {
    this.onCancel = onCancel ?? () {};
    this.onSubmit = onSubmit ?? (String _) {};
    focusNode.requestFocus();
    emit(BlankLetterFormShow());
  }

  void hide() => emit(BlankLetterFormInitial());

  void submitBlankLetter(String? value) {
    if (value == null || value.isEmpty) return;
    emit(BlankLetterFormInitial());
    onSubmit(value);
  }

  void submit() => submitBlankLetter(blankLetterController.text);

  void cancel() {
    emit(BlankLetterFormInitial());
    onCancel();
  }

  String? blankValidator(String? value) {
    if (value == null || value.isEmpty) {
      return localizations.blankLetterRequired;
    }
    if (value.length > MAX_LENGTH_BLANK_LETTER) {
      return localizations.blankLetterTooLong;
    }
    if (!BLANK_LETTER_REGEX.hasMatch(value)) {
      return localizations.blankLetterInvalid;
    }
    return null;
  }

  @override
  Future<void> close() {
    blankLetterController.dispose();
    return super.close();
  }
}
