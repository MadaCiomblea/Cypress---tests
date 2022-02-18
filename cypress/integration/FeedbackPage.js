describe("Check Feedback functionality - HAPPY Feedback", function () {
  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.viewport('samsung-s10');
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });
  after(() => {
    cy.clear_table();
  })

  it("login step", function () {
    cy.login_check();

    cy.wait(2000);
  });

  it("Select an item", function () {

    cy.order_process();
  });


  ///////////////////////////////////////////////

  it("Send Order", function () {
    cy.updateOrder();


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
        cy.get('.feedback > .round-button').should('not.be.disabled');
        cy.get('.feedback-options > :nth-child(2)').click();
        cy.log("Upset feedback is selected!");
        cy.wait(1000);
        cy.get('.feedback > .round-button').should('have.attr', 'style').and('include', 'opacity: 0.25');
        cy.get(':nth-child(3) > .feedback-title > .english-text').should('contain', 'Why are you upset?');
        cy.wait(1000);
        cy.get('#feedback-comment-input').type('My feedback!').should('have.value', 'My feedback!')
        cy.wait(1000);
        cy.get('#feedback-name-input').type('My name is Madaaaaaa').should('have.value', 'My name is Madaaaaaa')
        cy.wait(1000);
        cy.get('#feedback-phone-number-input').type('0767676766').should('have.value', '0767676766')
        cy.wait(1000);
        cy.get('.feedback > .round-button').should('not.be.disabled');
        cy.get('.feedback > .round-button').click({ force: true })
        cy.get('div[class="flex-column ng-star-inserted"]').should('contain', 'Thanks for Your Feedback')
        cy.wait(1000);
        cy.get('img[src*="feedback-angry.svg"]').should('be.visible')
        cy.wait(1000);
      } else {
        cy.log('The feedback is already given!')
      }
    })

  });

});
