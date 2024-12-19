import 'package:Scrabble/constants/keys.dart';
import 'package:Scrabble/logic/authentication/authentication_manager/authentication_manager_bloc.dart';
import 'package:Scrabble/logic/form/register_form/register_cubit.dart';
import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class RightColumn extends StatelessWidget {
  const RightColumn({
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
        padding: const EdgeInsets.only(left: 10, right: 10, top: 0),
        child: Column(crossAxisAlignment: CrossAxisAlignment.stretch, children: [
          BlocBuilder<AuthenticationManagerBloc, AuthenticationManagerState>(
            builder: (context, state) {
              if (state is! AuthenticationManagerStateRegisterFailed) return Container();
              return Container(
                margin: const EdgeInsets.only(bottom: 20),
                child: Center(
                  child: Text(
                    state.message,
                    style: theme.textTheme.headlineSmall,
                    textAlign: TextAlign.center,
                  ),
                ),
              );
            },
          ),
          Text(
            "${localization.profilePicture} :",
            style: theme.textTheme.headlineSmall,
          ),
          SizedBox(
            width: 140,
            height: 140,
            child: BlocBuilder<RegisterBloc, RegisterState>(
              key: REGISTER_PROFILE_PICTURE,
              buildWhen: (previous, current) => current is RegisterStateProfilePictureChanged,
              builder: (context, state) => Image.memory(registerBloc.image),
            ),
          ),
          Container(
            decoration: BoxDecoration(
              border: Border.all(color: theme.extension<ColorExtension>()!.buttonBorderColor!, width: 2),
              borderRadius: BorderRadius.circular(20),
              color: theme.extension<ColorExtension>()!.buttonColor,
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                IconButton(
                    key: REGISTER_PREVIOUS_PROFILE_BUTTON,
                    onPressed: () => registerBloc.previousPredefined(),
                    icon: const Icon(Icons.arrow_back_sharp)),
                IconButton(
                    onPressed: () => registerBloc.getProfilePictureFromCamera(), icon: const Icon(Icons.camera_alt)),
                IconButton(
                    key: REGISTER_NEXT_PROFILE_BUTTON,
                    onPressed: () => registerBloc.nextPredefined(),
                    icon: const Icon(Icons.arrow_forward_sharp)),
              ],
            ),
          ),
        ]),
      );
}
