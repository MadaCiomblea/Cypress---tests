describe("Confirm Payment from waiter app - in the Ordering UI will appear the order and the payment with specific details and the customer clicks Order More and update the order", function () {
  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });
  after(() => {
    cy.clear_table();
  });

  it("login step - check the footer", function () {
    cy.login_check();

    cy.wait(2000);

    cy.get(".round-button").click();
    cy.wait(2000);
    cy.ads_manager();
    cy.get(".groups").contains("Menu").click();
    cy.wait(2000);

    cy.get("body").then(($footer) => {
      if ($footer.find('div[class="footer"]').length > 0) {
        cy.log("Footerul exista");
      } else {
        cy.log("Footerul NU exista!!!!!!");

        cy.window().then((window) => {
          var orderId = window.localStorage.getItem("orderId");

          cy.request({
            method: "PUT",
            url: `${Cypress.env("apiUrl")}/api/orders/update/waiter/mobile`,
            headers: {
              Authorization: Cypress.env("waiter_token"),
              RestaurantId: Cypress.env("restaurantID") + "",
              BranchId: Cypress.env("branchID") + "",
              "Content-Type": "application/json",
              Accept: "application/json",

              deviceId: "B9BB7777-CB33-4C0A-B088-988E03382FC4",
              device_name: "iPad Pro (9.7-inch)",
              app_version: "1.410",
              ip_address: "192.168.91.74",
            },
            body: [
              {
                id: orderId,

                orderItems: [
                  {
                    orderId: orderId,
                    itemId: 3860,
                    itemName: "Capra Salad",
                    isPaid: false,
                    itemPrice: 3.85,
                    itemRequest: "",
                    itemSizePrice: 0,
                    itemSizeIsDefault: true,
                    itemSizeName: "Regular",
                    quantity: 3,
                    discount: 25,
                    orderToppings: [],
                    offerId: 2161,
                    offerDiscount: 25,
                    subOrderId: null,
                  },
                  {
                    orderId: orderId,
                    itemId: 3860,
                    itemName: "Capra Salad",
                    isPaid: false,
                    itemPrice: 3.85,
                    itemRequest: "",
                    itemSizePrice: 0,
                    itemSizeIsDefault: true,
                    itemSizeName: "Regular",
                    quantity: 3,
                    discount: 25,
                    orderToppings: [],
                    offerId: 2161,
                    offerDiscount: 25,
                    subOrderId: null,
                  },
                ],
              },
            ],
          });
        });
      }

    }).then(() => {
    });
  });
  it("Add payment and confirm cash payment by waiter", function () {

    cy.confirmPaymentByWaiter();
    
    cy.get('.paid-box').should('contain', "دفـع").should('have.css', 'background-color')
      .and('eq', 'rgb(82, 184, 47)');
    cy.get('.pay-button').contains('Order More').click();
    cy.contains("Chicken Avo Rice").click({ multiple: true, force: true });
    cy.contains("ADD").click();
    cy.contains("Send Order").click({ multiple: true, force: true });

    cy.updateOrder();


  });
});