describe("Settings Page Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/settings");
  });

  it("should display four <h2> titles", () => {
    cy.get("h2").contains("Account Settings").should("be.visible");
    cy.get("h2").contains("Linked Accounts").should("be.visible");
    cy.get("h2").contains("Switch User").should("be.visible");
    cy.get("h2").contains("All Users").should("be.visible");
  });
});

