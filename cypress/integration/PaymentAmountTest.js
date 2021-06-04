describe("Start Ordering test", function () {
  it("Login check", function () {
    cy.login_check();
  });

  it("Start Ordering test", function () {
    cy.get(".round-button").click();
    cy.get(".groups").contains("Lunch").click();
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
    cy.get('div[class="review-order-page"]').contains("Send Order").click();

    cy.request({
      method: "PUT",
      url: "http://api.nextbite.webdev.roweb.ro/api/orders/approve/14401/mobile",
      headers: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1laWQiOiIzYmQ2NzM1ZC1lMTg2LTRmY2QtYWMzMi1iYzVkZDc4ZGZkYmUiLCJ1bmlxdWVfbmFtZSI6Im1hZGFsaW5hLmNpb21ibGVhQHJvd2ViLnJvIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS9hY2Nlc3Njb250cm9sc2VydmljZS8yMDEwLzA3L2NsYWltcy9pZGVudGl0eXByb3ZpZGVyIjoiQVNQLk5FVCBJZGVudGl0eSIsIkFzcE5ldC5JZGVudGl0eS5TZWN1cml0eVN0YW1wIjoiMzYzOWU5MDYtZjEyYS00MWE5LWJhMTQtYzMxYWVjNmI2YWE5Iiwicm9sZSI6IldhaXRlclVzZXIiLCJGVEUiOiIxIiwiQ3VycmVudFVzZXJJZCI6IjNiZDY3MzVkLWUxODYtNGZjZC1hYzMyLWJjNWRkNzhkZmRiZSIsIlNlY3VyaXR5U3RhbXAiOiIzNjM5ZTkwNi1mMTJhLTQxYTktYmExNC1jMzFhZWM2YjZhYTkiLCJlbWFpbCI6Im1hZGFsaW5hLmNpb21ibGVhQHJvd2ViLnJvIiwiVXNlckZ1bGxOYW1lIjoiV2FpdGVyMk0gRWRpdCIsImlzQnJhbmNoQWRtaW4iOiJUcnVlIiwiVGFibGV0QWRtaW4iOiJ0cnVlIiwiY29tcGFueUlkIjoiMzYyIiwiaXNzIjoiaHR0cDovL2FwaS5uZXh0Yml0ZS53ZWJkZXYucm93ZWIucm8iLCJhdWQiOiI0MTRlMTkyN2EzODg0ZjY4YWJjNzlmNzI4MzgzN2ZkMSIsImV4cCI6MTYyMjIyMzM5NSwibmJmIjoxNjIyMTg3Mzk1fQ.Mt6Y59YnZc6O3CWa7xlgsTwnG718QwqQmxN7wMGbmvU`,
        RestaurantId: 424 + "",
        BranchId: 520 + "",
        "Content-Type": "application/json",
        DeviceId: "123456",
      },
    });
    cy.wait(1000);
  });
  it("Send payment and Rejected Payment", function () {
    cy.get("#mat-radio-3").find("input").click({ force: true });
    cy.wait(1000);

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
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1laWQiOiIzYmQ2NzM1ZC1lMTg2LTRmY2QtYWMzMi1iYzVkZDc4ZGZkYmUiLCJ1bmlxdWVfbmFtZSI6Im1hZGFsaW5hLmNpb21ibGVhQHJvd2ViLnJvIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS9hY2Nlc3Njb250cm9sc2VydmljZS8yMDEwLzA3L2NsYWltcy9pZGVudGl0eXByb3ZpZGVyIjoiQVNQLk5FVCBJZGVudGl0eSIsIkFzcE5ldC5JZGVudGl0eS5TZWN1cml0eVN0YW1wIjoiMzYzOWU5MDYtZjEyYS00MWE5LWJhMTQtYzMxYWVjNmI2YWE5Iiwicm9sZSI6IldhaXRlclVzZXIiLCJGVEUiOiIxIiwiQ3VycmVudFVzZXJJZCI6IjNiZDY3MzVkLWUxODYtNGZjZC1hYzMyLWJjNWRkNzhkZmRiZSIsIlNlY3VyaXR5U3RhbXAiOiIzNjM5ZTkwNi1mMTJhLTQxYTktYmExNC1jMzFhZWM2YjZhYTkiLCJlbWFpbCI6Im1hZGFsaW5hLmNpb21ibGVhQHJvd2ViLnJvIiwiVXNlckZ1bGxOYW1lIjoiV2FpdGVyMk0gRWRpdCIsImlzQnJhbmNoQWRtaW4iOiJUcnVlIiwiVGFibGV0QWRtaW4iOiJ0cnVlIiwiY29tcGFueUlkIjoiMzYyIiwiaXNzIjoiaHR0cDovL2FwaS5uZXh0Yml0ZS53ZWJkZXYucm93ZWIucm8iLCJhdWQiOiI0MTRlMTkyN2EzODg0ZjY4YWJjNzlmNzI4MzgzN2ZkMSIsImV4cCI6MTYyMjIzMDU2NSwibmJmIjoxNjIyMTk0NTY1fQ.0vxwWEz1i_BfwXBr_EqK3l8QRuDARnRNZvQ6pJUlNxc`,
        RestaurantId: 424 + "",
        BranchId: 520 + "",
        "Content-Type": "application/json ",
        DeviceId: "C552759B-0167-4C40-B08E-DB3E2CB75808",
      },
      body: {
        CustomerVisitId: 14544,
        PaymentId: 59432,
        Remark: "",
        Status: "Confirmed",
        waiterId: 1025,
      },
    });
    cy.wait(4000);

    cy.get(":nth-child(2) > .right-column").then(($amountValue) => {
      const amountValue = $amountValue.text().toString().trim();
      const amountNumber = parseFloat(
        amountValue.substring(0, amountValue.indexOf(" KD"))
      );
      cy.log(amountValue);
      cy.log(parseFloat(amountValue.substring(0, amountValue.indexOf(" KD"))));

      cy.get(":nth-child(2) > .right-column").should(
        "have.text",
        `\n            ${amountValue}\n          `
      );
    });
  });
});
