/// <reference types="cypress">

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
    url: "http://api.nextbite.webdev.roweb.ro/api/mobile/waiter/visit/new",
    headers: {
      Authorization: Cypress.env("waiter_token"),
      "Content-Type": "application/json",
      BranchId: "520",
      RestaurantId: "424",
      systemHealthMonitor: "[]",
      deviceId: "976E24CE-C935-4E64-A445-E5AA8A8D5FB0",
      device_name: "iPad Pro (9.7-inch)",
      app_version: "1.410",
      ip_address: "192.168.85.74",
      battery_level: 0,
    },
    body: {
      name: "Mada",
      partySize: 3,
      mobile: "123456789",
      tableIds: [2482],
      specialRequest: "Special_Request_Test",
      employeeId: 1022,
    },
  }).then((id)=>{
    console.log(id.body.orderId)

    cy.wait(2000)
    cy.request({
      method: "GET",
      url: `https://local-test-eth35w.firebaseio.com/viewStore/424/520/orders/${id.body.orderId}/scalars.json`,
      
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
      cy.intercept('http://api.nextbite.webdev.roweb.ro/oauth/token').as('oauth')
     
      cy.request({
        method: "POST",
        url: "http://api.nextbite.webdev.roweb.ro/oauth/token",
        body: body,
        headers: headers,
      }).then(({ body }) => {
        access_token = body;

      
        cy.visit(
          `http://customer.nextbite.webdev.roweb.ro/login/424/520/${customerCode.body.connectionCode}`
        );
      });
      cy.wait('@oauth').its('response.statusCode').should('eq', 200)
  })
});
});

