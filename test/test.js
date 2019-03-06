'use strict';

const chai = require('chai');
const expect = chai.expect;
const nonBlockingBcrypt = require('../index');


describe('getSalt', () => {

    it('should return a promise with a salt as object ', async () => {
        try {

            const {salt} = await nonBlockingBcrypt.genSalt();
            expect(salt).to.be.a.string();
        }
        catch (err) {

        }
    });


});

describe('getHash', () => {

    it('should throw an error salt and password are required ', async () => {
        try {

            const {hash} = await nonBlockingBcrypt.genHash();
        }
        catch (err) {
            expect(err).to.equal('salt and password are required');

        }
    });
    it('should throw an error salt and password are required ', async () => {
        try {

            const {hash} = await nonBlockingBcrypt.genHash('sdsasdsafasf','asd');
        }
        catch (err) {
            expect(err).to.equal('Invalid salt version');

        }
    });
    it('should return a promise with a hash as object ', async () => {
        try {
            const {salt} = await nonBlockingBcrypt.genSalt();
            const {hash} = await nonBlockingBcrypt.genHash(salt, 'sdsasdsafasf');
            expect(hash).to.be.a.string();
        }
        catch (err) {

        }
    });


});

describe('getHash', () => {

    it('should throw an error salt and password are required ', async () => {
        try {

            const {hash} = await nonBlockingBcrypt.genHash();
        }
        catch (err) {
            expect(err).to.equal('salt and password are required');

        }
    });
    it('should throw an error salt and password are required ', async () => {
        try {

            const {hash} = await nonBlockingBcrypt.genHash('sdsasdsafasf','sss');
        }
        catch (err) {
            expect(err).to.equal('Invalid salt version');

        }
    });
    it('should return a promise with a hash as object ', async () => {
        try {
            const {salt} = await nonBlockingBcrypt.genSalt();
            const {hash} = await nonBlockingBcrypt.genHash(salt, 'sdsasdsafasf');
            expect(hash).to.be.a.string();
        }
        catch (err) {

        }
    });


});
describe('compare', () => {

    it('should throw an error password and hashedPassword are required', async () => {
        try {

            const {hash} = await nonBlockingBcrypt.compare();
        }
        catch (err) {
            expect(err).to.equal('password and hashedPassword are required');

        }
    });
    it('should throw an error salt and password are required ', async () => {
        try {

            const {hash} = await nonBlockingBcrypt.compare('sdsasdsafasf');
        }
        catch (err) {
            expect(err).to.equal('password and hashedPassword are required');

        }
    });
    it('should return a promise with a hash as object ', async () => {
        try {
            const {salt} = await nonBlockingBcrypt.genSalt();
            const {hash} = await nonBlockingBcrypt.genHash(salt, 'sdsasdsafasf');
            const match = await nonBlockingBcrypt.compare('sdsasdsafasf', hash);
            expect(match).to.be.a.equal(true);
        }
        catch (err) {

        }
    });


});

describe('saltAndHash', () => {

    it('should throw an error password is required', async () => {
        try {

            const {hash} = await nonBlockingBcrypt.saltAndHash();
        }
        catch (err) {
            expect(err).to.equal('password is required');

        }
    });

    it('should return a promise with a hash as object ', async () => {
        try {
            const {hash} = await nonBlockingBcrypt.saltAndHash('sdsasdsafasf');
            expect(hash).to.be.a.string();
        }
        catch (err) {

        }
    });


});