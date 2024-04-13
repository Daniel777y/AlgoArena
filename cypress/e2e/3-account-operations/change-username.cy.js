describe("Username Update Tests", () => {
  it("should update the user's username", () => {
    // Go to "/index" and record the current username
    cy.visit("http://localhost:3000/index");
    let curName = "";
    cy.get("h2").first().invoke("text").then((text) => {
      curName = text;
    });

    // Go to "/settings" and update the username
    cy.visit("http://localhost:3000/settings");
    cy.get("#username").clear().type("newUsername"); // Type a new name in the username input
    cy.contains("button", "Update Username").click();
    cy.on("window:alert", () => true);
    cy.url().should("include", "/index");

    cy.get("h2").first().should((h2) => {
      expect(h2.text()).to.not.equal(curName);
      expect(h2.text()).to.equal("newUsername");
    });
  });
});

