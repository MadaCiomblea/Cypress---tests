describe("Start Ordering test", function () {
  it("Login check", function () {
    let grantType = "grant_type=client_credentials";
    let clientSecret = "#";
    let customerSiteLogin = 1 + "";
    let access_token = " ";

    let body =
      grantType +
      "&client_secret=" +
      encodeURIComponent(clientSecret) +
      "&client_id=" +
      encodeURIComponent("C721243") +
      "&customer-site-login=" +
      encodeURIComponent(customerSiteLogin);
    let headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      RestaurantId: 424 + "",
      BranchId: 520 + "",
    };
    cy.request({
      method: "POST",
      url: "http://api.nextbite.webdev.roweb.ro/oauth/token",
      body: body,
      headers: headers,
    }).then(({ body }) => {
      access_token = body;

      cy.visit(
        `http://customer.nextbite.webdev.roweb.ro/login/424/520/C721243`
      );
    });
  });

  it("Start Ordering test", function () {
    cy.get(".round-button").click();
    cy.get(".groups").contains("Menu").click();
  });

  it("Select an item", function () {
    let specialReq = "SpecialRequestTest";
    cy.contains("Shrooms Zuppa").click();
    cy.get("#special-request-input-id")
      .type(specialReq)
      .should("have.value", specialReq);

    cy.get("#mat-checkbox-1").find("input").click({ force: true });
    cy.get("#mat-checkbox-2").find("input").click({ force: true });

    cy.contains("ADD").click();
    cy.contains("View Order").click();
  });

  ///////////////////////////////////////////////

  it("Send Order", function () {
    cy.contains("Send Order").click();

    cy.request({
      method: "PUT",
      url: "http://api.nextbite.webdev.roweb.ro/api/orders/approve/14288/mobile",
      headers: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJDdXN0b21lcnMiOiJ0cnVlIiwibmFtZWlkIjoiQzcyMTI0MyIsImJyYW5jaElkIjoiNTIwIiwicmVzdGF1cmFudElkIjoiNDI0Iiwib3JkZXJJZCI6IjEzMTM0IiwiY3VzdG9tZXJWaXNpdElkIjoiMTMyNzciLCJpc3MiOiJodHRwOi8vYXBpLm5leHRiaXRlLndlYmRldi5yb3dlYi5ybyIsImF1ZCI6IjQxNGUxOTI3YTM4ODRmNjhhYmM3OWY3MjgzODM3ZmQxIiwiZXhwIjoxNjE5NDYwOTAzLCJuYmYiOjE2MTk0MjQ5MDN9.b3f2cscLt3lD81hqxxBq2PWAouSXYX2jtSWKcLrMem4`,
        RestaurantId: 424 + "",
        BranchId: 520 + "",
        "Content-Type": "application/json",
        DeviceId: "123456",
      },
    });
    cy.wait(1000);
    cy.contains("Give Tips").click();
  });

  it("Send payment and Rejected Payment", function () {
    let yourEmail = "madalina.ciomblea@roweb.ro";
    cy.wait(1000);
    cy.get("#user-email-input").type(yourEmail).should("have.value", yourEmail);
    cy.wait(1000);
    cy.get("#mat-radio-3").find("input").click({ force: true });
    cy.wait(1000);
    cy.get(".pay-button").contains("Pay").click({ force: true });
    cy.wait(1000);
    cy.get('div[class="round-button call-waiter noselect ng-star-inserted"]')
      .should("be.visible")
      .contains("Pay")
      .click({ multiple: true, force: true });

    //cy.contains('Cancel Payment').click();

    cy.request({
      method: "POST",
      url: "http://api.nextbite.webdev.roweb.ro/api/mobile/waiter/payment/confirmation",
      headers: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1laWQiOiI2NmIzOTc1NS05NzkwLTRiY2EtODFhYi1iZWZiYWU4MjI4YmYiLCJ1bmlxdWVfbmFtZSI6Im1tMTIzNEBuZXh0Yml0ZS5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL2FjY2Vzc2NvbnRyb2xzZXJ2aWNlLzIwMTAvMDcvY2xhaW1zL2lkZW50aXR5cHJvdmlkZXIiOiJBU1AuTkVUIElkZW50aXR5IiwiQXNwTmV0LklkZW50aXR5LlNlY3VyaXR5U3RhbXAiOiJkYmVjZTk4NC1jODk3LTQ2Y2YtOWJlNi02MzU5YzZkYmQ1NWIiLCJyb2xlIjoiV2FpdGVyVXNlciIsIkZURSI6IjEiLCJDdXJyZW50VXNlcklkIjoiNjZiMzk3NTUtOTc5MC00YmNhLTgxYWItYmVmYmFlODIyOGJmIiwiU2VjdXJpdHlTdGFtcCI6ImRiZWNlOTg0LWM4OTctNDZjZi05YmU2LTYzNTljNmRiZDU1YiIsImVtYWlsIjoibW0xMjM0QG5leHRiaXRlLmNvbSIsIlVzZXJGdWxsTmFtZSI6Ik1XYWl0ZXIgZWRpdCIsImlzQnJhbmNoQWRtaW4iOiJUcnVlIiwiVGFibGV0QWRtaW4iOiJ0cnVlIiwiY29tcGFueUlkIjoiMzYyIiwiaXNzIjoiaHR0cDovL2FwaS5uZXh0Yml0ZS53ZWJkZXYucm93ZWIucm8iLCJhdWQiOiI0MTRlMTkyN2EzODg0ZjY4YWJjNzlmNzI4MzgzN2ZkMSIsImV4cCI6MTYxOTQ2NTY3NSwibmJmIjoxNjE5NDI5Njc1fQ.PVBzOa3nmifGrhW1aV16TWXveMsp4RhcycHTLfJe-dQ`,
        RestaurantId: 424 + "",
        BranchId: 520 + "",
        "Content-Type": "application/json ",
        DeviceId: "C552759B-0167-4C40-B08E-DB3E2CB75808",
      },
      body: {
        CustomerVisitId: 13277,
        PaymentId: 59430,
        Remark: "",
        Status: "Rejected",
        waiterId: 1024,
      },
    });
    cy.wait(4000);
  });

  it("Send payment and Approved Payment and Order More", function () {
    //cy.wait(4000)
    cy.get('div[class="popup flex-column"]')
      .find('img[src*="close popup button.svg"]')
      .should("be.visible")
      .click();
    cy.get(".pay-button").contains("Pay").click({ force: true });
    cy.wait(1000);
    cy.get('div[class="round-button call-waiter noselect ng-star-inserted"]')
      .should("be.visible")
      .contains("Pay")
      .click({ multiple: true, force: true });

    cy.request({
      method: "POST",
      url: "http://api.nextbite.webdev.roweb.ro/api/mobile/waiter/payment/confirmation",
      headers: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1laWQiOiI2NmIzOTc1NS05NzkwLTRiY2EtODFhYi1iZWZiYWU4MjI4YmYiLCJ1bmlxdWVfbmFtZSI6Im1tMTIzNEBuZXh0Yml0ZS5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL2FjY2Vzc2NvbnRyb2xzZXJ2aWNlLzIwMTAvMDcvY2xhaW1zL2lkZW50aXR5cHJvdmlkZXIiOiJBU1AuTkVUIElkZW50aXR5IiwiQXNwTmV0LklkZW50aXR5LlNlY3VyaXR5U3RhbXAiOiJkYmVjZTk4NC1jODk3LTQ2Y2YtOWJlNi02MzU5YzZkYmQ1NWIiLCJyb2xlIjoiV2FpdGVyVXNlciIsIkZURSI6IjEiLCJDdXJyZW50VXNlcklkIjoiNjZiMzk3NTUtOTc5MC00YmNhLTgxYWItYmVmYmFlODIyOGJmIiwiU2VjdXJpdHlTdGFtcCI6ImRiZWNlOTg0LWM4OTctNDZjZi05YmU2LTYzNTljNmRiZDU1YiIsImVtYWlsIjoibW0xMjM0QG5leHRiaXRlLmNvbSIsIlVzZXJGdWxsTmFtZSI6Ik1XYWl0ZXIgZWRpdCIsImlzQnJhbmNoQWRtaW4iOiJUcnVlIiwiVGFibGV0QWRtaW4iOiJ0cnVlIiwiY29tcGFueUlkIjoiMzYyIiwiRGFzaGJvYXJkIjoidHJ1ZSIsIkRhc2hib2FyZC1GdWxsUmVhZCI6InRydWUiLCJEYXNoYm9hcmQtV3JpdGUiOiJ0cnVlIiwiRGFzaGJvYXJkLUZ1bGxXcml0ZSI6InRydWUiLCJJbmZvUGFnZSI6InRydWUiLCJJbmZvUGFnZS1GdWxsUmVhZCI6InRydWUiLCJJbmZvUGFnZS1Xcml0ZSI6InRydWUiLCJJbmZvUGFnZS1GdWxsV3JpdGUiOiJ0cnVlIiwiQnJhbmNoSW5mbyI6InRydWUiLCJCcmFuY2hJbmZvLUZ1bGxSZWFkIjoidHJ1ZSIsIkJyYW5jaEluZm8tV3JpdGUiOiJ0cnVlIiwiQnJhbmNoSW5mby1GdWxsV3JpdGUiOiJ0cnVlIiwiTWVudSI6InRydWUiLCJNZW51LUZ1bGxSZWFkIjoidHJ1ZSIsIk1lbnUtV3JpdGUiOiJ0cnVlIiwiTWVudS1GdWxsV3JpdGUiOiJ0cnVlIiwiT3JkZXJzIjoidHJ1ZSIsIk9yZGVycy1GdWxsUmVhZCI6InRydWUiLCJPcmRlcnMtV3JpdGUiOiJ0cnVlIiwiT3JkZXJzLUZ1bGxXcml0ZSI6InRydWUiLCJTZWF0aW5nQXJlYSI6InRydWUiLCJTZWF0aW5nQXJlYS1GdWxsUmVhZCI6InRydWUiLCJTZWF0aW5nQXJlYS1Xcml0ZSI6InRydWUiLCJTZWF0aW5nQXJlYS1GdWxsV3JpdGUiOiJ0cnVlIiwiQ3VzdG9tZXJzIjoidHJ1ZSIsIkN1c3RvbWVycy1GdWxsUmVhZCI6InRydWUiLCJDdXN0b21lcnMtV3JpdGUiOiJ0cnVlIiwiQ3VzdG9tZXJzLUZ1bGxXcml0ZSI6InRydWUiLCJXYWl0ZXJzIjoidHJ1ZSIsIldhaXRlcnMtRnVsbFJlYWQiOiJ0cnVlIiwiV2FpdGVycy1Xcml0ZSI6InRydWUiLCJXYWl0ZXJzLUZ1bGxXcml0ZSI6InRydWUiLCJEZXZpY2VzIjoidHJ1ZSIsIkRldmljZXMtRnVsbFJlYWQiOiJ0cnVlIiwiRGV2aWNlcy1Xcml0ZSI6InRydWUiLCJEZXZpY2VzLUZ1bGxXcml0ZSI6InRydWUiLCJXYWl0ZXIiOiJ0cnVlIiwiV2FpdGVyLUZ1bGxSZWFkIjoidHJ1ZSIsIldhaXRlci1Xcml0ZSI6InRydWUiLCJXYWl0ZXItRnVsbFdyaXRlIjoidHJ1ZSIsIkN1c3RvbWVyIjoidHJ1ZSIsIkN1c3RvbWVyLUZ1bGxSZWFkIjoidHJ1ZSIsIkN1c3RvbWVyLVdyaXRlIjoidHJ1ZSIsIkN1c3RvbWVyLUZ1bGxXcml0ZSI6InRydWUiLCJQdWJsaXNoQnV0dG9uIjoidHJ1ZSIsIlB1Ymxpc2hCdXR0b24tRnVsbFJlYWQiOiJ0cnVlIiwiUHVibGlzaEJ1dHRvbi1Xcml0ZSI6InRydWUiLCJQdWJsaXNoQnV0dG9uLUZ1bGxXcml0ZSI6InRydWUiLCJSZWNlaXZlQWNjb3VudGluZ0ludm9pY2VzIjoidHJ1ZSIsIlJlY2VpdmVBY2NvdW50aW5nSW52b2ljZXMtRnVsbFJlYWQiOiJ0cnVlIiwiUmVjZWl2ZUFjY291bnRpbmdJbnZvaWNlcy1Xcml0ZSI6InRydWUiLCJSZWNlaXZlQWNjb3VudGluZ0ludm9pY2VzLUZ1bGxXcml0ZSI6InRydWUiLCJpc3MiOiJodHRwOi8vYXBpLm5leHRiaXRlLndlYmRldi5yb3dlYi5ybyIsImF1ZCI6IjQxNGUxOTI3YTM4ODRmNjhhYmM3OWY3MjgzODM3ZmQxIiwiZXhwIjoxNjIwOTQzNDMxLCJuYmYiOjE2MjA5MDc0MzF9.hD51PQ2XPG78MMRlFpajJKS20l_3Q2OSUUUPt2spNiA`,
        RestaurantId: 424 + "",
        BranchId: 520 + "",
        "Content-Type": "application/json ; charset=utf-8 ",
        DeviceId: "C552759B-0167-4C40-B08E-DB3E2CB75808",
      },
      body: {
        PaymentId: 59431,
        Remark: "",
        Status: "Confirmed",
        CustomerVisitId: 13277,
        waiterId: 1024,
      },
    });
    cy.wait(3000);
     cy.contains("Order More").click();
   
 
  });
});
