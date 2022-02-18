describe("Call Waiter test and QR Code", function () {

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.wait(2000)
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });
  after(() => {
    cy.clear_table();
  })

  it("Login check", function () {

    cy.login_check();
    cy.saveLocalStorage()
  });

  it("Call Waiter", function () {
    cy.get(".round-button").click();

    cy.ads_manager();

    cy.get(".groups").contains("Menu").click();
    cy.window().then(window => {
      var customerVisitId = window.localStorage.getItem('customerVisitId')

      cy.get('.call-waiter')
        .should("be.visible")
        .contains("Call Waiter")
        .click({ multiple: true, force: true });


      //  console.log(orderId)
      cy.wait(2000)
      cy.request({
        method: "POST",
        url: `${Cypress.env("apiUrl")}/api/mobile/waiter/removewaiternotification/${customerVisitId}`,

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
  });



  it("QR Code", function () {

    cy.window().then(window => {
      var customerCode = window.localStorage.getItem('customerCode')
      console.log(window.localStorage)

      cy.wait(2000)


      cy.get('div[class="round-button noselect"]')
        .should("be.visible")
        .contains("Show QR")
        .click({ multiple: true, force: true });



      let urlQR = `${Cypress.env("baseUrl")}/login/${Cypress.env("restaurantID")}/${Cypress.env("branchID")}/${customerCode}`;

      cy.get('div[class="qr-container"]')
        .get("qrcode")
        .then((elem) => {
          let url = elem[0].title;
          expect(url).equal(urlQR);
        });
    });
  });

});

