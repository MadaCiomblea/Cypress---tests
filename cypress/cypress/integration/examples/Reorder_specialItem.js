describe("Reorder a special item", function () {
  it("Reorder a special item - disable special request input", function () {
    cy.login_check();
    cy.wait(2000);

    cy.get(".round-button").click();
    cy.wait(2000);

    cy.get(".groups").contains("Lunch").click();
    cy.wait(2000);
    cy.contains("View Order").should("be.visible").click({ force: true });
    cy.contains("Pay").should("be.visible").click({ force: true });

    cy.get('div[class="reorder-div"]')
      .first()
      .find('img[src*="reorder button outline.svg"]')
      .should("not.be.disabled")
      .click({ multiple: true, force: true });

    cy.wait(3000);

    cy.contains("SpecialItem").click({ force: true });
    cy.wait(3000);
    cy.get("#special-request-input-id")
      .should("not.have.focus")
      .log("The special item can not have special request!!!");
    cy.wait(2000);
  });
});
