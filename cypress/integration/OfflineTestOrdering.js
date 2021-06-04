/*  describe('My First Test', function(){
 ///   it('Does not do much', function(){
       /// expect(true).to.equal(false)



       
       //Arrange - setup initial app state
                // - visit a web page
                // - query for an element

       // Act - take an action
                // - interact with taht element

       // Assert - make an assertion
                // - make an assertion about page content
     
   // it ('Visit the kitchen sink', function (){
      //  cy.visit('https://example.cypress.io')
//})
//}) */

/* Find an element
describe('My first Test', function(){
    it('Finds an element', function (){
        cy.visit('https://example.cypress.io')

        cy.contains('type')
    })
})*/

/*Clicks an element
describe('My first Test', function(){
    it('Clicks an element', function (){
        cy.visit('https://example.cypress.io')

        cy.contains('type').click()
    })
})*/

/*//Makes an assertion
describe('My first Test', function(){
    it('Makes an assertion', function (){
        cy.visit('https://example.cypress.io')

        cy.contains('type').click()

        cy.url()
        .should('include', '/commands/actions')
    })
})*/

//Gets, types and asserts
describe("Offline login ordering - Start Viewing", function () {
  it("Gets, types and asserts", function () {
    cy.visit("http://customer.nextbite.webdev.roweb.ro/login/424/520/0");

    cy.visit("http://customer.nextbite.webdev.roweb.ro/landing");

    cy.contains("Start Viewing").click();

    cy.url().should(
      "include",
      "http://customer.nextbite.webdev.roweb.ro/customer-menu"
    );

    cy.contains("Lunch").click();
    cy.wait(1000);
    cy.contains("Burrata").click();
    cy.wait(1000);
    cy.get("#special-request-input-id").type(
      "supercalifragilisticexpialidocious"
    );
    cy.wait(1000);
    cy.get("#mat-checkbox-1").find("input").click({ force: true });
    cy.wait(1000);
    cy.get("#mat-checkbox-2").find("input").click({ force: true });
    cy.wait(1000);
    cy.contains("ADD").click();
    cy.contains("View Order").click();

    cy.get('div[class="items ng-star-inserted"]')
      .find('img[src*="plus button.png"]')
      .should("be.visible")
      .click();
    cy.wait(1000);
    cy.get('div[class="items ng-star-inserted"]')
      .find('img[src*="plus button.png"]')
      .should("be.visible")
      .click();
    cy.wait(1000);
    cy.get('div[class="items ng-star-inserted"]')
      .find('img[src*="plus button.png"]')
      .should("be.visible")
      .click();

    cy.wait(1000);
    cy.get('div[class="items ng-star-inserted"]')
      .find('img[src*="- button.png"]')
      .should("be.visible")
      .click();
    cy.wait(1000);
    cy.get('div[class="items ng-star-inserted"]')
      .find('img[src*="- button.png"]')
      .should("be.visible")
      .click();

    cy.wait(1000);
    cy.get('div[class="title"]')
      .find('img[src*="back button.svg"]')
      .should("be.visible")
      .click();

    cy.get(
      'div[class="origins-button round-button ng-star-inserted"]'
    ).scrollIntoView({ duration: 2000 });

    cy.get('div[id="header"]').scrollIntoView();
    cy.wait(1000);
    cy.contains("View All").click();
    cy.wait(1000);
    cy.contains("View Less").click();
  });
});
