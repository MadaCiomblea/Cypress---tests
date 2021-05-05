

Cypress.Commands.add('login_check', function () {
     
    let grantType = "grant_type=client_credentials";
    let clientSecret = "#";
    let customerSiteLogin = 1 + "";
    let access_token = " ";
    

    let body =
      grantType +
      "&client_secret=" +
      encodeURIComponent(clientSecret) +
      "&client_id=" +
      encodeURIComponent("C178982") +
      "&customer-site-login=" +
      encodeURIComponent(customerSiteLogin);
    let headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      RestaurantId: 424 + "",
      BranchId: 520 + "",
    };
    cy.request({
      method: "POST",
      url: "http://api.nextbite.webdev.roweb.ro/oauth/token",
      body: body,
      headers: headers,
      
    }).then(({ body }) => {
     
    access_token = body
     
      cy.visit(`http://customer.nextbite.webdev.roweb.ro/login/424/520/C178982`);
      
    });     
   });