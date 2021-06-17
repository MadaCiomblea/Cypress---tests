
describe("Offline login ordering - Start Viewing", function () {
  it("Gets, types and asserts", function () {
    cy.visit("http://customer.nextbite.webdev.roweb.ro/login/424/520/0");

    cy.visit("http://customer.nextbite.webdev.roweb.ro/landing");
cy.wait(3000)
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
