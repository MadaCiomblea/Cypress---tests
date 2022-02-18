describe("Ads Manager test", function () {
  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.wait(2000);
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });
  after(() => {
    cy.clear_table();
  });

  it("Login check", function () {
    cy.login_check();
    cy.saveLocalStorage();
  });

  it("Close ads", function () {
    cy.get(".round-button").click();

    cy.get("body").then(($body) => {
      if (
        $body.find('#adsSwiper')
          .length > 0
      ) {
        cy.log("The ads exists!");

        cy.get('#ads-time-text-id').then($newVal => {
          console.log($newVal.text().toString().trim())
          cy.waitUntil(() => $newVal.text().toString().trim() == "Ads will be closed within 0 seconds", {
            //optional timeouts and error messages
            errorMsg: "was expeting some other Value but got : " + $newVal.text().toString().trim(),
            timeout: 100000,
            interval: 500
          }).then(() => {


            cy.get("body").then(($body) => {
              if ($body.find('img[src*="close popup button.svg"]').length > 0) {
                cy.get('img[src*="close popup button.svg"]').click()
              } else {
                cy.log("autoclose")
              }
            })
          })
        })


      } else {
        cy.log("The Ads not exist!");

      }
    });
    cy.get(".groups").contains("Menu").click();
    cy.contains("Chicken Avo Rice").click();
    cy.log(localStorage)
  });
});
