describe('Facts bundle', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001/');
  });

  it('image should be visible in macbook-15', () => {
    cy.viewport('macbook-15');
    cy.get('.as-facts-header-image').should('be.visible');
  });

  it('image should not be visible in iphone-6', () => {
    cy.viewport('iphone-6');
    cy.get('.as-facts-header-image').should('not.be.visible');
  });

  it('Fact loaded on page load', () => {
    cy.intercept('GET', 'https://api.chucknorris.io/jokes/random', { fixture: 'random-fact.json' });
    cy.get('.as-facts-main-left-fact').should('have.text', 'Random Fact');
  });

  it('Get fact based on fact query', () => {
    cy.get('.as-facts-main-form-input').type('good').type('{enter}');
    cy.get('.as-facts-main-left-fact').should('contain', 'good');
  });
});
