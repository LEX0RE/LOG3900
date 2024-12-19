import 'package:Scrabble/constants/route.dart';
import 'package:Scrabble/data/data_providers/new_game_provider.dart';
import 'package:Scrabble/data/repositories/new_game_configuration_repository.dart';
import 'package:Scrabble/logic/form/new_game_configuration_form/new_game_configuration_cubit.dart';
import 'package:Scrabble/logic/gamemode/gamemode_cubit.dart';
import 'package:Scrabble/logic/identity/identity_cubit.dart';
import 'package:Scrabble/view/constants/HUD_interface.dart';
import 'package:Scrabble/view/widget/new_game_configuration/new_game_configuration_form.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class CreateGameScreen extends StatelessWidget {
  const CreateGameScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final localizations = AppLocalizations.of(context);
    return HUDInterface(
      Scaffold(
        body: BlocProvider(
          create: (context) => NewGameConfigurationCubit(
            localizations,
            NewGameRepository(
              newGameProvider: NewGameProvider(identity: context.read<IdentityHolder>()),
            ),
            context.read<GamemodeCubit>(),
          ),
          child: const GameConfigurationForm(),
        ),
      ),
      context,
      previousPath: JOINABLE_LOBBIES_PATH,
    );
  }
}
