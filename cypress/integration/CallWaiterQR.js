

describe("Call Waiter test", function () {

    it("Login check", function () {

      //cy.visit(`http://customer.nextbite.webdev.roweb.ro/login/424/520/C996682`);
      cy.login_check()
     
     /* let grantType = "grant_type=client_credentials";
      let clientSecret = "#";
      let customerSiteLogin = 1 + "";
      let access_token = " ";
      
  
      let body =
        grantType +
        "&client_secret=" +
        encodeURIComponent(clientSecret) +
        "&client_id=" +
        encodeURIComponent("C996682") +
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
       
        cy.visit(`http://customer.nextbite.webdev.roweb.ro/login/424/520/C996682`);
        
      });  */   
     })
    
     it("Call Waiter", function(){
  
  
      cy.get('.round-button').click();
      cy.get('.groups').contains('Menu').click();

     

      cy.get('div[class="round-button call-waiter noselect ng-star-inserted"]').should('be.visible').contains('Call Waiter').click({multiple:true, force:true})
     
      
     cy.request({
      method: 'POST',
      url: 'http://api.nextbite.webdev.roweb.ro/api/mobile/waiter/removewaiternotification/13282',
      headers: { Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1laWQiOiI2NmIzOTc1NS05NzkwLTRiY2EtODFhYi1iZWZiYWU4MjI4YmYiLCJ1bmlxdWVfbmFtZSI6Im1tMTIzNEBuZXh0Yml0ZS5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL2FjY2Vzc2NvbnRyb2xzZXJ2aWNlLzIwMTAvMDcvY2xhaW1zL2lkZW50aXR5cHJvdmlkZXIiOiJBU1AuTkVUIElkZW50aXR5IiwiQXNwTmV0LklkZW50aXR5LlNlY3VyaXR5U3RhbXAiOiJkYmVjZTk4NC1jODk3LTQ2Y2YtOWJlNi02MzU5YzZkYmQ1NWIiLCJyb2xlIjoiV2FpdGVyVXNlciIsIkZURSI6IjEiLCJDdXJyZW50VXNlcklkIjoiNjZiMzk3NTUtOTc5MC00YmNhLTgxYWItYmVmYmFlODIyOGJmIiwiU2VjdXJpdHlTdGFtcCI6ImRiZWNlOTg0LWM4OTctNDZjZi05YmU2LTYzNTljNmRiZDU1YiIsImVtYWlsIjoibW0xMjM0QG5leHRiaXRlLmNvbSIsIlVzZXJGdWxsTmFtZSI6Ik1XYWl0ZXIgZWRpdCIsImlzQnJhbmNoQWRtaW4iOiJUcnVlIiwiVGFibGV0QWRtaW4iOiJ0cnVlIiwiY29tcGFueUlkIjoiMzYyIiwiaXNzIjoiaHR0cDovL2FwaS5uZXh0Yml0ZS53ZWJkZXYucm93ZWIucm8iLCJhdWQiOiI0MTRlMTkyN2EzODg0ZjY4YWJjNzlmNzI4MzgzN2ZkMSIsImV4cCI6MTYxOTUzNTkyMywibmJmIjoxNjE5NDk5OTIzfQ.GgbrEd-BndOn_SCQmw128JwlBEX-gVrafQzVArxDlqk`, RestaurantId: 424 + "",
      BranchId: 520 + "", "Content-Type": "application/json ; charset=utf-8 ", DeviceId: "FEB34112-45C6-4FB5-B5DC-CB10E802F1F0"},
      body: {
        "" : "",
    },
    });
    });

    it("QR Code", function(){
  
      let urlQR = `http://customer.nextbite.webdev.roweb.ro/login/424/520/C996682`;
      cy.get('div[class="round-button noselect"]').should('be.visible').contains('Show QR').click({multiple:true, force:true})

      //cy.get('[alt="Scan me!"]').eq(urlQR)
     // cy.get('body > ordering-app-root > div > customer-app > app-swipe > app-show-qr > div > div.qr-container > qrcode')

     //cy.get('div[class="qr-container"]').find('img[src*="data:image/png;base64,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"]')
     //.contains(urlQR);

    // cy.get('div[class="qr-container"]').find('qrcode[title]').contains(urlQR)

    cy.get('div[class="qr-container"]').get('qrcode').then(elem => {
      
      let url = elem[0].title
      expect(url).equal(urlQR);
   })
     
  });
});