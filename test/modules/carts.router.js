import { expect } from "chai";
import supertest from "supertest";
import { beforeEach, describe, it } from "node:test";

const requester= supertest('http://localhost:8080');

describe('Tiendita de erick cart testing', function() {
    beforeEach(async function () {
        //this.timeout(10000);
     })
 
    it('Expect to create a cart', async function(){
    const mockCart={
        customer: "exampletest@mail.com",
        products: []
    }
    const {statusCode,ok,_body} = await requester.post('/api/carts').send(mockCart);
     expect(statusCode).to.be.equal(201);
     expect(ok).to.be.ok;
     expect(Array.isArray(_body)).to.be.ok;
 })
 it('Expect to get carts list', async function() {
    const {statusCode,ok,_body}= await requester.get('/api/carts');
    expect(statusCode).to.be.equal(200);
    expect(ok).to.be.ok;
    expect(Array.isArray(_body)).to.be.ok;
 })
 it('Expect to delete products from cart', async function() {
    const {statusCode,ok}= await requester.delete('/api/carts/658a136977a656c2787cbfbe/products/6580de5a2d34bce12f80d4cf');
    expect(statusCode).to.be.equal(204);
    expect(ok).to.be.ok;

 })
});