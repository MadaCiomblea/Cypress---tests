describe("Payment check amount", function () {

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
    
  });
})
  it("Send payment and Rejected Payment", function () {
    cy.get("#mat-radio-3").find("input").click({ force: true });
    cy.wait(3000);



    cy.get(".pay-button").contains("Pay" || "ادفـع").click({ force: true });

    cy.wait(1000);

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
