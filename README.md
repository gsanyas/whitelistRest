# whitelistRest

## Requirement

npm

Serveur MariaDB

## Getting started

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

Créer un fichier appelé `.env` avec toutes les variables d'environnement nécessaires. Par exemple:

```text
RECAPTCHA_TOKEN=<clé secrète de recaptcha>
```

### Configuration

Voir fichier `config.json`

### Lancement du serveur

`npm start`

### Utilisation

Endpoints définis dans ./server.js
