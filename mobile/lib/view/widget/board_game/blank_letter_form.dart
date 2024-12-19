import 'package:Scrabble/constants/form.dart';
import 'package:Scrabble/constants/keys.dart';
import 'package:Scrabble/logic/form/blank_letter_form/blank_letter_form_cubit.dart';
import 'package:Scrabble/view/widget/scrabble_widget/button.dart';
import 'package:avoid_keyboard/avoid_keyboard.dart';
import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class BlankLetterForm extends StatelessWidget {
  final ThemeData theme;
  final AppLocalizations localization;
  final BlankLetterFormCubit formCubit;

  const BlankLetterForm({Key? key, required this.theme, required this.localization, required this.formCubit})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Container(
        padding: const EdgeInsets.only(top: 10, left: 20, right: 20, bottom: 10),
        child: Form(
          key: BLANK_FORM_KEY,
          autovalidateMode: AutovalidateMode.onUserInteraction,
          child: AvoidKeyboard(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                blankLetterText(),
                blankLetterInput(),
                ScrabbleButtonWidget(text: localization.submit, onPressed: this.formCubit.submit)
              ],
            ),
          ),
        ),
      ),
    );
  }

  Center blankLetterText() {
    return Center(
      child: Text(
        '${localization.enterBlankLetter} :',
        style: theme.textTheme.headlineSmall,
      ),
    );
  }

  Container blankLetterInput() {
    return Container(
      decoration: TEXT_INPUT_DECORATION(theme),
      child: TextFormField(
        focusNode: this.formCubit.focusNode,
        key: BLANK_LETTER_KEY,
        controller: formCubit.blankLetterController,
        inputFormatters: formCubit.blankLetterFormatters,
        style: theme.textTheme.bodyMedium,
        decoration: InputDecoration(
          hintText: localization.enterBlankLetter,
          contentPadding: const EdgeInsets.all(10),
        ),
      ),
    );
  }
}
