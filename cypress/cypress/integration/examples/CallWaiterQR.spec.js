describe("Call Waiter test", function () {
  it("Login check", function () {
    //cy.visit(`http://customer.nextbite.webdev.roweb.ro/login/424/520/C996682`);
    cy.login_check();
  });

  it("Call Waiter", function () {
    cy.get(".round-button").click();
    cy.get(".groups").contains("Lunch").click();

    cy.get('.call-waiter')
      .should("be.visible")
      .contains("Call Waiter")
      .click({ multiple: true, force: true });

    cy.request({
      method: "POST",
      url: "http://api.nextbite.webdev.roweb.ro/api/mobile/waiter/removewaiternotification/14544",
      headers: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1laWQiOiIzYmQ2NzM1ZC1lMTg2LTRmY2QtYWMzMi1iYzVkZDc4ZGZkYmUiLCJ1bmlxdWVfbmFtZSI6Im1hZGFsaW5hLmNpb21ibGVhQHJvd2ViLnJvIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS9hY2Nlc3Njb250cm9sc2VydmljZS8yMDEwLzA3L2NsYWltcy9pZGVudGl0eXByb3ZpZGVyIjoiQVNQLk5FVCBJZGVudGl0eSIsIkFzcE5ldC5JZGVudGl0eS5TZWN1cml0eVN0YW1wIjoiMzYzOWU5MDYtZjEyYS00MWE5LWJhMTQtYzMxYWVjNmI2YWE5Iiwicm9sZSI6IldhaXRlclVzZXIiLCJGVEUiOiIxIiwiQ3VycmVudFVzZXJJZCI6IjNiZDY3MzVkLWUxODYtNGZjZC1hYzMyLWJjNWRkNzhkZmRiZSIsIlNlY3VyaXR5U3RhbXAiOiIzNjM5ZTkwNi1mMTJhLTQxYTktYmExNC1jMzFhZWM2YjZhYTkiLCJlbWFpbCI6Im1hZGFsaW5hLmNpb21ibGVhQHJvd2ViLnJvIiwiVXNlckZ1bGxOYW1lIjoiV2FpdGVyMk0gRWRpdCIsImlzQnJhbmNoQWRtaW4iOiJUcnVlIiwiVGFibGV0QWRtaW4iOiJ0cnVlIiwiY29tcGFueUlkIjoiMzYyIiwiaXNzIjoiaHR0cDovL2FwaS5uZXh0Yml0ZS53ZWJkZXYucm93ZWIucm8iLCJhdWQiOiI0MTRlMTkyN2EzODg0ZjY4YWJjNzlmNzI4MzgzN2ZkMSIsImV4cCI6MTYyMjIyNzc5MCwibmJmIjoxNjIyMTkxNzkwfQ.vWKsunM3YBPGnD-7OZ2E9L9dZdZql9Rcx8RNc-qyw24`,
        RestaurantId: 424 + "",
        BranchId: 520 + "",
        "Content-Type": "application/json ; charset=utf-8 ",
        DeviceId: "FEB34112-45C6-4FB5-B5DC-CB10E802F1F0",
      },
      body: {
        "": "",
      },
    });
  });

  it("QR Code", function () {
    let urlQR = `http://customer.nextbite.webdev.roweb.ro/login/424/520/C931293`;
    cy.get('div[class="round-button noselect"]')
      .should("be.visible")
      .contains("Show QR")
      .click({ multiple: true, force: true });

    cy.get('div[class="qr-container"]')
      .get("qrcode")
      .then((elem) => {
        let url = elem[0].title;
        expect(url).equal(urlQR);
      });
  });
});
