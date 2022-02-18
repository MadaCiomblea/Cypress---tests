/// <reference types="cypress-localstorage-commands" />

describe("Clear table test", function () {

    beforeEach(() => {
        cy.restoreLocalStorage();
    });

    afterEach(() => {
        cy.saveLocalStorage();
    });

    it("Login check", function () {

        cy.login_check();


    });

    it("Clear Table", function () {


        cy.get(".round-button").click();
        cy.get(".groups").contains("Menu").click();


        cy.window().then(window => {
            var id = window.localStorage.getItem('customerVisitId')

            cy.wait(2000);
            console.log(id)

            cy.request({
                method: "POST",
                url: `${Cypress.env("apiUrl")}/api/mobile/waiter/clear/${id}`,
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
        })
        cy.get('.powered-by').should('be.visible').contains('Made possible with');
        cy.wait(2000)
        cy.get(':nth-child(2) > .english-text').should('contain', 'Thank you for dining with us');
        cy.wait(2000)
        cy.get('[style="letter-spacing: 0.7px; color: #FFFFFF; opacity: 0.7;"] > .english-text').should('contain', 'Your session has been ended by the waiter')
        cy.wait(2000)
    });
});