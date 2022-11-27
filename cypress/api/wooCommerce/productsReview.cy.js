import tokenFixture from '../../fixtures/token.json'
import statusFixture from '../../fixtures/status.json'
import postProductsReviewWooCommerceSchema from '../../contracts/productsReview/post.contract'
import putProductsReviewWooCommerceSchema from '../../contracts/productsReview/put.contract'
import deleteProductsReviewWooCommerceSchema from '../../contracts/productsReview/delete.contract'
import { faker } from '@faker-js/faker'

describe('Products review WooCommerce', () => {
  //Variáveis comuns ao describe
  let productId = 0;
  let fakeReview = faker.lorem.sentence(5);
  let fakeFirstName = faker.name.firstName();
  let fakeLastName = faker.name.lastName();
  let fakeEmail = faker.internet.email(fakeFirstName, fakeLastName);
  let randomRating = Math.floor(Math.random() * (5 - 1) + 1);
  let reviewId = 0;

  it('Criar um product review com POST', () => {

    cy.getListAllProductsWooCommerce(tokenFixture.token).then((getListAllProductsResponse) => {
      //expect(getListAllProductsResponse.status).to.be.eq(200);
      let body = getListAllProductsResponse.body;
      body.sort(() => .5 - Math.random());
      productId = body[0].id;
    }).then(() => {

      var productReview = {
        product_id: productId,
        review: fakeReview,
        reviewer: fakeFirstName + " " + fakeLastName,
        reviewer_email: fakeEmail,
        rating: randomRating
      }

      cy.postProductsReviewWooCommerce(tokenFixture.token, productReview).then((postProductsReviewResponse) => {
        expect(postProductsReviewResponse.status).to.be.eq(statusFixture.created);
        reviewId = postProductsReviewResponse.body.id;
        return postProductsReviewWooCommerceSchema.validateAsync(postProductsReviewResponse.body);
      }).then(() => {
        cy.deleteProductsReviewWooCommerce(tokenFixture.token, reviewId);
      })
    })
  })
  
  it('Editar product review criado com PUT', () => {

    cy.getListAllProductsWooCommerce(tokenFixture.token).then((getListAllProductsResponse) => {
      let body = getListAllProductsResponse.body;
      body.sort(() => .5 - Math.random()); //Randomiza o retorno para não realizar o teste sempre com o primeiro
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
        reviewId = postProductsReviewResponse.body.id;
      }).then(() => {

        var productReviewEdit = {
          review: faker.lorem.sentence(10),
          rating: Math.floor(Math.random() * (10 - 1) + 1)
        }

        cy.putProductsReviewWooCommerce(tokenFixture.token, reviewId, productReviewEdit)
          .then((putProductsReviewResponse) => {
            expect(putProductsReviewResponse.status).to.be.eq(statusFixture.ok);
            return putProductsReviewWooCommerceSchema.validateAsync(putProductsReviewResponse.body);
        }).then(() => {
          cy.deleteProductsReviewWooCommerce(tokenFixture.token, reviewId);
        })
      })
    })
  })
  
  it('Deletar product review criado com DELETE', () => {

    cy.getListAllProductsWooCommerce(tokenFixture.token).then((getListAllProductsResponse) => {
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
        //expect(postProductsReviewResponse.status).to.be.eq(201);
        reviewId = postProductsReviewResponse.body.id;
      }).then(() => {

        cy.deleteProductsReviewWooCommerce(tokenFixture.token, reviewId).then((deleteProductsReviewResponse) => {
          expect(deleteProductsReviewResponse.status).to.be.eq(statusFixture.ok);
          expect(deleteProductsReviewResponse.body.deleted).to.be.true;
          return deleteProductsReviewWooCommerceSchema.validateAsync(deleteProductsReviewResponse.body);
        })
      })
    })
   })
})