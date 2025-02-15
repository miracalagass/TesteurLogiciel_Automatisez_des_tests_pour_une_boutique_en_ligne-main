describe('POST /reviews API Tests', () => {
    let token;
  
    // Effectuer la connexion et enregistrer le token
    before(() => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:8081/login',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          username: 'alagasmirac@gmail.com',
          password: 'Test123!',
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        token = response.body.token;
      });
    });
  
    it("Ajout d'une révision réussie", () => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:8081/reviews',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: {
          title: 'Excellent produit !',
          comment: "J'aime beaucoup ce produit, je le recommande à tout le monde.",
          rating: 5,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  
    it("Ajout d'un avis avec un champ de titre manquant", () => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:8081/reviews',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: {
          comment: 'Le commentaire est complet, mais le titre est absent.',
          rating: 4,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
      });
    });
  
    it("Ajout d'un avis avec une note invalide", () => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:8081/reviews',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: {
          title: 'KMauvais produit',
          comment: "Le produit n'est pas du tout comme je l'attendais.",
          rating: 0,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
      });
    });
  });
  