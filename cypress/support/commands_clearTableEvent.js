Cypress.Commands.add("clear_table_event", function () {

    cy.window().then(window => {
        var customerVisitId = window.localStorage.getItem('customerVisitId')
        cy.log(window.localStorage)
        cy.request({
            method: "POST",
            url: `${Cypress.env("apiUrl")}/api/mobile/waiter/clear/${customerVisitId}`,
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