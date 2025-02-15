let token; // Token'ı global bir değişkende saklayacağız

describe('API Tests with Authorization', () => {

  // Test d'accès au panier sans connexion utilisateur
  it("Si vous tentez d'accéder au panier sans vous connecter, vous obtiendrez 401", () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:8081/orders',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });

  // Effectuer la connexion automatiquement et enregistrer le token
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

  // Test de listing des produits dans le panier
  it("Les produits du panier doivent être listés correctement", () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:8081/orders',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('orderLines');
      expect(response.body.orderLines).to.be.an('array');
      
      const firstProduct = response.body.orderLines[0].product;
      expect(firstProduct).to.have.property('id');
      expect(firstProduct).to.have.property('name');
      expect(firstProduct).to.have.property('description');
      expect(firstProduct).to.have.property('price');
      expect(firstProduct).to.have.property('picture');
    });
  });

  // Test de récupération des détails du produit
  it("Les détails d'un produit existant doivent être photographiés correctement", () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:8081/orders',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      const productId = response.body.orderLines[0].product.id;
      cy.log('Seçilen Ürün ID:', productId);

      cy.request({
        method: 'GET',
        url: `http://localhost:8081/products/${productId}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property('id', productId);
        expect(res.body).to.have.property('name');
        expect(res.body).to.have.property('price');
        expect(res.body).to.have.property('description');
      });
    });
  });
});
