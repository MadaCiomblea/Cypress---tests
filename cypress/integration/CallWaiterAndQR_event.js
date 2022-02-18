describe("Call Waiter test and QR Code", function () {

    beforeEach(() => {
      cy.restoreLocalStorage();
      cy.wait(2000)
    });
  
    afterEach(() => {
      cy.saveLocalStorage();
    });
    after(() => {
      cy.clear_table_event();
    })
  
    it("Login Event", function () {
  
      cy.login_event();
      cy.saveLocalStorage()
    });
  
    it("Call Waiter_Event", function () {

        cy.get('[style="height: 100%; width: 100%; display: flex; flex-direction: column; justify-content: space-between;"] > .ng-star-inserted > div').click();
        
      cy.window().then(window => {
        var customerVisitId = window.localStorage.getItem('customerVisitId')
  
        cy.get('.rectangle-button')
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
            RestaurantId: Cypress.env("restaurantEvent") + "",
            BranchId: Cypress.env("branchEvent") + "",
            "Content-Type": "application/json",
            DeviceId: "123456",
          },
          body: {
            "": "",
          },
        });
  
      });
    });
  
  
  
    it("QR Code Event", function () {
  
      cy.window().then(window => {
        var customerCode = window.localStorage.getItem('customerCode')
        console.log(window.localStorage)
  
        cy.wait(2000)
  
  
        cy.get('[style="height: fit-content; margin-left: 2em;"] > img')
          .should("be.visible")
          .click({ multiple: true, force: true });
  
  
  
        let urlQR = `${Cypress.env("baseUrl")}/login/${Cypress.env("restaurantEvent")}/${Cypress.env("branchEvent")}/${customerCode}`;
  
        cy.get('[style="height: fit-content; margin-left: 2em;"] > img')
          .get("qrcode")
          .then((elem) => {
            let url = elem[0].title;
            expect(url).equal(urlQR);
          });
      });
    });
  
  });
  
  