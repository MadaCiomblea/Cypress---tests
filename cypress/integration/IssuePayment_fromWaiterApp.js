describe("Confirm Payment from waiter app - in the Ordering UI will appear the order, the footer with the correct amount, and paymnet confirmation popup", function () {
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
    cy.get(".groups").contains("Lunch").click();
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
            url: "http://api.nextbite.webdev.roweb.ro/api/orders/update/waiter/mobile",
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
                    itemId: 2586,
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
                    itemId: 2586,
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
    });

    cy.window().then((window) => {
      var orderId = window.localStorage.getItem("orderId");
      cy.request({
        method: "POST",
        url: "http://api.nextbite.webdev.roweb.ro/api/orders/payments/add",
        headers: {
          Authorization: Cypress.env("waiter_token"),
          RestaurantId: Cypress.env("restaurantID") + "",
          BranchId: Cypress.env("branchID") + "",
          "Content-Type": "application/json",
          deviceId: "B9BB7777-CB33-4C0A-B088-988E03382FC4",
        },
        body: {
          orderId: cy.getLocalStorage().orderId,
          isCashPayment: true,
          SentFromCustomer: false,
          amount: cy.getLocalStorage().amount,
          isCashPayment: true,
          waiterId: 1079,
        },
      }).then(($resp)=>{
          
      })

      console.log(orderId);

      // cy.request({
      //     method: "POST",
      //     url: "http://api.nextbite.webdev.roweb.ro/api/mobile/waiter/payment/confirmation",
      //     headers: {
      //       Authorization: Cypress.env("waiter_token"),
      //       RestaurantId: Cypress.env("restaurantID") + "",
      //       BranchId: Cypress.env("branchID") + "",
      //       "Content-Type": "application/json",
      //       deviceId: "B9BB7777-CB33-4C0A-B088-988E03382FC4",

      //     },
      //     body:
      //         {

      //             CustomerVisitId: cy.getLocalStorage().customerVisitId,
      //             PaymentId: 60067,
      //             Remark: "",
      //             Status: "Rejected",
      //             waiterId: 1079,
      //         }

      //   });
    });
  });
});
