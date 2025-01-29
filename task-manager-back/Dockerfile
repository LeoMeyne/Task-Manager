# Étape 1 : Utiliser une image stable de Node.js
FROM node:23

# Étape 2 : Définir le dossier de travail
WORKDIR /usr/src/app

# Étape 3 : Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Étape 4 : Installer les dépendances
RUN npm install

# Étape 5 : Copier tout le code source dans le conteneur
COPY . .

# Étape 6 : Compiler le projet TypeScript en JavaScript
RUN npm run build  #

# Étape 7 : Exposer le port de l'API
EXPOSE 3000

# Étape 8 : Lancer l'application en production
CMD ["npm", "run", "start:prod"]
