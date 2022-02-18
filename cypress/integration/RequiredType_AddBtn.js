describe("Required extras - the Add button should be disabled", function () {

  after(() => {
    cy.clear_table();
  })

  it("Required extras", function () {
    cy.login_check();
    cy.wait(2000);

    cy.get(".round-button").click();
    cy.wait(3000);
    cy.ads_manager();
    cy.get(".groups").contains("Menu").click();
    cy.wait(3000);

    cy.contains("Rocket Salad").click({ force: true });
    cy.wait(3000);
    cy.get("#dish-details-content-details > :nth-child(6) > :nth-child(1)")
      .should("contain", "choose")
      .and("contain", "Required")
      .and("not.have.text", "up");
    cy.wait(3000);
    cy.get(".dish-details > .footer > .round-button").should("not.be.enabled");
  });
});
