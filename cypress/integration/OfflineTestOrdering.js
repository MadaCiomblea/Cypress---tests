
describe("Offline login ordering - Start Viewing", function () {
  it("Gets, types and asserts", function () {
    cy.visit(`${Cypress.env("baseUrl")}/login/${Cypress.env("restaurantID")}/${Cypress.env("branchID")}/0`);

   
    cy.wait(3000)
    cy.contains("Start Viewing").click();

    cy.url().should(
      "include",
      `${Cypress.env("baseUrl")}/customer-menu`
    );
    cy.ads_manager();
    cy.get(".groups").contains("Menu").click();
    cy.wait(1000);
    cy.contains("Chicken Avo Rice").click();
    cy.wait(1000);
    cy.get("#special-request-input-id").type(
      "supercalifragilisticexpialidocious"
    );
    cy.wait(1000);
    // cy.get("#mat-checkbox-1").find("input").click({ force: true });
    // cy.wait(1000);
    // cy.get("#mat-checkbox-2").find("input").click({ force: true });
    // cy.wait(1000);
    cy.contains("ADD").click();
    cy.contains("Send Order").click();

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

    cy.get('.call-waiter').should('not.be.enabled')
    cy.get('.footer > .round-button').should('not.be.enabled')
    cy.wait(1000);
    cy.get('div[class="title"]')
      .find('img[src*="back button.svg"]')
      .should("be.visible")
      .click();

      cy.get('.footer.flex-shrink0 > .footer').scrollIntoView({ duration: 4000 });

    cy.get('div[id="header"]').scrollIntoView();
    cy.wait(1000);
    cy.contains("View All").click();
    cy.wait(1000);
    cy.contains("View Less").click();

    cy.get('.items-count').click({ force: true });
    cy.contains("Review Order")
  });
});
