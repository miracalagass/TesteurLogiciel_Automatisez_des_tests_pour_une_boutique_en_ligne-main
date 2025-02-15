describe('Smoke Tests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8080/#/'); 
    });
  
    it("Le bouton de connexion doit être visible et le formulaire de connexion doit s'ouvrir lorsqu'on clique dessus.", () => {
      cy.get('[data-cy="nav-link-login"]').should('be.visible').click();
      cy.get('[data-cy="login-form"]').should('be.visible'); 
    });
  
    it("Les produits de la page d'accueil doivent être affichés", () => {
      cy.get('.list-products').should('be.visible'); 
      cy.get('[data-cy="product-home"]').should('have.length.greaterThan', 0); 
    });
  
    it("Les informations sur les stocks et la description des produits doivent être affichées", () => {
        cy.get('[data-cy="product-home-link"]').first().click();
        cy.get('[data-cy="detail-product-stock"]').should('be.visible');
    });
  
    it("Le bouton « panier » devrait apparaître après la connexion", () => {
      cy.get('[data-cy="nav-link-login"]').click();
      cy.get('#username').type('test2@test.fr');
      cy.get('#password').type('testtest');
      cy.get('[data-cy="login-submit"]').click();
      cy.get('[data-cy="nav-link-cart"]').should('be.visible');
    });
  
    it("Le bouton permettant d'ajouter des produits au panier doit apparaître après la connexion.", () => {
      cy.get('[data-cy="nav-link-login"]').click();
      cy.get('#username').type('test2@test.fr');
      cy.get('#password').type('testtest');
      cy.get('[data-cy="login-submit"]').click();
  
      cy.get('[data-cy="product-home-link"]').first().click();
      cy.get('[data-cy="detail-product-add"]').should('be.visible');
    });
  });
  