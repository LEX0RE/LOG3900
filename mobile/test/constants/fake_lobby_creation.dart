import 'package:Scrabble/constants/fake/fake_lobby_update.dart';
import 'package:Scrabble/data/models/enums/game_modes.dart';
import 'package:Scrabble/data/models/enums/game_visibilities.dart';
import 'package:Scrabble/data/models/interfaces/lobby/lobby_creation.dart';

final FAKE_LOBBY_CREATION = () => LobbyCreation(
    FAKE_COMMON_GAME_CONFIG_2(),
    gameModeToString(GameModes.CLASSIC),
    gameVisibilityToString(GameVisibilities.PUBLIC_NO_PASSWORD),
    '',
    [],
  );
