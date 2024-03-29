Cypress.Commands.add("clear_table", function () {

    cy.window().then(window => {
        var customerVisitId = window.localStorage.getItem('customerVisitId')
        cy.log(window.localStorage)
        cy.request({
            method: "POST",
            url: `${Cypress.env("apiUrl")}/api/mobile/waiter/clear/${customerVisitId}`,
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