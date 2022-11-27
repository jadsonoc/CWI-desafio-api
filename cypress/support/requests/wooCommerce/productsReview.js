Cypress.Commands.add('postProductsReviewWooCommerce', (token, productReview) => {
    cy.request({
        method: 'POST',
        url: Cypress.env('wooCommerce') + Cypress.env('productsReview'),
        headers: {
            Authorization: token
        },
        body: {
            "product_id": productReview.product_id,
            "review": productReview.review,
            "reviewer": productReview.reviewer,
            "reviewer_email": productReview.reviewer_email,
            "rating": productReview.rating
        }
    });
});

Cypress.Commands.add('putProductsReviewWooCommerce', (token, productReviewId, productReview) => {
    cy.request({
        method: 'PUT',
        url: Cypress.env('wooCommerce') + Cypress.env('productsReview') + '/' + productReviewId,
        headers: {
            Authorization: token
        },
        body: {
            "review": productReview.review,
            "rating": productReview.rating
        }
    });
});

Cypress.Commands.add('deleteProductsReviewWooCommerce', (token, productReviewId) => {
    cy.request({
        method: 'DELETE',
        url: Cypress.env('wooCommerce') + Cypress.env('productsReview') + '/' + productReviewId + '?force=true',
        headers: {
            Authorization: token
        }
    });
});