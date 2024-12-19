import 'package:Scrabble/constants/keys.dart';
import 'package:Scrabble/constants/route.dart';
import 'package:Scrabble/data/models/enums/game_modes.dart';
import 'package:Scrabble/logic/form/new_game_configuration_form/new_game_configuration_cubit.dart';
import 'package:Scrabble/logic/gamemode/gamemode_cubit.dart';
import 'package:Scrabble/logic/router/router_manager.dart';
import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:Scrabble/view/widget/new_game_configuration/duration_picker.dart';
import 'package:Scrabble/view/widget/scrabble_widget/button.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class GameConfigurationForm extends StatelessWidget {
  const GameConfigurationForm({super.key});

  @override
  Widget build(BuildContext context) {
    final AppLocalizations localization = AppLocalizations.of(context);
    final ThemeData theme = Theme.of(context);
    final NewGameConfigurationCubit gameConfigurationCubit = context.watch<NewGameConfigurationCubit>();
    final GameModesEnum gameMode = context.watch<GamemodeCubit>().state.gamemode;

    return Center(
      child: BlocListener<NewGameConfigurationCubit, NewGameConfigurationState>(
        listener: (context, state) {
          if (state is NewGameConfigurationGameCreated) {
            context.read<RouterManager>().navigate(LOBBY_PATH, ROOT_PATH);
          }
        },
        child: Form(
          key: GlobalKey<FormState>(),
          autovalidateMode: AutovalidateMode.onUserInteraction,
          child: Column(
            children: [
              const SizedBox(height: 120),
              Text(
                localization.dictionary,
                style: theme.textTheme.headlineSmall,
              ),
              Text(
                localization.frenchDictionary,
                textScaleFactor: 1.5,
              ),
              const SizedBox(height: 20),
              if (gameMode.value != GameModes.COOPERATIVE)
                Text(
                  localization.turnDuration,
                  style: theme.textTheme.headlineSmall,
                ),
              if (gameMode.value != GameModes.COOPERATIVE)
                BlocBuilder<NewGameConfigurationCubit, NewGameConfigurationState>(
                  buildWhen: (previous, current) => current is NewGameConfigurationTimerChanged,
                  builder: (context, state) {
                    return Container(
                      padding: const EdgeInsets.all(10),
                      height: 80,
                      child: DurationPickerWidget(
                        textColor: ColorExtension.inputFontColor,
                        backgroundColor: ColorExtension.inputBackgroundColor,
                        borderColor: ColorExtension.inputFontColor,
                        borderWidth: 0.5,
                        borderRadius: 4,
                        count: 60,
                        step: 30,
                        minCount: 30,
                        maxCount: 60 * 5,
                        showButtonText: false,
                        onCountChange: (double newDuration) {
                          gameConfigurationCubit.setTurnDuration(newDuration);
                        },
                      ),
                    );
                  },
                ),
              const SizedBox(height: 20),
              Text(
                localization.publicGame,
                style: theme.textTheme.headlineSmall,
              ),
              BlocBuilder<NewGameConfigurationCubit, NewGameConfigurationState>(
                buildWhen: (previous, current) => current is NewGameConfigurationVisibilityChanged,
                builder: (context, state) {
                  return Container(
                    padding: EdgeInsets.all(5),
                    child: Switch(
                      value: gameConfigurationCubit.isPublic,
                      onChanged: (bool newIsPublic) {
                        gameConfigurationCubit.setVisibility(newIsPublic);
                      },
                    ),
                  );
                },
              ),
              BlocBuilder<NewGameConfigurationCubit, NewGameConfigurationState>(
                buildWhen: (previous, current) => current is NewGameConfigurationVisibilityChanged,
                builder: (context, state) {
                  if (gameConfigurationCubit.isPublic && gameConfigurationCubit.hasPassword) {
                    return Container(
                        padding: EdgeInsets.all(3),
                        child: Column(children: [
                          const SizedBox(height: 10),
                          Text(
                            localization.passwordGame,
                            style: theme.textTheme.headlineSmall,
                          ),
                          Switch(
                            value: gameConfigurationCubit.hasPassword,
                            onChanged: (bool newHasPassword) {
                              gameConfigurationCubit.setVisibilityPassword(newHasPassword);
                            },
                          ),
                          Container(
                            padding: const EdgeInsets.all(3),
                            width: 300,
                            child: TextFormField(
                              validator: gameConfigurationCubit.passwordValidator,
                              obscureText: true,
                              key: LOBBY_PASSWORD_KEY,
                              style: TextStyle(color: ColorExtension.inputFontColor),
                              decoration: InputDecoration(
                                contentPadding: const EdgeInsets.all(10),
                                border: const OutlineInputBorder(),
                                fillColor: ColorExtension.inputBackgroundColor,
                                filled: true,
                              ),
                              onChanged: (value) {
                                gameConfigurationCubit.setPassword(value);
                              },
                            ),
                          ),
                        ]));
                  } else if (gameConfigurationCubit.isPublic) {
                    return Container(
                        padding: EdgeInsets.all(3),
                        child: Column(children: [
                          const SizedBox(height: 10),
                          Text(
                            localization.passwordGame,
                            style: theme.textTheme.headlineSmall,
                          ),
                          Switch(
                            value: gameConfigurationCubit.hasPassword,
                            onChanged: (bool newHasPassword) {
                              gameConfigurationCubit.setVisibilityPassword(newHasPassword);
                            },
                          )
                        ]));
                  } else
                    return Container();
                },
              ),
              const SizedBox(height: 20),
              SizedBox(
                width: 250,
                height: 70,
                child: ScrabbleButtonWidget(
                    key: CREATE_GAME_BUTTON,
                    text: localization.createGame,
                    onPressed: () {
                      gameConfigurationCubit.submit();
                    }),
              )
            ],
          ),
        ),
      ),
    );
  }
}
