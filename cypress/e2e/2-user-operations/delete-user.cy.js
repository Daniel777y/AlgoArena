describe("User Deletion Tests", () => {
  it("should be able to delete user", () => {
    // Register test1@test.com
    cy.visit("http://localhost:3000/settings");
    cy.get("#email").type("test1@test.com");
    cy.contains("button", "Login").click();
    cy.on("window:alert", () => true);
    cy.url().should("include", "/index");

    // Register test2@test.com
    cy.visit("http://localhost:3000/settings");
    cy.get("#email").clear().type("test2@test.com");
    cy.contains("button", "Login").click();
    cy.on("window:alert", () => true);
    cy.url().should("include", "/index");

    // Check both users are in All Users
    cy.visit("http://localhost:3000/settings");
    cy.get("#all-users").find("li").should("contain", "test1@test.com").and("contain", "test2@test.com");

    // Delete test1
    cy.get("#all-users").find("li").contains("test1@test.com").find("span").click();
    cy.on("window:confirm", (text) => {
      expect(text).to.equal("Are you sure to delete this user?");
      return true;
    });
    cy.on("window:alert", () => true);

    // Check test1 is deleted
    cy.get("#all-users").find("li").should("not.contain", "test1@test.com");
  });
});

