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

    cy.order_process();
  });

  it("Send Order", function () {

    cy.updateOrder();
  })
  it("Send payment, Confirm the Payment and Check the amount", function () {

    cy.confirmedPayment();


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
