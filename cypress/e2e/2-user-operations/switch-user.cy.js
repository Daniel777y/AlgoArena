describe("User Switch Tests", () => {
  it("should be able to switch between different users", () => {
    // Go to "/settings" and register "test1@test.com"
    cy.visit("http://localhost:3000/settings");
    cy.get("#email").type("test1@test.com");
    cy.contains("button", "Login").click();
    cy.on("window:alert", (text) => {
      expect(text).to.equal("User switched.");
    });
    cy.url().should("include", "/index");
    cy.get("h2").first().should("have.text", "test1");

    // Go to "/settings" again and register a new user with "test2@test.com"
    cy.visit("http://localhost:3000/settings");
    cy.get("#email").clear().type("test2@test.com");
    cy.contains("button", "Login").click();
    cy.on("window:alert", (text) => {
      expect(text).to.equal("User switched.");
    });
    cy.url().should("include", "/index");
    cy.get("h2").first().should("have.text", "test2");

    // Go to "/settings" again, switch back to "test1@test.com"
    cy.visit("http://localhost:3000/settings");
    cy.get("#email").clear().type("test1@test.com");
    cy.contains("button", "Login").click();
    cy.on("window:alert", (text) => {
      expect(text).to.equal("User switched.");
    });
    cy.url().should("include", "/index");
    cy.get("h2").first().should("have.text", "test1");
  });
});

