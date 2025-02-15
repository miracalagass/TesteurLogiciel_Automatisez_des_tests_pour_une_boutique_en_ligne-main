# README - Tests Cypress

## 1. Prérequis
Avant d'exécuter les tests, assurez-vous d'avoir :
- Node.js installé
- Cypress installé dans le projet
- Le serveur backend en cours d'exécution

### Installation de Cypress
Si Cypress n'est pas encore installé, exécutez :
```sh
npm install cypress --save-dev
```

## 2. Exécution du projet
Lancez le projet en local :
```sh
docker-compose up -d
```
Assurez-vous que le serveur est bien en marche avant d'exécuter les tests.

## 3. Exécution des tests Cypress

### Lancer l'interface graphique Cypress
```sh
npx cypress open
```
Puis, choisissez le test à exécuter.

### Exécution des tests en mode headless
```sh
npx cypress run
```

## 4. Structure des fichiers de test
Les tests sont organisés comme suit :
```
cypress/
 |-- e2e/
     |-- API-Test/
         |-- api-test.cy.js
         |-- login.cy.js
         |-- review.cy.js
         |-- stok.cy.js
     |-- frontend-test/
         |-- connexion.cy.js
         |-- panier.cy.js
     |-- smoke-test/
         |-- smoke-test.cy.js
```
- **API-Test/** : Contient les tests API (login, produits, panier, etc.)
- **frontend-test/** : Tests de l'interface utilisateur
- **smoke-test/** : Tests essentiels pour valider le fonctionnement basique du projet

## 5. Génération du rapport de test
Pour générer un rapport de test avec Cypress, exécutez :
```sh
npx cypress run --reporter junit
```
Les rapports seront disponibles dans le dossier `cypress/results/`.

## 6. Publication des scripts sur GitHub
Ajoutez les fichiers et publiez sur GitHub :
```sh
git add .
git commit -m "Ajout des tests Cypress"
git push origin main
```

## 7. Remplir la section "Confiance" du rapport de testing
- Assurez-vous que tous les tests nécessaires ont été exécutés et validés.
- Décrivez les anomalies et les problèmes rencontrés si applicable.
- Vérifiez que le rapport de test est complet avant validation finale.

## 8. Points de vigilance
- S'il y a des anomalies, décrivez-les en détail.
- Assurez-vous que le repo GitHub est **public** pour que le mentor puisse y accéder.
- Rédigez un README clair et structurant bien les différentes sections.

---
**Projet de test automatisé avec Cypress**

