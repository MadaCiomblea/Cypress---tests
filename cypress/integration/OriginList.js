describe("Check Origin List", function () {
  it("check if origin list exists", function () {
    cy.login_check();

    cy.wait(2000);

    cy.get(".round-button").click();
    cy.wait(2000);

    cy.get(".groups").contains("Lunch").click();
    cy.wait(2000);

    
    //         cy.get('div[class="origins-button round-button ng-star-inserted"]').scrollIntoView().should('not.be.visible')
    //         .log('The origin list is NOT visible!')

    //    cy.get('div[class="origins-button round-button ng-star-inserted"]').scrollIntoView().then(($btn) => {
    //        console.log($btn)
    //             if ($btn.hasClass('visible')) {
    //                 cy.log('yes')
    //             } else {
    //              cy.log('NOT')
    //             }
    //         })

  //  cy.get('div[class="origins-button round-button ng-star-inserted"]').scrollIntoView().should('be.visible')
  //          .click({force:true}) .log('The origin list is visible!')


  // cy.get('div[class="origins-button round-button ng-star-inserted"]').then(($btn)=>{

  //   if($btn.hasClass('active')){
  //     cy.log('exista')
  //   }else {
  //     cy.log('nu exista')
  //   }
 
  // })
    
  cy.get('div[class="origins-button round-button ng-star-inserted"]').then((subject)=> {
    
    console.log(subject[0])
    if(subject[0]){
      cy.log('The Origin List exists!')
      cy.get(subject[0]).scrollIntoView().click({force:true})
      cy.get('span[class="arabic-text"]').contains('عربي').log('Arabic Origin List exists!').click({force:true});
      cy.wait(3000)
      cy.get('span[class="english-text"]').contains('English').log('English Origin List exists!').click({force:true});
      cy.wait(3000)
      cy.get('div[class="popup"]')
      .find(
        'img[src*="close popup button.svg"]'
      ).click()
      
    }else{
      cy.log('nu')
    }
  })
 })

//     cy.wait(2000);
//   });
// });
//  let originList = cy.get('div[class="origins-button"]')
//  if(originList != null){
//  console.log('found')
//  }else{
//    console.log('error')
//  }
// cy.get('div[class="origins-button round-button ng-star-inserted"]').then((subject)=> {
// console.log('found')
// })
//   .catch((err) => {
//     // oh no the button wasn't found
//     // (or something else failed)
//     console.log('error')
//   })

})

