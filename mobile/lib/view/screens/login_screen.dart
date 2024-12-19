import 'package:Scrabble/constants/route.dart';
import 'package:Scrabble/constants/title.dart';
import 'package:Scrabble/logic/authentication/authentication_manager/authentication_manager_bloc.dart';
import 'package:Scrabble/logic/authentication/authentication_page/authentication_page_cubit.dart';
import 'package:Scrabble/logic/form/login_form/login_bloc.dart';
import 'package:Scrabble/logic/form/register_form/register_cubit.dart';
import 'package:Scrabble/logic/router/router_manager.dart';
import 'package:Scrabble/view/widget/login/login_tab.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:image_picker/image_picker.dart';

class LoginScreen extends StatelessWidget {
  const LoginScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Center(child: Text(APP_TITLE)),
      ),
      body: MultiBlocProvider(
        providers: [
          BlocProvider<LoginBloc>(
            create: (_) => LoginBloc(
              passwordController: TextEditingController(),
              usernameController: TextEditingController(),
              localizations: AppLocalizations.of(context),
              authenticationManager: BlocProvider.of<AuthenticationManagerBloc>(context),
            ),
          ),
          BlocProvider<RegisterBloc>(
            create: (_) => RegisterBloc(
              passwordController: TextEditingController(),
              usernameController: TextEditingController(),
              emailController: TextEditingController(),
              localizations: AppLocalizations.of(context),
              authenticationManager: BlocProvider.of<AuthenticationManagerBloc>(context),
              imagePicker: ImagePicker(),
            ),
          ),
          BlocProvider<AuthenticationPageCubit>(create: (_) => AuthenticationPageCubit()),
        ],
        child: BlocListener<AuthenticationManagerBloc, AuthenticationManagerState>(
          listener: (context, state) {
            if (state is AuthenticationManagerStateLoggedIn) {
              BlocProvider.of<RouterManager>(context).navigate(HOME_PATH, ROOT_PATH);
            }
          },
          child: Center(
            child: Container(
              child: BlocBuilder<AuthenticationPageCubit, AuthenticationPageState>(
                builder: (context, state) {
                  return LoginTabWidget(
                    isLogin: state is AuthenticationPageLogin,
                  );
                },
              ),
            ),
          ),
        ),
      ),
    );
  }
}
