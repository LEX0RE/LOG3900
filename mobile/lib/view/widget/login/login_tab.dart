import 'package:Scrabble/constants/keys.dart';
import 'package:Scrabble/logic/authentication/authentication_page/authentication_page_cubit.dart';
import 'package:Scrabble/logic/form/login_form/login_bloc.dart';
import 'package:Scrabble/logic/form/register_form/register_cubit.dart';
import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:Scrabble/view/widget/login/login_form.dart';
import 'package:Scrabble/view/widget/login/register_form.dart';
import 'package:Scrabble/view/widget/login/tab.dart';
import 'package:Scrabble/view/widget/scrabble_widget/button.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class LoginTabWidget extends StatelessWidget {
  final bool isLogin;

  const LoginTabWidget({
    Key? key,
    required this.isLogin,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    ColorExtension themeColors = Theme.of(context).extension<ColorExtension>()!;
    AppLocalizations localizations = AppLocalizations.of(context);
    AuthenticationPageCubit authenticationPageCubit = BlocProvider.of<AuthenticationPageCubit>(context);
    LoginBloc loginBloc = BlocProvider.of<LoginBloc>(context);
    RegisterBloc registerBloc = BlocProvider.of<RegisterBloc>(context);

    return Container(
      constraints: const BoxConstraints(
        minWidth: 700,
        minHeight: 500,
        maxWidth: 700,
        maxHeight: 625,
      ),
      child: Column(
        children: [
          Flexible(
            flex: 2,
            child: Row(
              children: [
                TabWidget(
                    key: LOGIN_TAB_BUTTON,
                    text: localizations.signIn,
                    isSelected: isLogin,
                    onTap: authenticationPageCubit.switchToLogin),
                TabWidget(
                    key: SIGN_UP_TAB_BUTTON,
                    text: localizations.signUp,
                    isSelected: !isLogin,
                    onTap: authenticationPageCubit.switchToRegister),
              ],
            ),
          ),
          Flexible(
            flex: 9,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
              decoration: BoxDecoration(
                color: themeColors.buttonColor,
                border: Border.all(
                  color: themeColors.buttonBorderColor!,
                  width: 5,
                ),
                borderRadius: const BorderRadius.only(
                  bottomLeft: Radius.circular(30),
                  bottomRight: Radius.circular(30),
                ),
              ),
              child: isLogin ? const LoginFormWidget() : const RegisterFormWidget(),
            ),
          ),
          Flexible(
            flex: 2,
            child: SizedBox(
              width: 350,
              height: 50,
              child: ScrabbleButtonWidget(
                key: LOGIN_REGISTER_SUBMIT_BUTTON,
                onPressed: isLogin ? () => loginBloc.add(LoginEventLogin()) : () => registerBloc.submit(),
                text: isLogin ? localizations.login : localizations.signUp,
              ),
            ),
          )
        ],
      ),
    );
  }
}
