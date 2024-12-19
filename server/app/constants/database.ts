export const DATABASE_COLLECTION_CLASSIC = 'scores_classique';
// eslint-disable-next-line id-length -- nécessaire pour avoir une meilleur compréhension
export const DATABASE_COLLECTION_VIRTUAL_PLAYER_BEGINNER = 'vp_name_beginner';
// eslint-disable-next-line id-length -- nécessaire pour avoir une meilleur compréhension
export const DATABASE_COLLECTION_VIRTUAL_PLAYER_EXPERT = 'vp_name_expert';
export const DATABASE_COLLECTION_HISTORY = 'game_history';
export const DATABASE_COLLECTION_USERS = 'users'; // nom de la collection sur MongoDb pour les comptes utilisateurs
export const DATABASE_COLLECTION_CHAT = 'chat';
export const DATABASE_COLLECTION_REPLAY = 'replay'; // nom de la collection sur MongoDb pour les replays
// eslint-disable-next-line id-length
export const DATABASE_COLLECTION_TOURNAMENT_STATISTIC = 'tournament_statistic'; // nom de la collection sur MongoDb pour les statistiques des tournois
export const DATABASE_COLLECTION_CONNECTION = 'connection'; // nom de la collection sur MongoDb pour les connexions
export const DATABASE_URL = 'mongodb+srv://Admin:scrabble@cluster0.ostkv.mongodb.net/scrabble?retryWrites=true&w=majority';
export const DATABASE_NAME = 'scrabble';
// constantes pour encrypter les pseudonymes et créer les token
export const SALT_ROUNDS = 10;
export const JWT_SECRET = 'm.3](=,;DV(J"vH@[:hRUEs@3,]?Gj>]'; // chaîne aléatoire de caractères qui sert de secret pour l'encryption
export const JWT_EXPIRES_IN = '5h'; // token expire après 5h
export const ALGORITHM = 'HS256'; // nom de l'algorithme utilisé pour encrypter
export const MAX_REPLAYS_PER_USER = 5; // nombre de replays maximum par utilisateur
