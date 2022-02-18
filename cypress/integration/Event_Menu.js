describe("Login to the event ordering app", function () {

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.wait(2000)
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });
  after(() => {
    cy.clear_table_event();
  })

  it("Login check", function () {

    cy.login_event();
    cy.saveLocalStorage()
  });

  it("Start Ordering", function () {

    cy.get('[style="height: 100%; width: 100%; display: flex; flex-direction: column; justify-content: space-between;"] > .ng-star-inserted > div').click();

    cy.window().then(window => {
      var id = window.localStorage.getItem('orderId')
      cy.log(id)

      cy.request({
        method: "GET",
        url: `${Cypress.env("firebaseUrl")}/viewStore/${Cypress.env("restaurantEvent")}/${Cypress.env("branchEvent")}/orders/${id}/scalars.json`,

      }).then((numberOfGuests) => {

        console.log(numberOfGuests.body.numberOfGuests)

        cy.request({
          method: "GET",
          url: `${Cypress.env("firebaseUrl")}/viewStore/${Cypress.env("restaurantEvent")}/menus/12469/categories/3348.json`,

        }).then((maxSelection) => {

          let nrMaxPerCategory = (maxSelection.body.maxSelectionNumber) * (numberOfGuests.body.numberOfGuests)
          // let numGuest = numberOfGuests.body.numberOfGuests;
          //let categoryName = maxSelection.body.Name

          // cy.get('[style="display: flex; flex-direction: row; width: 100%; height: 100%;"]').first().should('have.text', 'Soup')
          // cy.get('[style="display: flex; flex-direction: row; width: 100%; height: 100%;"]').should('contain', `${`${numGuest}`}`)

          for (let n = 0; n < nrMaxPerCategory; n++) {
            cy.get('.dishes > :nth-child(1) > app-event-dish > #dish > .details > .add > .noselect').first().click({ multiple: true })
          }
          cy.get('.dishes > :nth-child(1) > app-event-dish > #dish > .details > .add > .noselect').first().click({ multiple: true })
          cy.get('#number-of-ordered-items-for-dish3866').should('contain', `${nrMaxPerCategory}`)
          cy.get('.select-dishes > img').click()
          cy.get('#number-of-ordered-items-for-dish3866').should('contain', `${nrMaxPerCategory - 1}`)
        });

      });
    });
  });
  it("Send Order Process", function () {
    cy.get('.footer > .noselect').click();
    cy.wait(2000)

    cy.get('.title').should('contain', 'Review Order');

    cy.get('[style="opacity: 1;"]').click();

    cy.get('.footer > .noselect').click();

    cy.window().then(window => {
      var orderId = window.localStorage.getItem('orderId')
  
  
      cy.request({
        method: "PUT",
        url: `${Cypress.env("apiUrl")}/api/orders/approve/${orderId}/mobile`,
        headers: {
          Authorization: Cypress.env("waiter_token"),
          RestaurantId: Cypress.env("restaurantEvent") + "",
          BranchId: Cypress.env("branchEvent") + "",
          "Content-Type": "application/json",
          DeviceId: "123456",
        },
      });
      cy.get('.page > :nth-child(2)').should('contain', 'Order Confirmed')
     
    })

  });
  // it("Give feedback", function () {
  //   cy.get('#feedback-button-in-event > .flex-row > .noselect').click();

  //   cy.get("body").then(($feedback) => {

  //     if (
  //       $feedback.find('app-event-order-tips > .flex-column')
  //         .length > 0
  //     ) {
  //       cy.get('#feedback-button-in-event > .flex-row').should('be.visible').contains('Give Feedback').click({ force: true });
  //       cy.wait(1000);
  //       cy.get('.option-selected').should('contain', 'happy', 'be.selected')
  //       cy.wait(1000);
  //       cy.log("Happy feedback is selected!");
  //       cy.get('#feedback-comment > .feedback-title').should('contain', 'We love to hear more from you');
  //       cy.get('.feedback > .rectangle-button').should('not.be.disabled');
  //       cy.get('.feedback-options > :nth-child(2)').click();
  //       cy.log("Upset feedback is selected!");
  //       cy.wait(1000);
  //       cy.get('.feedback > .rectangle-button').should('have.attr', 'style').and('include', 'opacity: 0.25');
  //       cy.wait(1000);
  //       cy.get('#feedback-comment-input').type('My feedback!').should('have.value', 'My feedback!')
  //       cy.wait(1000);
  //       cy.get('.feedback > .rectangle-button').should('not.be.disabled');
  //       cy.get('.feedback > .rectangle-button').click({ force: true })
  //       cy.get('#feedback-button-in-event > .flex-row').should('contain', 'Thanks for Your Feedback')
  //       cy.wait(1000);
  //       cy.get('img[src*="upset.png"]').should('be.visible')
  //       cy.wait(1000);
  //     } else {
  //       cy.log('The feedback is already given!')
  //     }
  //   })


 // });
});