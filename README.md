# whitelistRest

## Requirement

Serveur MariaDB

## Getting started

### Installation des packages

```npm install```

### Configuration

Port d'accès au serveur : constante `port` (valeur par défaut: 8000)

Base de données : lors de la définition de la constante `sequelize` (par défault sur 'localhost')

### Lancement du serveur

`npm start`

### Test du serveur

- Créer au moins un utilisateur et un message en quarantaine associé à cet utilisateur dans la base MariaDB
- Faire une requête GET sur `http://localhost:8000/api/emails`
- Faire une autre requête sur `http://localhost:8000/api/emails/$EMAIL` avec $EMAIL l'email du message créé
