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
7. Lancez le serveur backend à la racine du backend :
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
3. Lancez l'application frontend (la toute première fois que vous lancerez, un package supplémentaire va sûrement se télécharger et cela risque de prendre du temps, donc patientez un peu) :
    ```bash
    npm run dev
    ```

## Utilisation

- Accédez à l'application frontend dans votre navigateur à l'adresse [http://localhost:3000](http://localhost:3000).

## API

- Il n'y a malheureusement pas de doc pour l'API, mais vous pouvez tout de même retrouver tous les détails dans backend/app/routes.
- L'API est accesible, une fois l'application backend lancée, sur la base de l'adresse [http://localhost:8080](http://localhost:8080).

L'application frontend nécessite que le backend soit actif pour fonctionner correctement (notamment pour les requêtes avec l'API), donc pensez bien à d'abord lancer le serveur backend avant de lancer le serveur frontend.
