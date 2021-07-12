describe("Payments - Rejected and Confirmed", function () {

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });
  after(() => {
    cy.clear_table();
  })

     it("Login check", function () {
     cy.login_check();
  });

  it("Start Ordering test", function () {
    cy.get(".round-button").click();

    cy.ads_manager();


    cy.get(".groups").contains("Lunch").click();
  });

  it("Select an item", function () {
    cy.wait(3000);
    let specialReq = "SpecialRequestTest";
    cy.contains("Shrooms Zuppa").click();
    cy.wait(3000);
    cy.get("#special-request-input-id")
      .type(specialReq)
      .should("have.value", specialReq);
      cy.wait(3000);
    cy.get("#mat-checkbox-1").find("input").click({ force: true });
    cy.wait(1000);
    cy.get("#mat-checkbox-2").find("input").click({ force: true });
    cy.wait(1000);
    cy.get("#mat-checkbox-3").find("input").click({ force: true });
    cy.wait(3000);

    cy.contains("ADD").click();
    cy.contains("Send Order").click();
  });

  ///////////////////////////////////////////////

  it("Send Order", function () {

    cy.intercept('http://api.nextbite.webdev.roweb.ro/api/orders/update/mobile').as('updateMobile')
    cy.get('div[class="review-order-page"]').contains("Send Order").click();
    
    cy.ads_manager();

    cy.wait('@updateMobile').its('response.statusCode').should('eq', 200)
    cy.window().then(window =>{ var orderId = window.localStorage.getItem('orderId') 


    cy.request({
      method: "PUT",
      url: `http://api.nextbite.webdev.roweb.ro/api/orders/approve/${orderId}/mobile`,
      headers: {
        Authorization: Cypress.env("waiter_token"),
        RestaurantId: Cypress.env("restaurantID") + "",
        BranchId: Cypress.env("branchID") + "",
        "Content-Type": "application/json",
        DeviceId: "123456",
      },
    });
  })
    cy.wait(3000);
    //cy.contains("Give Tips").click();
    cy.get("payment-tips > .flex-row > :nth-child(1)").then(($baseValue) => {
      const baseValue = $baseValue.text().toString().trim();
      const valueNumber = parseFloat(
        baseValue.substring(0, baseValue.indexOf(" KD"))
    );
      cy.get("payment-tips > .flex-row > :nth-child(1)").click().should(
        "have.text",
        `\n      ${valueNumber } KD\n    `
      );
    });
    cy.wait(3000);
  });

  it("Send payment and Rejected Payment", function () {
  
    cy.get("#mat-radio-3").find("input").click({ force: true });
    cy.wait(2000);

    cy.intercept('add').as('add')

    cy.get(".pay-button").contains("Pay").click({ force: true });
  
    cy.get('div[class="round-button call-waiter noselect ng-star-inserted"]')
      .should("be.visible")
      .contains("Pay")
      .click({ multiple: true, force: true });

     
    //cy.contains('Cancel Payment').click();
    cy.wait('@add')

    cy.get('@add') // yields the same interception object
      .its('response.body')
      .then((req) => {
        cy.request({
          method: "POST",
          url: "http://api.nextbite.webdev.roweb.ro/api/mobile/waiter/payment/confirmation",
          headers: {
            Authorization: Cypress.env("waiter_token"),
            RestaurantId: Cypress.env("restaurantID") + "",
            BranchId: Cypress.env("branchID") + "",
            "Content-Type": "application/json",
            DeviceId: "123456",
          },
          body: {
            CustomerVisitId: cy.getLocalStorage().customerVisitId,
            PaymentId: req.id,
            Remark: "",
            Status: "Rejected",
            waiterId: 1024,
          },
        });
      })
 
    cy.wait(4000);


  });

  it("Send payment and Approved Payment and Order More", function () {
    //cy.wait(4000)
    cy.get('div[class="popup flex-column"]')
      .find('img[src*="close popup button.svg"]')
      .should("be.visible")
      .click();
      cy.wait(2000);
      cy.ads_manager();

    cy.get(".pay-button").contains("Pay").click({ force: true });
  
    cy.wait(2000);
    cy.intercept('add').as('add')

    cy.get('div[class="round-button call-waiter noselect ng-star-inserted"]')
      .should("be.visible")
      .contains("Pay")
      .click({ multiple: true, force: true });

     cy.wait('@add')

    cy.get('@add') // yields the same interception object
      .its('response.body')
      .then((req) => {
        cy.request({
          method: "POST",
          url: "http://api.nextbite.webdev.roweb.ro/api/mobile/waiter/payment/confirmation",
          headers: {
            Authorization: Cypress.env("waiter_token"),
            RestaurantId: Cypress.env("restaurantID") + "",
            BranchId: Cypress.env("branchID") + "",
            "Content-Type": "application/json",
            DeviceId: "123456",
          },
          body: {
            CustomerVisitId: cy.getLocalStorage().customerVisitId,
            PaymentId: req.id,
            Remark: "",
            Status: "Confirmed",
            waiterId: 1024,
          },
        });
      })
 
    cy.wait(3000);
    cy.get('div[class="popup flex-column"]')
    .find('img[src*="close popup button.svg"]')
    .should("be.visible")
    .click();
    
    cy.wait(3000);

  cy.intercept('http://api.nextbite.webdev.roweb.ro/api/mobile/waiter/selfclearandrestore').as('orderMore')
  

  cy.contains("Order More").click();

  cy.wait('@orderMore').its('response.statusCode').should('eq', 200)
 
 // cy.wait(3000);


  });
});
