import { expect } from "chai";
import supertest from "supertest";
import {logger} from "../../src/config/logger.js"
import { describe, it } from "node:test";
import mongoose from "mongoose";

const requester= supertest('http://localhost:8080');

describe('Tiendita de erick products testing', function() {

it('Expect to obtain product list', async function(){
    const {statusCode,ok,_body}= await requester.get('/api/products');
    expect(statusCode).to.be.equal(200);
    expect(ok).to.be.ok;
    expect(_body).to.have.property('status')
    expect(_body).to.have.property('payload');
    expect(Array.isArray(_body.payload)).to.be.ok;

});

it('Expect to obtain product by id', async function(){
    const {statusCode,ok,_body}= await requester.get('/api/products/6580deb71481ce3bc00d06cc');
    expect(statusCode).to.be.equal(200);
    expect(ok).to.be.ok;
    logger.debug(_body);
    expect(_body).to.have.property('_id','6580deb71481ce3bc00d06cc');
    expect(_body).to.have.property('category','productos buenos');
});
it('Expect to delete product by id', async function() {
    const {statusCode,ok,_body}= await requester.delete('/api/products/6580df0e1481ce3bc00d06d2');
    expect(statusCode).to.be.equal(204);
    expect(ok).to.be.ok;
});
 it('Expect to create 100 mocking products', async function() {
    //await mongoose.connection.collections.products.drop();
    const {statusCode}= await requester.post('/api/mockingproducts');
    const {ok,_body}= await requester.get('/api/products');
    expect(statusCode).to.be.equal(201);
    expect(ok).to.be.ok;
    expect(_body).to.have.property('status')
    expect(_body).to.have.property('payload');
    expect(Array.isArray(_body.payload)).to.be.ok;  
 } )
});