describe('Index Page Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/index');
  });

  it('checks for the presence of section titles and a canvas', () => {
    cy.get('h2').eq(0).should('exist');
    cy.get('h2').eq(1).should('have.text', 'Performance');
    cy.get('h2').eq(2).should('have.text', 'Upcoming Contests');
    cy.get('canvas').should('be.visible');
  });
});

