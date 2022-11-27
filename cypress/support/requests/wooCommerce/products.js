Cypress.Commands.add('getListAllProductsWooCommerce', (token) => {
    cy.request({
        method: 'GET',
        url: Cypress.env('wooCommerce') + Cypress.env('products'),
        headers: {
            Authorization: token
        }
    });
});