import { expect } from "chai";
import supertest from "supertest";
import { createHash } from "../../src/utils.js";
import { logger } from "../../src/config/logger.js";
import { before, describe, it } from "node:test";




const requester= supertest('http://localhost:8080');

describe('Tiendita de erick auth testing', function() {
before(function() {
    this.cookie={};
    this.email='';
});
it('Expect to register an user',async function() {
    this.email=`testuser${Date.now()/3600}@mail.com`;
    const newCart ={
        customer: this.email,
        products: []
     }
    const result = await requester.post('/api/carts').send(newCart);
    const user ={
        first_Name:'test user',
         last_Name:'customer',
         email:this.email,
         password: createHash("test123"),
         age:"99",
         cart: newCart._id,
     };
    const {statusCode} = await requester.post('/api/session/register').send(user)
    expect(statusCode).to.be.ok;
    logger.debug('register successful')
});
it('Expect to log an user in', async function() {
const userLog={
    email:'hola@mail.com',
    password:'hongosOrellanas',
};
const {headers,statusCode,_body,ok}=requester.post('/api/session/login').send(userLog);
console.log('_body',_body);
console.log('headers',headers);
const [key,value]=headers['set-cookie'][0].split('=');
console.log('key',key);
console.log('value',value);
this.cookie.key=key;
this.cookie.value=value;
console.log(this.cookie);
logger.debug('logged successfully');
});
it('Expect to obtain user information', async function() {
    const {headers,statusCode,_body,ok}=(await requester.get('/api/session/current')).setEncoding('Cookie',[`${this.cookie.key}=${this.cookie.value}`]);
    expect(statusCode).to.be.equal(200);
    expect(ok).to.be.ok;
    expect(_body).to.have.property('payload');
    console.log('_body',_body);


});

});