# SAE5

Ce projet est une application web avec une partie backend développée en Node.js + Express et MySQL + Sequelize, et une partie frontend développée en React + Next.js.

## Installation

### Backend

1. Assurez-vous d'avoir Node.js et npm installés sur votre machine. Puis ouvrez un terminal.
2. Naviguez vers le dossier `backend` :
    ```bash
    cd backend
    ```
3. Installez les dépendances en tapant simplement :
    ```bash
    npm install
    ```
4. Assurez-vous que MySQL est installé sur votre machine et qu'il est bien actif.
5. Configurez les paramètres de base de données dans le fichier `app/config/db.config.js`.
6. Créez la base de données correspondante à l'étape précédente.
7. Lancez le serveur backend à la racine du projet :
    ```bash
    node server.js
    ```

### Frontend

1. Ouvrez un nouveau terminal, sans fermer l'autre.
2. Naviguez vers le dossier `frontend` :
    ```bash
    cd frontend
    ```
2. Installez les dépendances en tapant simplement :
    ```bash
    npm install
    ```
3. Lancez l'application frontend :
    ```bash
    npm run dev
    ```

## Utilisation

- Accédez à l'application frontend dans votre navigateur à l'adresse [http://localhost:3000](http://localhost:3000).

L'application frontend nécessite que le backend soit actif pour fonctionner correctement (notamment pour les requêtes avec l'API), donc pensez bien à d'abord lancer le serveur backend avant de lancer le serveur frontend.
