import 'package:Scrabble/constants/keys.dart';
import 'package:Scrabble/logic/authentication/authentication_manager/authentication_manager_bloc.dart';
import 'package:Scrabble/logic/form/register_form/register_cubit.dart';
import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class LeftColumn extends StatelessWidget {
  const LeftColumn({
    Key? key,
    required this.theme,
    required this.localization,
    required this.inputDecoration,
    required this.registerBloc,
  }) : super(key: key);

  final ThemeData theme;
  final AppLocalizations localization;
  final BoxDecoration inputDecoration;
  final RegisterBloc registerBloc;

  @override
  Widget build(BuildContext context) => Container(
        padding: const EdgeInsets.symmetric(horizontal: 5),
        child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              const SizedBox(height: 10),
              BlocBuilder<AuthenticationManagerBloc, AuthenticationManagerState>(
                builder: (context, state) {
                  if (state is! AuthenticationManagerStateRegisterFailed) return Container();
                  return Container(
                    margin: const EdgeInsets.only(bottom: 20),
                    child: Center(
                      child: Text(
                        state.message,
                        style: theme.textTheme.headlineMedium,
                        textAlign: TextAlign.center,
                      ),
                    ),
                  );
                },
              ),
              Text(
                "${localization.username} :",
                style: theme.textTheme.headlineSmall,
              ),
              Container(
                decoration: inputDecoration,
                child: TextFormField(
                  controller: registerBloc.usernameController,
                  validator: registerBloc.usernameValidator,
                  key: REGISTER_USERNAME_KEY,
                  style: TextStyle(color: ColorExtension.inputFontColor),
                  decoration: InputDecoration(
                    hintText: localization.username,
                    contentPadding: const EdgeInsets.all(10),
                    border: const OutlineInputBorder(),
                  ),
                ),
              ),
              Text(
                "${localization.email} :",
                style: theme.textTheme.headlineSmall,
              ),
              Container(
                decoration: inputDecoration,
                child: TextFormField(
                  style: TextStyle(color: ColorExtension.inputFontColor),
                  controller: registerBloc.emailController,
                  validator: registerBloc.emailValidator,
                  key: REGISTER_EMAIL_KEY,
                  decoration: InputDecoration(
                    contentPadding: const EdgeInsets.all(10),
                    hintText: localization.email,
                    border: const OutlineInputBorder(),
                  ),
                ),
              ),
              Text("${localization.password} :", style: theme.textTheme.headlineSmall),
              Container(
                decoration: inputDecoration,
                child: TextFormField(
                  style: TextStyle(color: ColorExtension.inputFontColor),
                  controller: registerBloc.passwordController,
                  validator: registerBloc.passwordValidator,
                  obscureText: true,
                  key: REGISTER_PASSWORD_KEY,
                  decoration: InputDecoration(
                    contentPadding: const EdgeInsets.all(10),
                    hintText: localization.password,
                    border: const OutlineInputBorder(),
                  ),
                ),
              ),
              const SizedBox(height: 40),
            ]),
      );
}
