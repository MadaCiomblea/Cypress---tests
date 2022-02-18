describe("Payments - Rejected and Confirmed", function () {

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.viewport('samsung-s10');

  });

  afterEach(() => {
    cy.saveLocalStorage();
  });
  after(() => {
    cy.clear_table();
  })

  it("Login check", function () {
    cy.login_check();
    cy.saveLocalStorage();
  });

  it("Start Ordering test", function () {
    cy.order_process();

  });



  ///////////////////////////////////////////////

  it("Send Order", function () {

    cy.updateOrder();

    cy.get("payment-tips > .flex-row > :nth-child(1)").then(($baseValue) => {
      const baseValue = $baseValue.text().toString().trim();
      const valueNumber = parseFloat(
        baseValue.substring(0, baseValue.indexOf(" KD"))
      );
      cy.get("payment-tips > .flex-row > :nth-child(1)").click().should(
        "have.text",
        `\n      ${valueNumber} KD\n    `
      );
    });
    cy.wait(3000);
  });

  it("Send payment and Rejected Payment", function () {

    cy.rejectedPayment();


  });

  it("Send payment and Approved Payment and Order More", function () {
    //cy.wait(4000)
    cy.get('div[class="popup flex-column"]')
      .find('img[src*="close popup button.svg"]')
      .should("be.visible")
      .click();
      
    cy.confirmedPayment();

    cy.wait(3000);
    cy.get('div[class="popup flex-column"]')
      .find('img[src*="close popup button.svg"]')
      .should("be.visible")
      .click();

    cy.wait(3000);

    cy.intercept(`${Cypress.env("apiUrl")}/api/mobile/waiter/selfclearandrestore`).as('orderMore')


    cy.contains("Order More").click();

    cy.wait('@orderMore').its('response.statusCode').should('eq', 200)

    cy.contains("Sauted Vegetables").click({ multiple: true, force: true });

    cy.wait(3000);
    cy.get('.footer > .round-button').click();
    cy.contains("Send Order").click();
    cy.updateOrder();

    cy.get('[style="display: flex; flex-direction: column; flex-grow: 0; "] > .flex-row > .noselect').click();
    cy.get('.back-button').click();

    cy.contains("Tomato Lentil Soup").click();
    cy.wait(3000);
    cy.get('.footer > .round-button').contains("ADD").click({ multiple: true, force: true });
    cy.contains("Send Order").click();
    cy.updateOrder();

    cy.get('.go-to-select-dishes').click();

    cy.contains("Shrooms Zuppa").click({ multiple: true, force: true });
    cy.wait(3000);
    cy.get('.footer > .round-button').contains("ADD").click({ multiple: true, force: true });
    cy.contains("Send Order").click();
    cy.updateOrder();

    cy.get('app-top-buttons.buttons > .buttons > :nth-child(1)').click();
    cy.get('.groups > :nth-child(1)').click()
    cy.contains("Casserole Potata").click({ multiple: true, force: true });
    cy.wait(3000);
    cy.get("#mat-checkbox-1").find("input").click({ force: true });
    cy.get("#mat-checkbox-2").find("input").click({ force: true });
    cy.get('.footer > .round-button').contains("ADD").click({ multiple: true, force: true });
    cy.contains("Send Order").click();
    cy.updateOrder();


    cy.get('[style="justify-content: space-evenly; height: fit-content;"] > :nth-child(1) > span').then(($amountValue) => {
      const amountValue = $amountValue.text().toString().trim();
      const amountNumber = parseFloat(
        amountValue.substring(0, amountValue.indexOf(" KD"))
      );
      cy.log(amountValue);
      cy.log(parseFloat(amountValue.substring(0, amountValue.indexOf(" KD"))));

      cy.get('[style="justify-content: space-evenly; height: fit-content;"] > :nth-child(1) > span').should(
        "have.text",
        `\n            ${amountValue}\n          `
      );
    });
  });

});
