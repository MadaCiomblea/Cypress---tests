import "cypress-localstorage-commands";
import 'cypress-wait-until';

Cypress.Commands.add("login_event", function () {

    let grantType = "grant_type=client_credentials";
    let clientSecret = "#";
    let customerSiteLogin = 1 + "";
    let access_token = " ";
    cy.wait(1000)

    cy.request({
        method: "POST",
        url: `${Cypress.env("apiUrl")}/api/event/manager/reservations/create`,
        headers: {
            Authorization: Cypress.env("waiter_token"),
            "Content-Type": "application/json",
            BranchId: Cypress.env("branchEvent"),
            RestaurantId: Cypress.env("restaurantEvent"),
            systemHealthMonitor: "[]",
            deviceId: Cypress.env("deviceID"),
            MenuId: 12469,
            StoreId: null,
            CompanyId: 439
        },
        body: {
            customerData: {
                email: "madalina.ciomblea@roweb.ro",
                firstName: "automation",
                lastName: "test",
                phone: "001234567890",
                phonePrefix: "123"

            },
            day: new Date().getDate(),
            isFree: true,
            isPrivate: false,
            month: new Date().getMonth() + 1,
            numGuests: 2,
            sendEmail: false,
            sendSMS: false,
            ticketId: 198,
            year: new Date().getFullYear(),
        },
    }).then((reservationId) => {
        console.log(reservationId.body)
      //  console.log(new Date().getDate())
      

        cy.request({
            method: "POST",
            url: `${Cypress.env("apiUrl")}/api/event/waiter/checkin`,
            headers: {
                Authorization: Cypress.env("waiter_token"),
                "Content-Type": "application/json",
                BranchId: Cypress.env("branchEvent"),
                RestaurantId: Cypress.env("restaurantEvent"),
                systemHealthMonitor: "[]",
                deviceId: Cypress.env("deviceID"),
                menuid: Cypress.env("menuid"),
                menuconstraintid: Cypress.env("menuconstraintid")
            },
            body: {
                arrivedPartySize: 1,
                id: reservationId.body
            },
        }).then(() => {
            cy.wait(4000)
            cy.request({
                method: "POST",
                url: `${Cypress.env("apiUrl")}/api/mobile/waiter/visit/new`,
                headers: {
                    Authorization: Cypress.env("waiter_token"),
                    "Content-Type": "application/json",
                    BranchId: Cypress.env("branchEvent"),
                    RestaurantId: Cypress.env("restaurantEvent"),
                    systemHealthMonitor: "[]",
                    deviceId: Cypress.env("deviceIDEvent"),
                    menuid: Cypress.env("menuid"),
                    menuconstraintid: Cypress.env("menuconstraintid")
                },
                body: {
                    tableIds: [4089],
                    reservationId: reservationId.body,
                    partySize: 2,
                    mobile: "001234567890",
                    name: "automation test",
                    onlySeated: true,
                    employeeId: 1340

                },
            }).then((order_id) => {
                console.log(order_id.body.orderId)

                cy.wait(2000)
                cy.request({
                    method: "GET",
                    url: `${Cypress.env("firebaseUrl")}/viewStore/${Cypress.env("restaurantEvent")}/${Cypress.env("branchEvent")}/orders/${order_id.body.orderId}/scalars.json`,

                }).then((customerCode) => {
                    cy.wait(3000)
                    customerCode.body.connectionCode;
                    let body =
                        grantType +
                        "&client_secret=" +
                        encodeURIComponent(clientSecret) +
                        "&client_id=" +
                        encodeURIComponent(customerCode.body.connectionCode) +
                        "&customer-site-login=" +
                        encodeURIComponent(customerSiteLogin);
                    let headers = {
                        "Content-Type": "application/x-www-form-urlencoded",
                        RestaurantId: Cypress.env("restaurantEvent") + "",
                        BranchId: Cypress.env("branchEvent") + "",
                    };
                    cy.intercept(`${Cypress.env("apiUrl")}/oauth/token`).as('oauth')

                    cy.request({
                        method: "POST",
                        url: `${Cypress.env("apiUrl")}/oauth/token`,
                        body: body,
                        headers: headers,
                    }).then(({ body }) => {
                        access_token = body;


                        cy.visit(
                            `${Cypress.env("baseUrl")}/login/${Cypress.env("restaurantEvent")}/${Cypress.env("branchEvent")}/${customerCode.body.connectionCode}`
                        );
                    });
                    cy.wait('@oauth').its('response.statusCode').should('eq', 200)
                })
            })
        })
    })
})




