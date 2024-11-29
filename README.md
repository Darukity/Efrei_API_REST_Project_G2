# Efrei_API_REST_Project_G2


Groupe N°2 composé de Loris Navarro, Samuel Charton et Gaëtan Maire

# Branches Git
- Branche loulounav78 : gérée par Loris NAVARRO.
- Branche Samuel : gérée par Samuel CHARTON.
- Branche Gaytan : gérée par Gaëtan Maire.


## Fonctionnalités principales

- **Authentification des utilisateurs** :
    - Inscription, connexion et gestion des espaces personnels via JWT.
- **Gestion des CVs** :
    - Création, modification, suppression, et contrôle de la visibilité des CVs.
- **Consultation des CVs** :
    - Liste publique des CVs visibles avec recherche par nom/prénom.
    - Consultation détaillée des CVs visibles.
- **Recommandations** :
    - Ajout de recommandations par les utilisateurs sur les CVs des autres.
    - Gestion des recommandations reçues.
- **Espace personnel** :
    - Modification des informations personnelles.
    - Suppression des recommandations reçues.

---

## Configuration et Installation

### 1. Pré-requis
- **Node.js** : Version >= 16.x
- **MongoDB** : Une base de données MongoDB (locale ou en ligne).
- **npm**

### 2. Installation

1. Clonez le repository du projet :
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Configurez le fichier `.env` :
    - Créez un fichier `.env` à la racine du projet avec les variables suivantes :

      **Fichier `.env` exemple** :
      ```env
      DATABASE_URL=<SERVER_URL>
      JWT_SECRET=secret_key
      ```

    - Variables optionnelles :
      ```env
      SERVER_URL=<SWAGGER_SERVER_URL>
      ```

4. Lancez le serveur de développement :
   ```bash
   npm start
   ```

5. Accédez à l'API à l'adresse : `http://localhost:3000`.

---

## Documentation API

La documentation de l'API est disponible via Swagger à l'adresse suivante :
- **Swagger UI** : `http://<SERVER_URL>/api-docs`

### Endpoints principaux


# Documentation API

Cette documentation décrit les principaux endpoints de l'API pour l'authentification, la gestion des utilisateurs, des CVs et des recommandations.

---

## **Authentification**
- **POST** `/api/auth/register` : Inscription d'un utilisateur.
    - Permet de créer un nouveau compte utilisateur.
    - **Exemple d'entrée :**
      ```json
      {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "password": "P@ssw0rd123"
      }
      ```
    - **Réponse attendue :**
      ```json
      {
        "success": true,
        "user": {
          "id": "670507e5a85e8b4542098ab9",
          "name": "John Doe",
          "email": "john.doe@example.com"
        }
      }
      ```

- **POST** `/api/auth/login` : Connexion et obtention d'un token JWT.
    - **Exemple d'entrée :**
      ```json
      {
        "email": "john.doe@example.com",
        "password": "P@ssw0rd123"
      }
      ```
    - **Réponse attendue :**
      ```json
      {
        "message": "Successfully logged in.",
        "user": {
          "name": "John Doe",
          "email": "john.doe@example.com",
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        }
      }
      ```

- **POST** `/api/auth/logout` : Déconnexion de l'utilisateur.

---

## **Gestion des utilisateurs**
- **POST** `/api/user/me` : Récupération des informations de l'utilisateur connecté.
    - Nécessite un token JWT valide dans l'en-tête.
    - **Réponse attendue :**
      ```json
      {
        "id": "670507e5a85e8b4542098ab9",
        "name": "John Doe",
        "email": "john.doe@example.com"
      }
      ```

- **PUT** `/api/user/{id}` : Mise à jour des informations utilisateur.
    - Modifie le nom, l'email ou le mot de passe.
    - **Exemple d'entrée :**
      ```json
      {
        "name": "Jane Doe",
        "email": "jane.doe@example.com",
        "password": "NewP@ssword123"
      }
      ```

- **DELETE** `/api/user/{id}` : Suppression d'un utilisateur.

---

## **Gestion des CVs**
- **GET** `/api/cv/` : Liste de tous les CVs.
- **GET** `/api/cv/getAllVisible` : Liste des CVs publics.
- **GET** `/api/cv/{id}` : Détails d’un CV spécifique.
- **POST** `/api/cv/` : Création d'un CV (authentifié).
    - **Exemple d'entrée :**
      ```json
      {
        "userId": "670507e5a85e8b4542098ab9",
        "personalInfo": {
          "firstName": "John",
          "lastName": "Doe",
          "description": "Full-stack developer."
        },
        "education": [
          {
            "degree": "Bachelor of Science",
            "institution": "MIT",
            "year": 2020
          }
        ],
        "experience": [
          {
            "jobTitle": "Software Engineer",
            "company": "TechCorp",
            "years": 3
          }
        ],
        "isVisible": true
      }
      ```

- **PUT** `/api/cv/{id}` : Modification d’un CV (authentifié, propriétaire).
- **DELETE** `/api/cv/{id}` : Suppression d’un CV (authentifié, propriétaire).
- **PATCH** `/api/cv/{id}/visibility` : Modification de la visibilité d’un CV.

---

## **Gestion des recommandations**
- **POST** `/api/review/` : Création d’une recommandation.
    - **Exemple d'entrée :**
      ```json
      {
        "cvId": "670507e5a85e8b4542098ab9",
        "userId": "570102e5a85e8b4542098bc9",
        "comment": "Great developer!"
      }
      ```

- **GET** `/api/review/cv/{cvId}` : Récupération des recommandations d’un CV.
- **GET** `/api/review/user/{userId}` : Récupération des recommandations laissées par un utilisateur.
- **GET** `/api/review/{id}` : Détails d’une recommandation spécifique.
- **PUT** `/api/review/{id}` : Modification d’une recommandation.
- **DELETE** `/api/review/{id}` : Suppression d’une recommandation.