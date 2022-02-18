Cypress.Commands.add("confirmPaymentByWaiter", function () {

    cy.wait(4000)
    cy.window().then(window => {
        var id = window.localStorage.getItem('orderId')
        cy.log(id)
        cy.request({
            method: "GET",
            url: `${Cypress.env("firebaseUrl")}/viewStore/${Cypress.env("restaurantID")}/${Cypress.env("branchID")}/orders/${id}/scalars.json`,

        }).then((amount) => {


            cy.request({
                method: "POST",
                url: `${Cypress.env("apiUrl")}/api/orders/payments/add`,
                headers: {
                    Authorization: Cypress.env("waiter_token"),
                    RestaurantId: Cypress.env("restaurantID") + "",
                    BranchId: Cypress.env("branchID") + "",
                    "Content-Type": "application/json",
                    deviceId: Cypress.env("deviceID"),
                },
                body: {
                    orderId: id,
                    isCashPayment: true,
                    SentFromCustomer: false,
                    amount: amount.body.amount,
                    waiterId: 1079,
                    emails: [],

                },
            }).then((req) => {
                console.log(req)
                cy.request({
                    method: "POST",
                    url: `${Cypress.env("apiUrl")}/api/mobile/waiter/payment/confirmation`,
                    headers: {
                        Authorization: Cypress.env("waiter_token"),
                        RestaurantId: Cypress.env("restaurantID") + "",
                        BranchId: Cypress.env("branchID") + "",
                        "Content-Type": "application/json",
                        deviceId: Cypress.env("deviceID"),
                    },
                    body: {
                        CustomerVisitId: cy.getLocalStorage().customerVisitId,
                        PaymentId: req.body.id,
                        Remark: "",
                        Status: "Confirmed",
                        waiterId: 1024,

                    },
                });
            });
        });
    });
});