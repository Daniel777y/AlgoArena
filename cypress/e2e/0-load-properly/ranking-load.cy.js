describe("Ranking List Page Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/ranking");
  });

  it("should have a title 'Ranking List'", () => {
    cy.get("h1").should("have.text", "Ranking List");
  });
  it("should have a list", () => {
    cy.get("ul").should("exist");
  });
  it("should not have any <span> in <li> with 'NaN'", () => {
    cy.get("ul li span").each(($span) => {
      expect($span.text().trim()).not.to.equal("NaN");
    });
  });
});
