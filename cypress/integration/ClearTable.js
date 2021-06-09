/// <reference types="cypress-localstorage-commands" />

describe("Clear table test", function () {
 
    it("Login check", function () {

        cy.login_check();
        cy.saveLocalStorage();
       
    });
    


    it("Clear Table", function () {
       
        
        cy.get(".round-button").click();
        cy.get(".groups").contains("Lunch").click();
   

     cy.window().then(window =>{ var id = window.localStorage.getItem('customerVisitId')
    


        cy.request({
            method: "POST",
            url: `http://api.nextbite.webdev.roweb.ro/api/mobile/waiter/clear/${id}`,
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
    cy.get('.restaurant-details-logo > .ng-star-inserted').should('be.visible');
    cy.wait(2000)
    cy.get(':nth-child(2) > .english-text').should('contain', 'Thank you for dining with us');
    cy.wait(2000)
    cy.get('[style="font-size: 16px; font-weight: 400; color: white;"] > .english-text').should('contain', 'Your session has been ended by the waiter')
    cy.wait(2000)
    });
});