describe("Offers", function () {
  it("Horizontal menu - click on category", function () {
    cy.login_check();
    cy.wait(2000);

    cy.get(".round-button").click();
    cy.wait(2000);

    cy.get(".groups").contains("Lunch").click();
    cy.wait(2000);

    cy.get("body").then(($body) => {
      if ($body.find('div[class="badge-box ng-star-inserted"]').length > 0) {
        cy.log("The Offers, BestSelling or Must-Try exist!");
        
        cy.get('div[class="badge-box ng-star-inserted"]')
          .should(
            "be.visible",
            "have.attr",
            "style",
            "background-image: linear-gradient(to right, red , orange);"
          )
          .then(($bselling) => {
            if ($bselling.find('img[src*="star icon.svg"]').length > 0) {
              cy.get('img[src*="star icon.svg"]')
                .should("have.attr", "style", "height: 10px;")
                .log("Best Selling exists!");
              cy.wait(3000);
            } else {
              cy.log("Best Selling DOES NOT exist!");
            }
          });

        cy.get('div[class="badge-box ng-star-inserted"]')
          .should(
            "be.visible",
            "have.attr",
            "style",
            "background-image: linear-gradient(to right, red , orange);",
            "have.text",
            "OFF"
          ).log()
          .then(($offer) => {
            if ($offer.find('span[class="badge-corner"]').length > 0) {
              cy.get('span[class="badge-corner"]')
                .should(
                  "have.attr",
                  "style",
                  "border-color: transparent transparent orangered transparent;"
                )  
                .log("Offers exists!")
       //  console.log($offer.find('span[class="badge-corner"]').length)
              cy.wait(3000);
            } else {
              cy.log("Offers DOES NOT exist!");
            }
          
          });

        cy.get('div[class="badge-box ng-star-inserted"]')
          .should(
            "be.visible",
            "have.attr",
            "style",
            "background-image: linear-gradient(to right, red , orange);",
            "have.text",
            "Must try",
            
          )
          .then(($mustTry) => {
            if ($mustTry.find('span[class="badge-corner"]').length > 0) {
             
              cy.get('span[class="badge-corner"]')
                .should(
                  "have.attr",
                  "style",
                  "border-color: transparent transparent orangered transparent;"
                )

                .log("Must-Try exists!");
              cy.wait(3000);
            
              console.log($mustTry[0])
            } else {
              cy.log("Must-Try DOES NOT exist!");
            }
          });
      } else {
        cy.log("The Offers, BestSelling or Must-Try do NOT exist!");
      }
    });
  });
});
