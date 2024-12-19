import { ActionType } from '@common/enums/action-type';

export const HINT_INFO = `${ActionType.Hint}:\n Affiche trois propositions de placement`;
export const TRADE_INFO = `${ActionType.Trade} <lettres>:\n Remplacer les lettres mises en paramètre par de nouvelles`;
export const SKIPTURN_INFO = `${ActionType.SkipTurn}:\n Passer votre tour`;
export const PLACELETTERS_INFO1 = `${ActionType.PlaceLetters} <ligne><colonne[(h|v)]> <lettres>`;
export const PLACELETTERS_INFO2 = ':\n Place les lettres mises en paramètre sur le plateau de jeu';
export const PLACELETTERS_INFO3 = '\n ex: !placer H8v baS\n (mettre en majuscule pour utiliser la lettre blanche)';
export const PLACELETTERS_INFO = PLACELETTERS_INFO1 + PLACELETTERS_INFO2 + PLACELETTERS_INFO3;
export const STASH_INFO = `${ActionType.Stash}:\n Afficher les lettres restantes ainsi que leur quantité`;
export const HELP_INFO = `${ActionType.Help}:\n Affiche les commandes disponibles du jeu`;
export const ACTION_TYPE_INFO: string[] = [HINT_INFO, TRADE_INFO, SKIPTURN_INFO, PLACELETTERS_INFO, STASH_INFO, HELP_INFO];
