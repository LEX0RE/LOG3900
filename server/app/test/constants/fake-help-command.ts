import { HELP_COMMAND } from '@app/constants/system-message';
import { ActionType } from '@common/enums/action-type';

const EXPECTED_HINT_INFO = ` ${ActionType.Hint}:\n Affiche trois propositions de placement\n\n`;
const EXPECTED_TRADE_INFO = ` ${ActionType.Trade} <lettres>:\n Remplacer les lettres mises en paramètre par de nouvelles\n\n`;
const EXPECTED_SKIP_INFO = ` ${ActionType.SkipTurn}:\n Passer votre tour\n\n`;
const EXPECTED_PLACE_INFO1 = ` ${ActionType.PlaceLetters} <ligne><colonne[(h|v)]> <lettres>:\n`;
const EXPECTED_PLACE_INFO2 = ' Place les lettres mises en paramètre sur le plateau de jeu';
const EXPECTED_PLACE_INFO3 = '\n ex: !placer H8v baS\n (mettre en majuscule pour utiliser la lettre blanche)\n\n';
const EXPECTED_PLACE_INFO = EXPECTED_PLACE_INFO1 + EXPECTED_PLACE_INFO2 + EXPECTED_PLACE_INFO3;
const EXPECTED_RESERVE_INFO = ` ${ActionType.Stash}:\n Afficher les lettres restantes ainsi que leur quantité\n\n`;
const EXPECTED_HELP_INFO = ` ${ActionType.Help}:\n Affiche les commandes disponibles du jeu`;

export const EXPECTED_HELP_MESSAGE =
    HELP_COMMAND +
    '\n\n' +
    EXPECTED_HINT_INFO +
    EXPECTED_TRADE_INFO +
    EXPECTED_SKIP_INFO +
    EXPECTED_PLACE_INFO +
    EXPECTED_RESERVE_INFO +
    EXPECTED_HELP_INFO;
