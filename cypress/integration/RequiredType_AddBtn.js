describe("Extras", function () {
  it("Required extras", function () {
    cy.login_check();
    cy.wait(2000);

    cy.get(".round-button").click();
    cy.wait(3000);

    cy.get(".groups").contains("Lunch").click();
    cy.wait(3000);

    cy.contains("Chicken with mozzarella").click({ force: true });
    cy.wait(3000);
    cy.get("#dish-details-content-details > :nth-child(6) > :nth-child(1)")
      .should("contain", "Name")
      .and("contain", "Required")
      .and("not.have.text", "up");
    cy.wait(3000);
    cy.get(".dish-details > .footer > .round-button").should("not.be.enabled");
  });
});
