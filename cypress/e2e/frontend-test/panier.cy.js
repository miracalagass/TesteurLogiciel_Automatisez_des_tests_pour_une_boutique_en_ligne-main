describe('Panier Tests', () => {
    before(() => {
      cy.visit('http://localhost:8080/#/');
      cy.get('[data-cy="nav-link-login"]').click();
      cy.get('#username').type('test2@test.fr');
      cy.get('#password').type('testtest');
      cy.get('[data-cy="login-submit"]').click();
    });
  
    it("Accéder à la page du produit et vérifiez les informations relatives au stock.", () => {
        cy.get('[data-cy="product-home-link"]').first().click();
        cy.url().should('include', '/product');
        cy.get('[data-cy="detail-product-stock"]').should('be.visible');
        cy.get('[data-cy="detail-product-stock"]').invoke('text').then((text) => {
            const stock = parseInt(text);
            expect(stock).to.be.greaterThan(1); 
         });
        cy.get('[data-cy="detail-product-add"]').click(); 
        cy.url().should('include', '/cart');
        cy.go('back');
        cy.wait(1000)
        cy.get('[data-cy="detail-product-stock"]').invoke('text').then((text) => {
            const stock = parseInt(text);
            expect(stock).to.be.greaterThan(0);
        });
    });
  
    it.only("Ajouter au panier contrôle avec nombre négatif ou grand nombre", () => {
        cy.get('[data-cy="product-home-link"]').first().click();
      cy.get('[data-cy="detail-product-quantity"]').clear().type('-5');
      cy.get('[data-cy="detail-product-add"]').click();      
      cy.url().should('not.include', '/cart');
  
      cy.get('[data-cy="detail-product-quantity"]').clear().type('25');
      cy.get('[data-cy="detail-product-add"]').click();
      cy.get('.cart-section').should('be.visible');
      cy.url().should('not.include', '/cart');
    });
  });
  