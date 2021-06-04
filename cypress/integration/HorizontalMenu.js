describe("Horizontal menu", function () {
  it("Horizontal menu - click on category", function () {
    cy.login_check();
    cy.wait(2000);

    cy.get(".round-button").click();
    cy.wait(2000);

    cy.get(".groups").contains("Lunch").click();
    cy.wait(2000);

    cy.get('span[class="english-text"]')
      .contains("Tune Up Under 500 Calories")
      .click({ force: true });
    cy.wait(3000);
    cy.get('div[class="category-menu ng-star-inserted"]').should(
      "contain",
      "Tune Up Under 500 Calories"
    );
  });
});
