import 'package:Scrabble/constants/keys.dart';
import 'package:Scrabble/logic/overlay/game_password_overlay/game_password_cubit.dart';
import 'package:Scrabble/view/theme/color_extension.dart';
import 'package:Scrabble/view/widget/overlay/overlay_widget.dart';
import 'package:Scrabble/view/widget/scrabble_widget/button.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class GamePasswordOverlay extends StatelessWidget {
  const GamePasswordOverlay({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    ColorExtension themeColors = Theme.of(context).extension<ColorExtension>()!;
    GamePasswordCubit gamePasswordCubit = BlocProvider.of<GamePasswordCubit>(context);
    AppLocalizations localizations = AppLocalizations.of(context);

    return OverlayWidget<GamePasswordCubit, GamePasswordNeed, GamePasswordState>(
      margin: const EdgeInsets.only(top: 150, left: 400, right: 400, bottom: 350),
      onOverlayCancel: () => gamePasswordCubit.closePassword(),
      child: Column(
        children: [
          BlocBuilder<GamePasswordCubit, GamePasswordState>(
              buildWhen: (previous, current) => current is GamePasswordState,
              builder: (context, state) {
                if (state is! GamePasswordState) return Container();
                if (state.passwordInvalid)
                  return Text(localizations.invalidPasswordNewGame, style: Theme.of(context).textTheme.headlineMedium);
                return Container();
              }),
          const SizedBox(height: 5),
          Text(localizations.enterPasswordGame, style: Theme.of(context).textTheme.headlineSmall),
          const SizedBox(height: 20),
          Container(
            padding: const EdgeInsets.all(3),
            width: 300,
            child: TextFormField(
              validator: (value) {
                if (value != null) if (value.isEmpty) return localizations.pleaseEnterText;
                if (value == null) return localizations.pleaseEnterText;
                return null;
              },
              obscureText: true,
              key: PUBLIC_GAME_PASSWORD_KEY,
              style: TextStyle(color: ColorExtension.inputFontColor),
              decoration: InputDecoration(
                contentPadding: const EdgeInsets.all(10),
                border: const OutlineInputBorder(),
                fillColor: ColorExtension.inputBackgroundColor,
                filled: true,
              ),
              onChanged: (value) {
                gamePasswordCubit.setPassword(value);
              },
            ),
          ),
          const SizedBox(height: 20),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              ScrabbleButtonWidget(
                text: localizations.cancel,
                width: 140,
                height: 55,
                onPressed: () => {gamePasswordCubit.closePassword()},
              ),
              ScrabbleButtonWidget(
                text: localizations.goToGame,
                width: 200,
                height: 55,
                onPressed: () => {
                  gamePasswordCubit.validatePassword(
                      gamePasswordCubit.state.needPassword.lobbyId,
                      gamePasswordCubit.state.needPassword.joiningType,
                      gamePasswordCubit.state.needPassword.isGame,
                      gamePasswordCubit.state.needPassword.isTournament)
                },
              )
            ],
          )
        ],
      ),
    );
  }
}
