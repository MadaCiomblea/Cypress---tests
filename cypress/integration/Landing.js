describe("Check logo image ordering vs manager info", function () {
  it("compare the logo", function () {
   /* cy.login_check();

    cy.wait(2000);

    cy.get('div[class="restaurant-details"]')
      .find('img[src*="dine-in-logo-restaurant-424.png"]')
      .should("be.visible");*/

 
    //let grantType = "password";
    
    let access_token = " ";

    let body = {
      grant_type: "password",
      appid: "web",
      username: "madelleine285@yahoo.com",
      password: "123456",
    };

    let headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    cy.request({
      method: "POST",
      url: "http://api.nextbite.webdev.roweb.ro/oauth/token",
      body: body,
      headers: headers,
    }).then(({ body }) => {
      access_token = body;

      cy.visit(`http://admin.nextbite.webdev.roweb.ro/dashboard/admin`);
    });

    cy.wait(3000);
    
    let username = "madelleine285@yahoo.com";
    let password = "123456";
    cy.get('#mat-input-0').type(username).should('have.value', username);
    cy.get('#mat-input-1').type(password).should('have.value', password);

    cy.get('span[class="mat-button-wrapper"]').click({force:true});

    // cy.get('span[class="nav-link-title"]').contains('Clients').click({force:true});

    //cy.get('#srch').type('NB')
    // cy.get('img[class*="grid-logo icon ng-tns-c38-11 ng-star-inserted"]').should('exist').click({multiple:true});
    // cy.get('mat-icon[class="mat-icon material-icons"]').click({multiple:true, force:true})

    cy.get('mat-icon[class="mat-icon ng-tns-c3-10 material-icons"]').click({
      force: true,
    });
    cy.wait(3000);
    cy.get('span[class="nav-link-title"]')
      .contains("Info")
      .click({ force: true });
    cy.wait(3000);
    // cy.get('span[class="text-muted"]').contains('Dine In Logo').scrollTo({y: 'Dine In Log'})

    cy.get(".mat-select-value").first().click({ force: true });
    cy.get('span[class="mat-option-text"]')
      .contains("NB Testing")
      .click({ force: true });

    cy.get(".mat-select-value")
      .contains("All Restaurants")
      .click({ force: true });
    cy.get("#mat-option-8").contains('NB').click({ force: true });

    cy.wait(3000);

    cy.get("span.text-muted").contains("Dine In Logo");

    cy.get('div[class="img-padding h-300-270"]')
      .find(
        'img[src*="a577f55c-cf0b-46b3-9228-fe1ed65f28f6~Chocolate Cake.jpeg"]'
      )
      .should("not.be.visible");
    cy.wait(3000);
    cy.get(':nth-child(1) > .inner > :nth-child(3) > :nth-child(1) > .text-muted').scrollIntoView();
    cy.wait(3000);

  cy.get('img[class="avatar"]').click({force:true})
  cy.get('span[class="logout-text ng-tns-c3-10"]').contains('Logout').click({force: true})
  });
});
