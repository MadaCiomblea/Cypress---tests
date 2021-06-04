describe("Reorder an item", function () {
  it("login check", function () {
    //cy.visit(`http://customer.nextbite.webdev.roweb.ro/login/424/520/C996682`);
    cy.login_check();
  });

  it("reorder an enabled item", function () {
    cy.get(".round-button").click();
    cy.get(".groups").contains("Menu").click();
    cy.contains("Potato Arrosto").click();
    cy.wait(2000);
    cy.contains("ADD").click();
    cy.wait(2000);
    cy.contains("View Order").click();
    cy.wait(2000);
    cy.contains("Send Order").click();
    cy.wait(2000);
    cy.request({
      method: "PUT",
      url:
        "http://api.nextbite.webdev.roweb.ro/api/orders/approve/13139/mobile",
      headers: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1laWQiOiI2NmIzOTc1NS05NzkwLTRiY2EtODFhYi1iZWZiYWU4MjI4YmYiLCJ1bmlxdWVfbmFtZSI6Im1tMTIzNEBuZXh0Yml0ZS5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL2FjY2Vzc2NvbnRyb2xzZXJ2aWNlLzIwMTAvMDcvY2xhaW1zL2lkZW50aXR5cHJvdmlkZXIiOiJBU1AuTkVUIElkZW50aXR5IiwiQXNwTmV0LklkZW50aXR5LlNlY3VyaXR5U3RhbXAiOiJkYmVjZTk4NC1jODk3LTQ2Y2YtOWJlNi02MzU5YzZkYmQ1NWIiLCJyb2xlIjoiV2FpdGVyVXNlciIsIkZURSI6IjEiLCJDdXJyZW50VXNlcklkIjoiNjZiMzk3NTUtOTc5MC00YmNhLTgxYWItYmVmYmFlODIyOGJmIiwiU2VjdXJpdHlTdGFtcCI6ImRiZWNlOTg0LWM4OTctNDZjZi05YmU2LTYzNTljNmRiZDU1YiIsImVtYWlsIjoibW0xMjM0QG5leHRiaXRlLmNvbSIsIlVzZXJGdWxsTmFtZSI6Ik1XYWl0ZXIgZWRpdCIsImlzQnJhbmNoQWRtaW4iOiJUcnVlIiwiVGFibGV0QWRtaW4iOiJ0cnVlIiwiY29tcGFueUlkIjoiMzYyIiwiaXNzIjoiaHR0cDovL2FwaS5uZXh0Yml0ZS53ZWJkZXYucm93ZWIucm8iLCJhdWQiOiI0MTRlMTkyN2EzODg0ZjY4YWJjNzlmNzI4MzgzN2ZkMSIsImV4cCI6MTYxOTUzODY3MywibmJmIjoxNjE5NTAyNjczfQ.a486VqU2nUGi4F1tdADTiXh1KB8nxq-kv2_gUTvSsDs`,
        RestaurantId: 424 + "",
        BranchId: 520 + "",
        "Content-Type": "application/json",
        DeviceId: "123456",
      },
    });
    cy.wait(2000);

    //cy.get('div[class="reorder-div"]').should('not.be.disabled').contains('Reorder').click({force:true})
    cy.get('div[class="reorder-div"]')
      .first()
      .find('img[src*="reorder button outline.svg"]')
      .should("not.be.disabled")
      .click({ multiple: true, force: true });
    cy.wait(2000);
    cy.contains("Send Order").click();
    cy.wait(2000);
    cy.request({
      method: "PUT",
      url:
        "http://api.nextbite.webdev.roweb.ro/api/orders/approve/13139/mobile",
      headers: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1laWQiOiI2NmIzOTc1NS05NzkwLTRiY2EtODFhYi1iZWZiYWU4MjI4YmYiLCJ1bmlxdWVfbmFtZSI6Im1tMTIzNEBuZXh0Yml0ZS5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL2FjY2Vzc2NvbnRyb2xzZXJ2aWNlLzIwMTAvMDcvY2xhaW1zL2lkZW50aXR5cHJvdmlkZXIiOiJBU1AuTkVUIElkZW50aXR5IiwiQXNwTmV0LklkZW50aXR5LlNlY3VyaXR5U3RhbXAiOiJkYmVjZTk4NC1jODk3LTQ2Y2YtOWJlNi02MzU5YzZkYmQ1NWIiLCJyb2xlIjoiV2FpdGVyVXNlciIsIkZURSI6IjEiLCJDdXJyZW50VXNlcklkIjoiNjZiMzk3NTUtOTc5MC00YmNhLTgxYWItYmVmYmFlODIyOGJmIiwiU2VjdXJpdHlTdGFtcCI6ImRiZWNlOTg0LWM4OTctNDZjZi05YmU2LTYzNTljNmRiZDU1YiIsImVtYWlsIjoibW0xMjM0QG5leHRiaXRlLmNvbSIsIlVzZXJGdWxsTmFtZSI6Ik1XYWl0ZXIgZWRpdCIsImlzQnJhbmNoQWRtaW4iOiJUcnVlIiwiVGFibGV0QWRtaW4iOiJ0cnVlIiwiY29tcGFueUlkIjoiMzYyIiwiaXNzIjoiaHR0cDovL2FwaS5uZXh0Yml0ZS53ZWJkZXYucm93ZWIucm8iLCJhdWQiOiI0MTRlMTkyN2EzODg0ZjY4YWJjNzlmNzI4MzgzN2ZkMSIsImV4cCI6MTYxOTUzODY3MywibmJmIjoxNjE5NTAyNjczfQ.a486VqU2nUGi4F1tdADTiXh1KB8nxq-kv2_gUTvSsDs`,
        RestaurantId: 424 + "",
        BranchId: 520 + "",
        "Content-Type": "application/json",
        DeviceId: "123456",
      },
    });
    cy.wait(3000);
  });
  it("Order another item", function () {
    cy.get('div[class="flex-row"]')
      .first()
      .find('img[src*="back button.svg"]')
      .click({ multiple: true, force: true });
    cy.wait(3000);
    cy.get('div[class="title"]')
      .first()
      .find('img[src*="back button.svg"]')
      .click({ multiple: true, force: true });
    cy.wait(3000);

    cy.contains("A La Gamberoni").click();
    cy.contains("ADD").click();
    cy.contains("View Order").click();

    cy.contains("Send Order").click();

    cy.request({
      method: "PUT",
      url:
        "http://api.nextbite.webdev.roweb.ro/api/orders/approve/13139/mobile",
      headers: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1laWQiOiI2NmIzOTc1NS05NzkwLTRiY2EtODFhYi1iZWZiYWU4MjI4YmYiLCJ1bmlxdWVfbmFtZSI6Im1tMTIzNEBuZXh0Yml0ZS5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL2FjY2Vzc2NvbnRyb2xzZXJ2aWNlLzIwMTAvMDcvY2xhaW1zL2lkZW50aXR5cHJvdmlkZXIiOiJBU1AuTkVUIElkZW50aXR5IiwiQXNwTmV0LklkZW50aXR5LlNlY3VyaXR5U3RhbXAiOiJkYmVjZTk4NC1jODk3LTQ2Y2YtOWJlNi02MzU5YzZkYmQ1NWIiLCJyb2xlIjoiV2FpdGVyVXNlciIsIkZURSI6IjEiLCJDdXJyZW50VXNlcklkIjoiNjZiMzk3NTUtOTc5MC00YmNhLTgxYWItYmVmYmFlODIyOGJmIiwiU2VjdXJpdHlTdGFtcCI6ImRiZWNlOTg0LWM4OTctNDZjZi05YmU2LTYzNTljNmRiZDU1YiIsImVtYWlsIjoibW0xMjM0QG5leHRiaXRlLmNvbSIsIlVzZXJGdWxsTmFtZSI6Ik1XYWl0ZXIgZWRpdCIsImlzQnJhbmNoQWRtaW4iOiJUcnVlIiwiVGFibGV0QWRtaW4iOiJ0cnVlIiwiY29tcGFueUlkIjoiMzYyIiwiaXNzIjoiaHR0cDovL2FwaS5uZXh0Yml0ZS53ZWJkZXYucm93ZWIucm8iLCJhdWQiOiI0MTRlMTkyN2EzODg0ZjY4YWJjNzlmNzI4MzgzN2ZkMSIsImV4cCI6MTYxOTU0NDAwNywibmJmIjoxNjE5NTA4MDA3fQ.a3XkqT_WKY9uBbkH6SsHgcTN8b5mnfX3fuZycjxn05E`,
        RestaurantId: 424 + "",
        BranchId: 520 + "",
        "Content-Type": "application/json",
        DeviceId: "123456",
      },
    });
    cy.wait(4000);

    cy.request({
      method: "PUT",
      url:
        "http://api.nextbite.webdev.roweb.ro/api/restaurantMenu/item/2598/inventory/toggle",
      headers: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1laWQiOiI2NmIzOTc1NS05NzkwLTRiY2EtODFhYi1iZWZiYWU4MjI4YmYiLCJ1bmlxdWVfbmFtZSI6Im1tMTIzNEBuZXh0Yml0ZS5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL2FjY2Vzc2NvbnRyb2xzZXJ2aWNlLzIwMTAvMDcvY2xhaW1zL2lkZW50aXR5cHJvdmlkZXIiOiJBU1AuTkVUIElkZW50aXR5IiwiQXNwTmV0LklkZW50aXR5LlNlY3VyaXR5U3RhbXAiOiJkYmVjZTk4NC1jODk3LTQ2Y2YtOWJlNi02MzU5YzZkYmQ1NWIiLCJyb2xlIjoiV2FpdGVyVXNlciIsIkZURSI6IjEiLCJDdXJyZW50VXNlcklkIjoiNjZiMzk3NTUtOTc5MC00YmNhLTgxYWItYmVmYmFlODIyOGJmIiwiU2VjdXJpdHlTdGFtcCI6ImRiZWNlOTg0LWM4OTctNDZjZi05YmU2LTYzNTljNmRiZDU1YiIsImVtYWlsIjoibW0xMjM0QG5leHRiaXRlLmNvbSIsIlVzZXJGdWxsTmFtZSI6Ik1XYWl0ZXIgZWRpdCIsImlzQnJhbmNoQWRtaW4iOiJUcnVlIiwiVGFibGV0QWRtaW4iOiJ0cnVlIiwiY29tcGFueUlkIjoiMzYyIiwiaXNzIjoiaHR0cDovL2FwaS5uZXh0Yml0ZS53ZWJkZXYucm93ZWIucm8iLCJhdWQiOiI0MTRlMTkyN2EzODg0ZjY4YWJjNzlmNzI4MzgzN2ZkMSIsImV4cCI6MTYxOTU0NDAwNywibmJmIjoxNjE5NTA4MDA3fQ.a3XkqT_WKY9uBbkH6SsHgcTN8b5mnfX3fuZycjxn05E`,
        RestaurantId: 424 + "",
        BranchId: 520 + "",
        "Content-Type": "application/json",
        DeviceId: "123456",
      },
    });
    cy.wait(4000);
    cy.get('div[class="reorder-div"]')
      .first()
      .find('img[src*="reorder button outline.svg"]')
      //.should("not.be.disabled")
      .click({ multiple: true, force: true });
  });
});
