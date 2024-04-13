describe("Add and Delete Account Tests", () => {
  it("should be able to add and delete accounts", () => {
    cy.visit("http://localhost:3000/settings");

    // Add an account
    cy.get("#handle").type("C0ldSmi1e");
    cy.contains("button", "Add Account").click();
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Account added successfully.");
    });
    cy.get("#all-accounts").should("contain", "C0ldSmi1e");

    // Delete the account
    cy.get("#all-accounts").find("li").contains("C0ldSmi1e").find("span").click();
    cy.on("window:confirm", (str) => {
      expect(str).to.equal("Are you sure you want to delete this account?");
      return true;
    });
    cy.get("#all-accounts").should("not.contain", "C0ldSmi1e");
  });
});

