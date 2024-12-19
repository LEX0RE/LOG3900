import 'package:Scrabble/constants/keys.dart';
import 'package:Scrabble/constants/login.dart';
import 'package:Scrabble/logic/authentication/authentication_manager/authentication_manager_bloc.dart';
import 'package:Scrabble/logic/form/login_form/login_bloc.dart';
import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class LoginFormWidget extends StatelessWidget {
  const LoginFormWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    LoginBloc loginBloc = BlocProvider.of<LoginBloc>(context);
    AppLocalizations localization = AppLocalizations.of(context);
    ThemeData theme = Theme.of(context);
    BoxDecoration inputDecoration = BoxDecoration(
      border: Border.all(color: theme.extension<ColorExtension>()!.buttonBorderColor!),
      borderRadius: BorderRadius.circular(5),
      color: ColorExtension.inputBackgroundColor,
    );

    return SingleChildScrollView(
      child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 50, vertical: 10),
          margin: const EdgeInsets.only(top: 0),
          child: Form(
            key: GlobalKey<FormState>(),
            autovalidateMode: AutovalidateMode.onUserInteraction,
            child: Column(crossAxisAlignment: CrossAxisAlignment.stretch, children: [
              BlocBuilder<AuthenticationManagerBloc, AuthenticationManagerState>(
                builder: (context, state) {
                  if (state is! AuthenticationManagerStateLogFailed) return Container();
                  return Container(
                    margin: const EdgeInsets.only(bottom: 20),
                    child: Center(
                      child: Text(
                        state.message == 'Connection timed out'
                            ? localization.unableConnect
                            : (state.message == LOADING ? localization.loading : state.message),
                        style: theme.textTheme.headlineMedium,
                        textAlign: TextAlign.center,
                      ),
                    ),
                  );
                },
              ),
              Center(
                  child: Text(
                "${localization.username} :",
                style: theme.textTheme.headlineSmall,
              )),
              Container(
                margin: const EdgeInsets.only(top: 30, bottom: 20),
                decoration: inputDecoration,
                child: TextFormField(
                  controller: loginBloc.usernameController,
                  validator: loginBloc.usernameValidator,
                  key: LOGIN_USERNAME_KEY,
                  style: TextStyle(color: ColorExtension.inputFontColor),
                  decoration: InputDecoration(
                    hintText: localization.username,
                    contentPadding: const EdgeInsets.all(10),
                    border: const OutlineInputBorder(),
                  ),
                ),
              ),
              Center(child: Text("${localization.password} :", style: theme.textTheme.headlineSmall)),
              Container(
                margin: const EdgeInsets.only(top: 30, bottom: 20),
                decoration: inputDecoration,
                child: TextFormField(
                  style: TextStyle(color: ColorExtension.inputFontColor),
                  controller: loginBloc.passwordController,
                  validator: loginBloc.passwordValidator,
                  obscureText: true,
                  key: LOGIN_PASSWORD_KEY,
                  decoration: InputDecoration(
                    contentPadding: const EdgeInsets.all(10),
                    hintText: localization.password,
                    border: const OutlineInputBorder(),
                  ),
                ),
              ),
            ]),
          )),
    );
  }
}
