Cypress.Commands.add("rejectedPayment", function () {

  cy.get("#mat-radio-3").find("input").click({ force: true });
  cy.wait(2000);

  cy.intercept('add').as('add')

  cy.get(".pay-button").contains("Pay" || "ادفـع").click({ force: true });

  cy.get('div[class="round-button call-waiter noselect ng-star-inserted"]')
    .should("be.visible")
    .contains("Pay")
    .click({ multiple: true, force: true });


  //cy.contains('Cancel Payment').click();
  cy.wait('@add')

  cy.get('@add') // yields the same interception object
    .its('response.body')
    .then((req) => {
      cy.request({
        method: "POST",
        url: `${Cypress.env("apiUrl")}/api/mobile/waiter/payment/confirmation`,
        headers: {
          Authorization: Cypress.env("waiter_token"),
          RestaurantId: Cypress.env("restaurantID") + "",
          BranchId: Cypress.env("branchID") + "",
          "Content-Type": "application/json",
          DeviceId: "123456",
        },
        body: {
          CustomerVisitId: cy.getLocalStorage().customerVisitId,
          PaymentId: req.id,
          Remark: "",
          Status: "Rejected",
          waiterId: 1024,
        },
      });
    })

  cy.wait(4000);


});