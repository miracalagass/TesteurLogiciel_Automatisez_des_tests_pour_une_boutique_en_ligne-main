describe('Login API Tests', () => {
    // Test de connexion avec des informations correctes
    it('La connexion avec des informations correctes doit réussir et un token doit être retourné', () => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:8081/login',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          username: 'alagasmirac@gmail.com',
          password: 'Test123!'
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
  
        expect(response.body).to.have.property('token');
      });
    });
  
    // Test de connexion avec des informations incorrectes
    it('La connexion avec des informations incorrectes ne doit pas réussir et doit retourner un code 401', () => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:8081/login',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          username: 'wronguser@gmail.com',
          password: 'WrongPassword123!' 
        },
        failOnStatusCode: false // Empêche Cypress de considérer cela comme une erreur
      }).then((response) => {
        expect(response.status).to.eq(401);
  
        expect(response.body).to.have.property('message', 'Invalid credentials.');
      });
    });
  });
  