# Méthodologie

## Communication

-   Prioriser Jira pour conserver une trace des communications
-   Ajouter des commentaires et des questions directement dans le billet Jira
-   Ajouter des billets Jira pour les bogues
-   Pour les bogues, ajouter comment se rendre au problème (vidéo/photo/étapes quand possible) dans le billet Jira
-   Utiliser Discord pour les communications à l’interne informelles
-   Dans Discord, prioriser les threads pour plus de lisibilité quant aux différentes conversations

## Feuilles de temps

-   Arrondir les feuilles de temps au 15 minutes

# Séparation du travail

-   Compléter chaque fonctionnalité/billet en entier (léger/lourd/serveur)
-   Ouvrir une merge request par fonctionnalité

# Séparation des revues

-   Effectuer deux revues profondes (donc par deux personnes) des changements

# Nommage

## Branche

Nommer la branche:  
 `${feature ou hotfix}/${numero du billet}-${description-du-feature}`

## Merge request

Nommer la merge request:  
 `${feature ou hotfix}/${numero du billet}-${description-du-feature}`

# Formatage

## TypeScript

-   Suivre le ESlint
-   Prioriser le disable sur une ligne plutôt que sur un fichier
-   Mettre des commentaires quand on disable le ESLint

## Dart

-   Suivre Prettier

# Constantes

-   Créer une variable pour une constante de domaine dans le dossier ‘constants’
-   Choisir entre hardcoder ou créer une variables pour une constante utile aux librairies externes ou pour un chemin (à la discrétion du développeur)

## Constantes de tests

-   Créer une variable pour une constante si elle est écrit plus que 3 fois dans le même fichier

# Review

-   Prioriser les suggestions
-   Inclure le nom du fichier et le numéro de la ligne dans les commentaires

## Commentaire

Créer un commentaire pour:

-   Fautes de fonctions/variables
-   Constantes ne suivent pas les règles ci-haut

## Thread

Créer un thread pour:

-   Fautes d’orthographe dans les textes qui seront vus par les usagers
-   Ce qui n'est pas inclus dans la section commentaire

# Langue

-   Coder en anglais
-   Rédiger les commentaires en français ou en anglais

# Test unitaire

-   Ne pas tester les composants d’interface
-   Couvrir au minimun 70% des branches pour le serveur
-   Couvrir au minimum 70% des des branches pour les services ou blocs des clients
-   Viser une couverture à 80%

# Test d’intégration

-   Vérifier si les cas d'utilisation fonctionnent (sunshine path)

# Autres bonnes pratiques

-   Corriger les fautes d'orthographe dès qu'on les remarque
