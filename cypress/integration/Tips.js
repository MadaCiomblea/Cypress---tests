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

    cy.wait(2000)
  
  });
  it("Start Ordering test", function () {
   

    cy.ads_manager();
      cy.order_process();
  
  });

  ///////////////////////////////////////////////

  it("Send Order", function () {
    cy.intercept(`${Cypress.env("apiUrl")}/api/orders/update/mobile`).as('updateMobile')
    cy.get('div[class="review-order-page"]').contains("Send Order").click();

 

    cy.wait('@updateMobile').its('response.statusCode').should('eq', 200)
    cy.window().then(window => {
      var orderId = window.localStorage.getItem('orderId')

      cy.request({
        method: "PUT",
        url: `${Cypress.env("apiUrl")}/api/orders/approve/${orderId}/mobile`,
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
