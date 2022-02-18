Cypress.Commands.add("order_process", function () {


  cy.get(".round-button").click();

  cy.ads_manager();

  cy.get(".groups").contains("Menu").click();



  let specialReq = "SpecialRequestTest";
  cy.contains("Chicken Avo Rice").click({ multiple: true, force: true });
  cy.get("#special-request-input-id")
    .type(specialReq)
    .should("have.value", specialReq);

  // cy.get("#mat-checkbox-1").find("input").click({ force: true });
  // cy.get("#mat-checkbox-2").find("input").click({ force: true });
  // cy.get("#mat-checkbox-3").find("input").click({ force: true });

  cy.contains("ADD").click();
  cy.contains("Send Order").click();


});