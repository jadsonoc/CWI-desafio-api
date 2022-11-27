import tokenFixture from '../../fixtures/token.json'
import { faker } from '@faker-js/faker'

describe('Products', () => {

  it.skip('Criar um product review com POST', () => {
    let productId = 0;
    let fakeReview = faker.lorem.sentence(5);
    let fakeFirstName = faker.name.firstName();
    let fakeLastName = faker.name.lastName();
    let fakeEmail = faker.internet.email(fakeFirstName, fakeLastName);
    let randomRating = Math.floor(Math.random() * (5 - 1) + 1);
    let reviewId = 0;
    
    cy.getListAllProductsWooCommerce(tokenFixture.token).then((getListAllProductsResponse) => {
      expect(getListAllProductsResponse.status).to.be.eq(200);
      let body = getListAllProductsResponse.body;
      body.sort(() => .5 - Math.random());
      productId = body[0].id;
    }).then(() => {
      
      var productReview = {
        product_id: 22,
        review: fakeReview,
        reviewer: fakeFirstName + " " + fakeLastName,
        reviewer_email: fakeEmail,
        rating: randomRating
      }

      cy.postProductsReviewWooCommerce(tokenFixture.token, productReview).then((postProductsReviewResponse) => {
        expect(postProductsReviewResponse.status).to.be.eq(201);
        reviewId = postProductsReviewResponse.body.id;
        alert(reviewId);
      })

    })

  })
  
  it.skip('Editar product review criado com PUT', () => {
    let productId = 0;
    let fakeReview = faker.lorem.sentence(5);
    let fakeFirstName = faker.name.firstName();
    let fakeLastName = faker.name.lastName();
    let fakeEmail = faker.internet.email(fakeFirstName, fakeLastName);
    let randomRating = Math.floor(Math.random() * (5 - 1) + 1);
    let reviewId = 0;
    
    cy.getListAllProductsWooCommerce(tokenFixture.token).then((getListAllProductsResponse) => {
      expect(getListAllProductsResponse.status).to.be.eq(200);
      let body = getListAllProductsResponse.body;
      body.sort(() => .5 - Math.random());
      productId = body[0].id;
    }).then(() => {
      
      var productReviewCreate = {
        product_id: 22,
        review: fakeReview,
        reviewer: fakeFirstName + " " + fakeLastName,
        reviewer_email: fakeEmail,
        rating: randomRating
      }

      cy.postProductsReviewWooCommerce(tokenFixture.token, productReviewCreate).then((postProductsReviewResponse) => {
        expect(postProductsReviewResponse.status).to.be.eq(201);
        reviewId = postProductsReviewResponse.body.id;
      }).then(() => {

        var productReviewEdit = {
          review: faker.lorem.sentence(10),
          rating: Math.floor(Math.random() * (10 - 1) + 1)
        }
        cy.putProductsReviewWooCommerce(tokenFixture.token, reviewId, productReviewEdit).then((putProductsReviewResponse) => {
          expect(putProductsReviewResponse.status).to.be.eq(200);
          alert(reviewId);
        })
      })
    })
  })
  
  it.only('Deletar product review criado com DELETE', () => {
    let productId = 0;
    let fakeReview = faker.lorem.sentence(5);
    let fakeFirstName = faker.name.firstName();
    let fakeLastName = faker.name.lastName();
    let fakeEmail = faker.internet.email(fakeFirstName, fakeLastName);
    let randomRating = Math.floor(Math.random() * (5 - 1) + 1);
    let reviewId = 0;
    
    cy.getListAllProductsWooCommerce(tokenFixture.token).then((getListAllProductsResponse) => {
      expect(getListAllProductsResponse.status).to.be.eq(200);
      let body = getListAllProductsResponse.body;
      body.sort(() => .5 - Math.random());
      productId = body[0].id;
    }).then(() => {
      
      var productReviewCreate = {
        product_id: productId,
        review: fakeReview,
        reviewer: fakeFirstName + " " + fakeLastName,
        reviewer_email: fakeEmail,
        rating: randomRating
      }

      cy.postProductsReviewWooCommerce(tokenFixture.token, productReviewCreate).then((postProductsReviewResponse) => {
        expect(postProductsReviewResponse.status).to.be.eq(201);
        reviewId = postProductsReviewResponse.body.id;
      }).then(() => {

        cy.deleteProductsReviewWooCommerce(tokenFixture.token, reviewId).then((deleteProductsReviewResponse) => {
          expect(deleteProductsReviewResponse.status).to.be.eq(200);
          expect(deleteProductsReviewResponse.body.deleted).to.be.true;
          alert(reviewId);
        })
      })
    })
   })

})