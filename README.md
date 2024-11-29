# Efrei_API_REST_Project_G2


Groupe N°2 composé de Loris Navarro, Samuel Charton et Gaëtan Maire

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

5. Accédez à l'API à l'adresse : `http://localhost:5000`.

---

## Documentation API

La documentation de l'API est disponible via Swagger à l'adresse suivante :
- **Swagger UI** : `http://<SERVER_URL>/api-docs`

### Endpoints principaux

#### **Utilisateurs**
- **POST** `/api/users/register` : Inscription d'un utilisateur.
- **POST** `/api/users/login` : Connexion et obtention d'un token JWT.

#### **CVs**
- **GET** `/api/cvs` : Liste publique des CVs visibles.
- **POST** `/api/cvs` : Création d'un CV (authentifié).
- **PUT** `/api/cvs/:id` : Modification d'un CV (authentifié, propriétaire).
- **DELETE** `/api/cvs/:id` : Suppression d'un CV (authentifié, propriétaire).

#### **Recommandations**
- **POST** `/api/recommendations/:cvId` : Ajout d'une recommandation sur un CV.
- **GET** `/api/recommendations/:cvId` : Récupération des recommandations pour un CV.