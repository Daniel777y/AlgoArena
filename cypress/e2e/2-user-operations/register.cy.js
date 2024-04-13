describe("User Registration Tests", () => {
  it("should allow a new user to register and navigate to index page", () => {
    cy.visit("http://localhost:3000/settings");

    // Type in a new email and login
    cy.get("#email").type("test@test.com");
    cy.contains("button", "Login").click();
    cy.on("window:alert", (text) => {
      expect(text).to.contains("User switched.");
    });

    // Navigate to index page
    cy.url().should("include", "/index");
    cy.get("h2").first().should("have.text", "test");
  });
});

