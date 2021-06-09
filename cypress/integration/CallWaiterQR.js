describe("Call Waiter test", function () {
  it("Login check", function () {
    
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
      url: "http://api.nextbite.webdev.roweb.ro/api/mobile/waiter/removewaiternotification/14668",
      headers: {
        Authorization: Cypress.env("waiter_token"),
        RestaurantId: Cypress.env("restaurantID") + "",
        BranchId: Cypress.env("branchID") + "",
        "Content-Type": "application/json",
        DeviceId: "123456",
      },
      body: {
        "": "",
      },
    });
  });

  it("QR Code", function () {
    let urlQR = `http://customer.nextbite.webdev.roweb.ro/login/424/520/${Cypress.env("customerCode")}`;
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
