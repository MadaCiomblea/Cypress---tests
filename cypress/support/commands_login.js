import "cypress-localstorage-commands";
import 'cypress-wait-until';

Cypress.Commands.add("login_check", function () {
  let grantType = "grant_type=client_credentials";
  let clientSecret = "#";
  let customerSiteLogin = 1 + "";
  let access_token = " ";
  cy.wait(1000)
  cy.request({
    method: "POST",
    url: `${Cypress.env("apiUrl")}/api/mobile/waiter/visit/new`,
    headers: {
      Authorization: Cypress.env("waiter_token"),
      "Content-Type": "application/json",
      BranchId: Cypress.env("branchID"),
      RestaurantId: Cypress.env("restaurantID"),
      systemHealthMonitor: "[]",
      deviceId: Cypress.env("deviceID")
    },
    body: {
      name: "Mada",
      partySize: 3,
      mobile: "123456789",
      tableIds: Cypress.env("tableIDs"),
      specialRequest: "Special_Request_Test",
      employeeId: 1333,
    },
  }).then((id) => {
    console.log(id.body.orderId)

    cy.wait(2000)
    cy.request({
      method: "GET",
      url: `${Cypress.env("firebaseUrl")}/viewStore/${Cypress.env("restaurantID")}/${Cypress.env("branchID")}/orders/${id.body.orderId}/scalars.json`,

    }).then((customerCode) => {
      cy.wait(3000)
      customerCode.body.connectionCode;


      let body =
        grantType +
        "&client_secret=" +
        encodeURIComponent(clientSecret) +
        "&client_id=" +
        encodeURIComponent(customerCode.body.connectionCode) +
        "&customer-site-login=" +
        encodeURIComponent(customerSiteLogin);
      let headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        RestaurantId: Cypress.env("restaurantID") + "",
        BranchId: Cypress.env("branchID") + "",
      };
      cy.intercept(`${Cypress.env("apiUrl")}/oauth/token`).as('oauth')
     
      cy.request({
        method: "POST",
        url: `${Cypress.env("apiUrl")}/oauth/token`,
        body: body,
        headers: headers,
      }).then(({ body }) => {
        access_token = body;


        cy.visit(
          `${Cypress.env("baseUrl")}/login/${Cypress.env("restaurantID")}/${Cypress.env("branchID")}/${customerCode.body.connectionCode}`
        );
      });
      cy.wait('@oauth').its('response.statusCode').should('eq', 200)
    })
  });
});