describe("Check Origin List", function () {
  after(() => {
    cy.clear_table();
  })
  it("check if origin list exists", function () {
    cy.login_check();

    cy.wait(2000);

    cy.get(".round-button").click();
    cy.wait(2000);

    cy.get(".groups").contains("Lunch").click();
    cy.wait(2000);


    cy.get("body").then(($body) => {
      if (
        $body.find('div[class="origins-button round-button ng-star-inserted"]')
          .length > 0
      ) {
        cy.log("The Origin List exists!");
        cy.get('div[class="origins-button round-button ng-star-inserted"]')
          .scrollIntoView()
          .should("be.visible")
          .click({ force: true });

          cy.get('[style="font-size: 18px; font-weight: lighter; padding-top: 1.5em; padding-bottom: 1.5em;"]')
          .should("be.visible")
          .then(($arabic) => {
            if ($arabic.find('span[class="arabic-text"]').length > 0) {
              cy.get('span[class="arabic-text"]')
                .contains("عربي")
                .log("Arabic Origin List exists!")
                .click({ force: true });
              cy.wait(3000);
            } else {
              cy.log("Arabic Origin List DOES NOT exist!");
            }
          });

          cy.get('[style="font-size: 18px; font-weight: lighter; padding-top: 1.5em; padding-bottom: 1.5em;"]')
          .should("be.visible")
          .then(($english) => {
            if ($english.find('span[class="english-text"]').length > 0) {
              cy.get('span[class="english-text"]')
                .contains("English")
                .log("English Origin List exists!")
                .click({ force: true });
              cy.wait(3000);
            } else {
              cy.log("English Origin List DOES NOT exist!");
            }
          });

        cy.wait(3000);
        cy.get('div[class="popup"]')
          .find('img[src*="close popup button.svg"]')
          .click();
      } else {
        cy.log("The Origin List does not exist!");
      }
    });
  });
});
