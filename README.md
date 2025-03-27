# Test technique NestJS

## Présentation générale

Le sujet de base est simple : vous travaillez pour une startup spécialisée dans le suivi des activités sportives, votre mission est de créer une API qui permettra aux utilisateurs de suivre leurs sorties de courses à pied.

Une sortie de course à pied est définie comme ceci :

- Utilisateur
- Type de sortie (entraînement, course, loisirs, etc.)
- Date et heure de début
- Durée
- Distance
- Commentaire

Lors de la création ou modification d'une sortie, il faut calculer et enregistrer :

- La vitesse moyenne (en km/h, 11.1km/h par exemple, on pourra donc enregistrer "11.1")
- L’allure moyenne (en min/km, 5'24" par exemple, on pourra donc enregistrer "324")

Une API doit être sécurisée via une authentification JWT. La gestion des utilisateurs n’est pas la priorité, on peut hard-coder les credentials dans un service.

Une API doit être mise à disposition. Cette API doit être sécurisée. Par le biais de cette API, il doit être possible de :

- Lister toutes les sorties
- Lister les sorties d'un utilisateur
- Ajouter / modifier / supprimer une sortie
- Récupérer le détail d'une sortie

## Les Pré-requis

- Utiliser NestJS pour développer l'API
- Utiliser une base de données relationnelle (ex: PostgreSQL/SQLite) pour stocker les sorties
- Le temps est libre mais il est tout de même conseillé de passer moins de 4h sur le sujet (temps de setup d'environnement compris)

## Libertés

- Vous êtes libre de partir “from scratch” ou d’un template d’init comme : https://github.com/CatsMiaow/nestjs-project-structure
- Vous pouvez utiliser toutes les libraires/outils qui vous semblent utiles
- Nul besoin d'intégrer un système de gestion de migration une simple requête SQL ou une synchronisation ORM (ex: typeorm schema:sync) fera l'affaire.

## Bonus

Toutes les fonctionnalités que vous aurez le temps d'ajouter seront bonnes à prendre. Soyez créatifs !!

Voici quelques idées (liste non ordonnée) :

- Fournir des tests unitaires pour les fonctionnalités principales
- Ajouter toutes les validations que vous estimerez utile (ex: Une activité ne peut pas être dans le futur, le nom ne doit pas être vide, …)
- Un utilisateur ne peut modifier/voir que ses propres activités
- Gestion des utilisateurs via api (inscription - connexion - /me - …)
- Endpoint permettant de gérer ses records

Pour le calcul du record, on admet que l'utilisateur court de manière très régulière.

Exemple : sortie de 2h pour 20km, les records de l'utilisateur pour cette sortie sont :

- temps pour 1km : 6min (120min / 20)
- temps pour 5km : 30min (120min / 4)
- temps pour 10km : 1h (120min / 2)

Reste donc à calculer les meilleurs temps pour chaque distance et chaque utilisateur.

## Critères d'Évaluation

- Qualité et lisibilité du code
- Respect des bonnes pratiques de développement
- Fonctionnalité et robustesse de l'API

## Déliverabilité

- Créez un nouveau repository github contenant votre code et partagez le à **\***
- Commitez aussi souvent que possible et commentez vos commits pour détailler votre chemin de pensée
- Votre application doit être facilement testable par nos équipes
- Mettez à jour le README pour ajouter ce que vous jugerez nécessaire de nous faire savoir
- Envoyez le lien avec le projet à **\***

Bonne chance !

## What has been done ?

- In-house authentication & authorization
- RBAC with resource ownership control (instead of CASL)
- Key pair ciphering token rotation / revokation & storage in in-memory db (with REDIS)
- Docker environment
- Swagger "Doc"
- CRUD endpoints for run sessions management
- CRUD endpoints for users management & /me endpoint
- Some validation checks

# What are the limitations ?

- Roles are not set in a db
- Access token payload contains roles as is
- There is no logger system
- Business logic is limited
- Validations checks are unsufficient
