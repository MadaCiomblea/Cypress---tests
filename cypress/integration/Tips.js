describe("Check Tips Values", function () {

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });
  after(() => {
    cy.clear_table();
  })

  
  it("check that the values of the tips are calculated correctly", function () {
    cy.login_check();

    cy.wait(2000);

    cy.get(".round-button").click();
    cy.wait(2000);
    cy.ads_manager();
    cy.get(".groups").contains("Lunch").click();
    cy.wait(2000);
  });
  it("Select an item", function () {
    let specialReq = "SpecialRequestTest";
    cy.contains("Shrooms Zuppa").click();
    cy.get("#special-request-input-id")
      .type(specialReq)
      .should("have.value", specialReq);

    cy.get("#mat-checkbox-1").find("input").click({ force: true });
    cy.get("#mat-checkbox-2").find("input").click({ force: true });
    cy.get("#mat-checkbox-3").find("input").click({ force: true });

    cy.contains("ADD").click();
    cy.contains("Send Order").click();
  });

  ///////////////////////////////////////////////

  it("Send Order", function () {
    cy.intercept('http://api.nextbite.webdev.roweb.ro/api/orders/update/mobile').as('updateMobile')
    cy.get('div[class="review-order-page"]').contains("Send Order").click();

    cy.ads_manager();

    cy.wait('@updateMobile').its('response.statusCode').should('eq', 200)
    cy.window().then(window =>{ var orderId = window.localStorage.getItem('orderId') 

    cy.request({
      method: "PUT",
      url: `http://api.nextbite.webdev.roweb.ro/api/orders/approve/${orderId}/mobile`,
      headers: {
        Authorization: Cypress.env("waiter_token"),
        RestaurantId: Cypress.env("restaurantID") + "",
        BranchId: Cypress.env("branchID") + "",
        "Content-Type": "application/json",
        DeviceId: "123456",
      },
    });
  })
    cy.wait(1000);

    cy.get("payment-tips > .flex-row > :nth-child(1)").then(($baseValue) => {
      const baseValue = $baseValue.text().toString().trim();
      const valueNumber = parseFloat(
        baseValue.substring(0, baseValue.indexOf(" KD"))
      );
      cy.log(baseValue);
      cy.log(parseFloat(baseValue.substring(0, baseValue.indexOf(" KD"))));

      cy.get("payment-tips > .flex-row > :nth-child(2)").should(
        "have.text",
        `\n      ${valueNumber * 2} KD\n    `
      );
      cy.get("payment-tips > .flex-row > :nth-child(3)").should(
        "have.text",
        `\n      ${valueNumber * 4} KD\n    `
      );
      cy.get("payment-tips > .flex-row > :nth-child(4)").should(
        "have.text",
        `\n      ${valueNumber * 8} KD\n    `
      );
    });
  });
});
