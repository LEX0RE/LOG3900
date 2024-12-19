import 'package:Scrabble/logic/form/register_form/register_cubit.dart';
import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:Scrabble/view/widget/login/left_column.dart';
import 'package:Scrabble/view/widget/login/right_column.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class RegisterFormWidget extends StatelessWidget {
  const RegisterFormWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    RegisterBloc registerBloc = BlocProvider.of<RegisterBloc>(context);
    AppLocalizations localization = AppLocalizations.of(context);
    ThemeData theme = Theme.of(context);
    BoxDecoration inputDecoration = BoxDecoration(
      border: Border.all(color: theme.extension<ColorExtension>()!.buttonBorderColor!),
      borderRadius: BorderRadius.circular(5),
      color: ColorExtension.inputBackgroundColor,
    );

    return SingleChildScrollView(
      child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 50, vertical: 0),
          margin: const EdgeInsets.only(top: 0),
          child: Form(
            key: GlobalKey<FormState>(),
            autovalidateMode: AutovalidateMode.onUserInteraction,
            child: Row(children: [
              Flexible(
                flex: 1,
                child: LeftColumn(
                    theme: theme,
                    localization: localization,
                    inputDecoration: inputDecoration,
                    registerBloc: registerBloc),
              ),
              Flexible(
                flex: 1,
                child: RightColumn(
                    theme: theme,
                    localization: localization,
                    inputDecoration: inputDecoration,
                    registerBloc: registerBloc),
              ),
            ]),
          )),
    );
  }
}
