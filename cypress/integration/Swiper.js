describe("Swiper", function () {
    
    beforeEach(() => {
        cy.viewport('samsung-s10')
      })
    
    
    it("Swipe to the next page", function () {
      cy.login_check();
      cy.wait(2000);
  
      cy.get(".round-button").click();
      cy.wait(2000);
      cy.ads_manager();
      cy.get(".groups").contains("Lunch").click();
      cy.wait(2000);
     
      cy.contains("Test_NewMustTRY").click();
      
      cy.contains("ADD").click();


      cy.get('#book1 .page1').should('have.attr', 'style').and('match', /translateX\(0px/)
      cy.get('#book1 .page2').should('have.attr', 'style').and('match', /translateX\(344px/)
      cy.get('#book1 .page1').swipe('right', 'left')
      cy.wait(200)
      cy.get('#book1 .page1').should('have.attr', 'style').and('match', /translateX\(-344px/)
      cy.get('#book1 .page2').should('have.attr', 'style').and('match', /translateX\(0px/)
  

    })
})  