describe("Contrôle des stocks et ajout de produits au panier", () => {
    let token;
  
    // Effectuer la connexion et enregistrer le token
    before(() => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:8081/login',
        headers: { 'Content-Type': 'application/json' },
        body: {
          username: 'alagasmirac@gmail.com',
          password: 'Test123!'
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        token = response.body.token;
      });
    });
  
    // Test de contrôle du stock
    it("Vérifier les informations sur les stocks", () => {
      cy.request({
        method: 'GET',
        url: 'http://localhost:8081/products/3',
        headers: { Authorization: `Bearer ${token}` }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('availableStock');
        expect(response.body.availableStock).to.be.greaterThan(-1);
      });
    });
  
    // Test d'ajout de produit au panier avec un stock positif
    it('Ajouter au panier un produit avec un stock positif', () => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:8081/orders',
        headers: { Authorization: `Bearer ${token}` },
        body: {
          firstname: 'Test',
          lastname: 'User',
          address: 'Test Address',
          zipCode: '12345',
          city: 'Test City'
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('validated', true);
      });
    });
  
    it('Ajouter au panier un produit avec un stock négatif ou nul', () => {
      cy.request({
        method: 'GET',
        url: 'http://localhost:8081/products/3',
        headers: { Authorization: `Bearer ${token}` }
      }).then((response) => {
        const productId = response.body.id;
  
        if (response.body.availableStock <= 0) {
          cy.request({
            method: 'POST',
            url: 'http://localhost:8081/orders',
            headers: { Authorization: `Bearer ${token}` },
            failOnStatusCode: false,
            body: {
              firstname: 'Test',
              lastname: 'User',
              address: 'Test Address',
              zipCode: '12345',
              city: 'Test City'
            }
          }).then((res) => {
            expect(res.status).to.not.eq(200);
          });
        }
      });
    });
  });
  