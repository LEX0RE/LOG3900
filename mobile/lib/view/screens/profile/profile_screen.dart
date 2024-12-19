import 'package:Scrabble/constants/route.dart';
import 'package:Scrabble/data/models/enums/language.dart';
import 'package:Scrabble/data/models/enums/theme.dart';
import 'package:Scrabble/data/models/interfaces/user/user_interface.dart';
import 'package:Scrabble/logic/identity/identity_cubit.dart';
import 'package:Scrabble/logic/profile/profile_form_manager/profile_form_manager_cubit.dart';
import 'package:Scrabble/logic/router/router_manager.dart';
import 'package:Scrabble/logic/user_validator/user_validator.dart';
import 'package:Scrabble/logic/utils/image_utils.dart';
import 'package:Scrabble/view/constants/HUD_interface.dart';
import 'package:Scrabble/view/widget/scrabble_widget/button.dart';
import 'package:Scrabble/view/widget/scrabble_widget/edit/edit_button.dart';
import 'package:Scrabble/view/widget/scrabble_widget/edit/edit_field.dart';
import 'package:Scrabble/view/widget/scrabble_widget/picker.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

const double BUTTON_HEIGHT = 50;
const double BUTTON_WIDTH = 200;
const double WIDGET_WIDTH = 700;
const double BUTTON_SPACING = 20;
const double SPACING_PROFILE_TEXT_FORM = 20;
const double SPACING_FORM_BUTTON = 60;
const double PICKER_HEIGHT = 100;

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({Key? key}) : super(key: key);

  @override
  ProfileScreenState createState() => ProfileScreenState();
}

class ProfileScreenState extends State<ProfileScreen> {
  late ThemeData theme;
  late AppLocalizations localization;
  late UserInterface userProfile;
  late IdentityHolder identityHolder;
  late ProfileFormManagerCubit userFormManagerCubit;
  ProfileScreenState();

  @override
  Widget build(BuildContext context) {
    theme = Theme.of(context);
    localization = AppLocalizations.of(context);
    userProfile = context.watch<IdentityHolder>().userProfile;
    userFormManagerCubit = context.watch<ProfileFormManagerCubit>();
    return HUDInterface(
      SingleChildScrollView(
        child: Center(
          child: Column(
            children: [
              const SizedBox(height: SPACING_PROFILE_TEXT_FORM),
              Text(
                localization.profile,
                style: theme.textTheme.headlineLarge,
              ),
              const SizedBox(height: SPACING_PROFILE_TEXT_FORM),
              Container(
                padding: const EdgeInsets.all(WIDGET_WIDTH * 0.1),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Flexible(
                      child: Align(
                        alignment: Alignment.centerRight,
                        child: Column(
                          children: [
                            themPicker(),
                            languagePicker(),
                          ],
                        ),
                      ),
                    ),
                    Flexible(flex: 1, child: avatar()),
                    Flexible(
                      child: Align(
                        alignment: Alignment.centerLeft,
                        child: Column(children: textFields()),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: SPACING_FORM_BUTTON),
              buttonRow(),
            ],
          ),
        ),
      ),
      context,
      previousPath: HOME_PATH,
    );
  }

  Widget avatar() => SizedBox(
        width: WIDGET_WIDTH * 0.25,
        child: Center(
          child: Stack(
            alignment: Alignment.bottomRight,
            children: [
              SizedBox(
                child: ClipOval(
                  clipBehavior: Clip.hardEdge,
                  child: Image.memory(
                    decodeStringImage(userProfile.profilePicture),
                  ),
                ),
              ),
              ScrabbleEditButton(
                onPressed: () => userFormManagerCubit.getProfilePictureFromCamera(),
              )
            ],
          ),
        ),
      );

  List<Widget> textFields() => [
        const SizedBox(height: SPACING_PROFILE_TEXT_FORM),
        ScrabbleEditField(
          width: WIDGET_WIDTH,
          label: '${localization.username} : ',
          value: userProfile.userName,
          validator: (String? value) => validateUsername(value, localization),
          onSaved: (String? value) {
            if (value != null) userFormManagerCubit.updateName(value);
          },
        ),
        const SizedBox(height: SPACING_PROFILE_TEXT_FORM),
        IgnorePointer(
          ignoring: true,
          child: ScrabbleEditField(
              width: WIDGET_WIDTH,
              label: '${localization.email} : ',
              value: userProfile.email,
              validator: (String? value) => validateEmail(value, localization),
              onSaved: (String? value) {
                if (value != null) userFormManagerCubit.updateEmail(value);
              }),
        ),
        const SizedBox(height: SPACING_PROFILE_TEXT_FORM),
        IgnorePointer(
          ignoring: true,
          child: ScrabbleEditField(
              width: WIDGET_WIDTH,
              label: '${localization.password} : ',
              value: '********',
              validator: (String? value) => validatePassword(value, localization),
              onSaved: (String? value) {
                if (value != null) userFormManagerCubit.updatePassword(value);
              }),
        ),
        const SizedBox(height: SPACING_PROFILE_TEXT_FORM),
      ];

  Widget languagePicker() => SizedBox(
        height: PICKER_HEIGHT,
        width: WIDGET_WIDTH * 0.65,
        child: Center(
          child: ScrabblePicker<LanguageEnum, LanguageType>(
            title: (localization) => '${localization.language} :',
            hintText: (localization) => localization.languagePickerHint,
            onChange: (context, newValue) => context.read<ProfileFormManagerCubit>().updateLanguage(newValue),
            defaultValue: LanguageEnum(LanguageType.French),
          ),
        ),
      );

  Widget themPicker() => SizedBox(
        height: PICKER_HEIGHT,
        width: WIDGET_WIDTH * 0.65,
        child: Center(
          child: ScrabblePicker<ThemeEnum, AppTheme>(
            title: (localization) => '${localization.theme} :',
            hintText: (localization) => localization.colorTheme,
            onChange: (context, newTheme) => context.read<ProfileFormManagerCubit>().updateTheme(newTheme),
            defaultValue: ThemeEnum(AppTheme.Default),
          ),
        ),
      );

  Widget buttonRow() => SizedBox(
        width: WIDGET_WIDTH,
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            ScrabbleButtonWidget(
              width: BUTTON_WIDTH,
              height: BUTTON_HEIGHT,
              text: localization.statistic,
              onPressed: () => context.read<RouterManager>().navigate(STATISTICS_PATH, ROOT_PATH),
            ),
            const SizedBox(width: BUTTON_SPACING),
            const SizedBox(width: BUTTON_SPACING),
            ScrabbleButtonWidget(
              width: BUTTON_WIDTH,
              height: BUTTON_HEIGHT,
              text: localization.history,
              onPressed: () => context.read<RouterManager>().navigate(HISTORY_PATH, ROOT_PATH),
            ),
            const SizedBox(width: BUTTON_SPACING),
            ScrabbleButtonWidget(
                width: BUTTON_WIDTH,
                height: BUTTON_HEIGHT,
                text: localization.seeYourFriends,
                onPressed: () {
                  context.read<RouterManager>().navigate(FRIENDS_PATH, ROOT_PATH);
                }),
          ],
        ),
      );
}
