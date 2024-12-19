import 'package:Scrabble/data/models/enums/scrabble_enum.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

enum ConnectionStatus {
  Connected,
  Disconnected,
}

class ConnectionStatusEnum extends ScrabbleEnum<ConnectionStatus> {
  ConnectionStatusEnum(ConnectionStatus value) : super(value);

  @override
  Map<ConnectionStatusEnum, String> mapInternationalNames(AppLocalizations localization) => {
        ConnectionStatusEnum(ConnectionStatus.Connected): localization.connection,
        ConnectionStatusEnum(ConnectionStatus.Disconnected): localization.disconnection,
      };

  factory ConnectionStatusEnum.fromString(String value) {
    switch (value) {
      case 'Connected':
        return ConnectionStatusEnum(ConnectionStatus.Connected);
      case 'Disconnected':
      default:
        return ConnectionStatusEnum(ConnectionStatus.Disconnected);
    }
  }

  @override
  ConnectionStatus fromString(String value) {
    switch (value) {
      case 'Connected':
        return ConnectionStatus.Connected;
      case 'Disconnected':
      default:
        return ConnectionStatus.Disconnected;
    }
  }

  @override
  String toEnumValueString() {
    switch (value) {
      case ConnectionStatus.Connected:
        return 'Connected';
      case ConnectionStatus.Disconnected:
        return 'Disconnected';
    }
  }
}
