# whitelistRest

## Requirement

npm

Serveur MariaDB

## Getting started

Avant toute chose, lancer le serveur MariaDB.

### Installation des packages

```npm install```

### Création de la clé dans la racine du projet

Un fichier `private.pem` contenant un secret doit se trouver dans la racine du projet.

Pour en créer un, par exemple :

```text
> ssh-keygen
Generating public/private rsa key pair.
Enter file in which to save the key (.../.ssh/id_rsa) : private.pem
```

### Définition des variables d'environnement

Créer un fichier appelé `.env` avec toutes les variables d'environnement nécessaires.
Avec openssl tu crées une clé privée, puis tu extrais une clé publique de la clé privée, ensuite tu mets le chemin de cette clé publique dans le .env (et la clé privé, pour l'instant, doit se trouver dans la racine et s'appeler private.pem).
Par exemple:

```text
RECAPTCHA_TOKEN=<clé secrète de recaptcha>
PUBLIC_KEY_PATH=<chemin vers la clé de chiffrement>
```

### Configuration

Voir fichier `config.json`

### Lancement du serveur

`npm start`

### Utilisation

Endpoints définis dans ./server.js
