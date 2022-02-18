describe("Mobile Request from waiter app - in the Ordering UI will appear the order and the footer with the correct amount", function () {

    beforeEach(() => {
        cy.restoreLocalStorage();
    });

    afterEach(() => {
        cy.saveLocalStorage();
    });
    after(() => {
        cy.clear_table();
    })

    it("login step - check the footer", function () {
        cy.login_check();

        cy.wait(2000);

        cy.get(".round-button").click();
        cy.wait(2000);
        cy.ads_manager();
        cy.get(".groups").contains("Menu").click();
        cy.wait(2000);


        cy.get("body").then(($footer) => {

            if (
                $footer.find('div[class="footer"]')
                    .length > 0
            ) {
                cy.log('Footerul exista')
            } else {

                cy.log('Footerul NU exista!!!!!!')


                cy.window().then(window => {
                    var orderId = window.localStorage.getItem('orderId')

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

                                "id": orderId,

                                "orderItems": [
                                    {
                                        "orderId": orderId,
                                        "itemId": 2586,
                                        "itemName": "Capra Salad",
                                        "isPaid": false,
                                        "itemPrice": 3.85,
                                        "itemRequest": "",
                                        "itemSizePrice": 0,
                                        "itemSizeIsDefault": true,
                                        "itemSizeName": "Regular",
                                        "quantity": 3,
                                        "discount": 25,
                                        "orderToppings": [

                                        ],
                                        "offerId": 2161,
                                        "offerDiscount": 25,
                                        "subOrderId": null
                                    },
                                    {
                                        "orderId": orderId,
                                        "itemId": 2586,
                                        "itemName": "Capra Salad",
                                        "isPaid": false,
                                        "itemPrice": 3.85,
                                        "itemRequest": "",
                                        "itemSizePrice": 0,
                                        "itemSizeIsDefault": true,
                                        "itemSizeName": "Regular",
                                        "quantity": 3,
                                        "discount": 25,
                                        "orderToppings": [

                                        ],
                                        "offerId": 2161,
                                        "offerDiscount": 25,
                                        "subOrderId": null
                                    }
                                ],
                                // "toDelete": [ {

                                // }

                                // ] 
                            }
                        ]


                    });

                    console.log(orderId)

                    cy.get('.footer.flex-shrink0 > .footer').should('be.visible')
                    cy.get('.items-count').then(($itemsNo) => {
                        const itemsNo = $itemsNo.text().toString().trim();
                        console.log(itemsNo)
                        cy.get('.items-count').should("have.text", `\n      ${itemsNo}\n    `)
                    })
                    cy.get(".round-button").contains("Send Order").click();
                    cy.get(".round-button").contains("Pay").click();
                    cy.get('[style="justify-content: space-evenly; height: fit-content;"] > :nth-child(1) > span').should("be.visible").then(($amount) => {
                        const amount = $amount.text().toString().trim();
                        console.log(amount);
                        cy.get('[style="justify-content: space-evenly; height: fit-content;"] > :nth-child(1) > span').should("have.text", `\n            ${amount}\n          `)
                    })
                });

            }
        });
    });

})