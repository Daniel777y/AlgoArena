describe("Navigation Tests", () => {
  it("should navigate between pages smoothly", () => {
    cy.visit("http://localhost:3000/");
    cy.get("h2").contains("Performance").should("be.visible");

    // Go to the Ranking page
    cy.visit("http://localhost:3000/ranking");
    cy.url().should("include", "/ranking");
    cy.get("h1").contains("Ranking").should("be.visible"); // Assuming there's an <h2> with "Ranking"

    // Go back to the  page with "index" in the URL
    cy.visit("http://localhost:3000/index");
    cy.url().should("include", "/index");
    cy.get("h2").contains("Performance").should("be.visible");

    // Go to the Settings page
    cy.visit("http://localhost:3000/settings");
    cy.url().should("include", "/settings");
    cy.get("h2").contains("Account Settings").should("be.visible");

    // Go to a non-exist page
    cy.visit("http://localhost:3000/nonono", { failOnStatusCode: false });
    cy.get("h1").contains("Error Page").should("be.visible");

    // Go back to the Index page
    cy.visit("http://localhost:3000/");
    cy.get("h2").contains("Upcoming Contests").should("be.visible");
  });
});
