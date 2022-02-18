
Cypress.Commands.add("updateOrder", function () {
  cy.intercept(`${Cypress.env("apiUrl")}/api/orders/update/mobile`).as('updateMobile')
  cy.get('div[class="review-order-page"]').contains("Send Order").click();
  cy.ads_manager();


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
  cy.wait(3000);
});