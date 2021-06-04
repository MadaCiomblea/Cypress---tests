describe("Check Origin List", function () {
  it("check if origin list exists", function () {
    cy.login_check();

    cy.wait(2000);

    cy.get(".round-button").click();
    cy.wait(2000);

    cy.get(".groups").contains("Lunch").click();
    cy.wait(2000);

    cy.get("#mat-tab-content-0-0 > div > div > app-select-dishes > div").then(
      ($element) => {
          
        if ($element.find(".origins-button").length > 0) {
            
            cy.get($element).scrollIntoView().click({ force: true });
            cy.get('span[class="arabic-text"]')
              .contains("عربي")
              .log("Arabic Origin List exists!")
              .click({ force: true });
            cy.wait(3000);
            cy.get('span[class="english-text"]')
              .contains("English")
              .log("English Origin List exists!")
              .click({ force: true });
            cy.wait(3000);
            cy.get('div[class="popup"]')
              .find('img[src*="close popup button.svg"]')
              .click();
        } else {
          cy.log("no");
        }
      }
    );
  });
});
