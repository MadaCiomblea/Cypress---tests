describe("Check Feedback functionality - HAPPY Feedback", function () {
  it("login step", function () {
    cy.login_check();

    cy.wait(2000);

    cy.get(".round-button").click();
    cy.wait(2000);

    cy.get(".groups").contains("Lunch").click();
    cy.wait(2000);
  });
  it("Select an item", function () {
    let specialReq = "SpecialRequestTest";
    cy.contains("Shrooms Zuppa").click();
    cy.get("#special-request-input-id")
      .type(specialReq)
      .should("have.value", specialReq);

    cy.get("#mat-checkbox-1").find("input").click({ force: true });
    cy.get("#mat-checkbox-2").find("input").click({ force: true });
    cy.get("#mat-checkbox-3").find("input").click({ force: true });

    cy.contains("ADD").click();
    cy.contains("Send Order").click();
  });

  ///////////////////////////////////////////////

  it("Send Order", function () {
    cy.get('div[class="review-order-page"]').contains("Send Order").click();

    Cypress.env();

    cy.request({
      method: "PUT",
      url: `http://api.nextbite.webdev.roweb.ro/api/orders/approve/${Cypress.env("orderId")}/mobile`,
      headers: {
        Authorization: Cypress.env("waiter_token"),
        RestaurantId: Cypress.env("restaurantID") + "",
        BranchId: Cypress.env("branchID") + "",
        "Content-Type": "application/json",
        DeviceId: "123456",
      },
    });
    cy.wait(3000);

  });

  it("complete and send a HAPPY feedback, one per order", function () {

   

    cy.get("body").then(($feedback) => {

      if (
        $feedback.find('app-feedback-button > .gray-box > .flex-row')
          .length > 0
      ) {
        cy.get('app-feedback-button > .gray-box > .flex-row').should('be.visible').contains('Give Feedback').click({ force: true });
        cy.wait(1000);
        cy.get('.option-selected').should('contain', 'Happy', 'be.selected')
        cy.wait(1000);
        cy.log("Happy feedback is selected!");
        cy.get(':nth-child(3) > .feedback-title > .english-text').should('contain', 'Why are you happy?');
        cy.wait(1000);
        cy.get('#feedback-comment-input').type('My happy feedback!').should('have.value', 'My happy feedback!')
        cy.wait(1000);
        cy.get('#feedback-name-input').type('My name is Madaaaaaa').should('have.value', 'My name is Madaaaaaa')
        cy.wait(1000);
        cy.get('#feedback-phone-number-input').type('0767676766').should('have.value', '0767676766')
        cy.wait(1000);

        cy.get('.feedback > .round-button').click({ force: true })
        cy.get('div[class="flex-column ng-star-inserted"]').should('contain', 'Thanks for Your Feedback')
        cy.wait(1000);
        cy.get('img[src*="feedback-happy.svg"]').should('be.visible')
        cy.wait(1000);
      } else {
        cy.log('The feedback is already given!')
      }
    })

    // cy.get('.option-selected').should('contain', 'Happy', 'be.selected').then(() => {

    //   cy.get(':nth-child(3) > .feedback-title > .english-text').should('contain', 'Why are you happy?');
    //   cy.get('#feedback-comment-input').type('My happy feedback!').should('have.value', 'My upset feedback!')
    // cy.get('#feedback-name-input').type('My name is Madaaaaaa').should('have.value', 'My name is Madaaaaaa')
    // cy.get('#feedback-phone-number-input').type('0767676766').should('have.value', '0767676766')

    // cy.get('.feedback > .round-button').click({force:true})
    // cy.get('div[class="flex-column ng-star-inserted"]').should('contain', 'Thanks for Your Feedback')
    // cy.get('img[src*=feedback-happy.svg"]').should('be.visible')

    // })


    // cy.get('.feedback-options > :nth-child(2)').should('contain', 'Upset').click().then(() => {

    //   cy.get(':nth-child(3) > .feedback-title > .english-text').should('contain', 'Why are you upset?');

    //   cy.get('#feedback-comment-input').type('My upset feedback!').should('have.value', 'My upset feedback!')
    //   cy.get('#feedback-name-input').type('My name is Madaaaaaa').should('have.value', 'My name is Madaaaaaa')
    //   cy.get('#feedback-phone-number-input').type('0767676766').should('have.value', '0767676766')

    //   cy.get('.feedback > .round-button').click({force:true})
    //   cy.get('div[class="flex-column ng-star-inserted"]').should('contain', 'Thanks for Your Feedback')
    //   cy.get('img[src*=feedback-angry.svg"]').should('be.visible')
    // })

  });

});
