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

### Configuration

Port d'accès au serveur : constante `port` (valeur par défaut: 8000) dans ./server.js

Adresse du Front-end : constante `origin` dans ./server.js

Base de données : dans ./Model.js

### Lancement du serveur

`npm start`

### Utilisation

Endpoints définis dans ./server.js
