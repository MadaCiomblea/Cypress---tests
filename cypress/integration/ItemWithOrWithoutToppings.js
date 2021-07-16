describe("Items with or without toppings", function () {
  beforeEach(() => {
    cy.restoreLocalStorage();
});

afterEach(() => {
    cy.saveLocalStorage();
});
after(() => {
    cy.clear_table();
})

  it("Click on items that have toppings", function () {
    cy.login_check();
    cy.wait(2000);

    cy.get(".round-button").click();
    cy.wait(2000);
    cy.ads_manager();
    cy.get(".groups").contains("Lunch").click();
    cy.wait(2000);

    cy.request({
      method: "GET",
      url: `https://local-test-eth35w.firebaseio.com/viewStore/424/menu/dishes.json`,
      
    }).then((resp) => {
      cy.wait(3000)
     var dish = Object.values(resp.body).find(dish => dish.name == "Oregano Fries");
     console.log(dish, dish.itemExtras!==undefined)

    var hasValidExtras = dish!== undefined && dish.itemExtras!==undefined && dish.itemExtras.length && dish.itemExtras.some(extra => extra.itemToppings.some(topping => topping.available));
    
        cy.get(
          ":nth-child(4) > .swiper-slide > app-dish > #dish > .details > .add > .round-button"
        ).click({ force: true }).then(($item)=>{
         // console.log(cy.get(".details-content > .dish-details"))
          if(hasValidExtras){
            cy.log("The topping exists! The dish details popup is open!")
            cy.get(".details-content > .dish-details").should('be.visible')
            cy.get(':nth-child(4) > .swiper-slide > app-dish > #dish > .details > .add > .round-button').should('not.be.visible')
          }else{
            cy.log("Toppings don't exist! The footer appears!")
            cy.get(':nth-child(4) > .swiper-slide > app-dish > #dish > .details > .add > .round-button').should('be.visible')
          }
        })
  });
}); 
  it("Click on items that not have toppings", function () {
  cy.request({
    method: "GET",
    url: `https://local-test-eth35w.firebaseio.com/viewStore/424/menu/dishes.json`,
    
  }).then((resp) => {
    cy.wait(3000)
   var dish = Object.values(resp.body).find(dish => dish.name == "Capra Salad");
   console.log(dish, dish.itemExtras!==undefined)

  var hasValidExtras = dish.itemExtras!==undefined && dish.itemExtras.length && dish.itemExtras.some(extra => extra.itemToppings.some(topping => topping.available));
  
  cy.get(':nth-child(2) > .swiper-slide > app-dish > #dish > .details > .add > .round-button').click({ force: true }).then(($item)=>{
       // console.log(cy.get(".details-content > .dish-details"))
        if(hasValidExtras){
          cy.log("The topping exists! The dish details popup is open!")
          cy.get(".details-content > .dish-details").should('be.visible')
        }else{
          cy.log("Toppings don't exist! The footer appears!")
          cy.get(':nth-child(2) > .swiper-slide > app-dish > #dish > .details > .add > .round-button').should('be.visible')
          
        }
      })
});

});
});