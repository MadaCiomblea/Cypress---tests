describe("Check Tips Values", function () {
  it("check that the values of the tips are calculated correctly", function () {
    cy.login_check();

    cy.wait(2000);

    cy.get(".round-button").click();
    cy.wait(2000);

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
