var config = require('../config');
var expect = require('chai').expect;
var request = require('request');
var sinon = require('sinon');
var bitproofModule = require('../index.js');

describe('Bitproof', function () {
    var bitproof = new bitproofModule('keyHash', 'secretHash');

    before(function (done) {
        var expectedResponse = {statusCode: 200};

        sinon
            .stub(request, 'get')
            .yields(null, expectedResponse, JSON.stringify({data: 'getRequest'}));


        sinon
            .stub(request, 'post')
            .yields(null, expectedResponse, JSON.stringify({data: 'postRequest'}));
        done();
    });

    describe('constructor', function () {

        it('should setup an api key', function () {
            expect(bitproof.key).to.equal('keyHash');
        });

        it('should setup an api secret', function () {
            expect(bitproof.secret).to.equal('secretHash');
        });

    });

    describe('getAuthHeaders', function () {

        it('should return an object', function () {
            expect(bitproof.getAuthHeaders()).to.be.an('object');
        });

        describe('object', function () {

            it('should contain API_KEY', function () {
                expect(bitproof.getAuthHeaders().API_KEY).to.equal('keyHash');
            });

            it('should contain API_SECRET', function () {
                expect(bitproof.getAuthHeaders().API_SECRET).to.equal('secretHash');
            });

        });
    });

    describe('readOptions', function () {

        it('should return an object', function () {
            expect(bitproof.readOptions('hexadecimal')).to.be.an('object');
        });

        describe('object', function () {

            it('should contain uri', function () {
                expect(bitproof.readOptions('hexa').uri).to.equal(config.urls.read);
            });

            it('should contain a qs object', function () {
                expect(bitproof.readOptions('hexa').qs).to.be.an('object');
            });

            describe('qs object', function () {

                it('should contain txid', function () {
                    expect(bitproof.readOptions('hexa').qs.txid).to.equal('hexa');
                });

            });

        });
    });

    describe('read', function () {

        it('should call request.get and return json', function (done) {
            bitproof.read('hexadecimal', function (body) {
                expect(body).to.be.a('string');
                expect(JSON.parse(body)).to.be.an('object');
                expect(JSON.parse(body).data).to.equal('getRequest');
            }, function (error) {
            });
            done();
        });

    });

    describe('pushOptions', function () {

        it('should return an object', function () {
            expect(bitproof.pushOptions('hexadecimal')).to.be.an('object');
        });

        describe('object', function () {

            it('should contain uri', function () {
                expect(bitproof.pushOptions('hexadecimal').uri).to.equal(config.urls.push);
            });

            it('should contain headers object', function () {
                expect(bitproof.pushOptions('hexadecimal').headers).to.deep.equal(bitproof.getAuthHeaders());
            });

            it('should return a json object', function () {
                expect(bitproof.pushOptions('hexadecimal').json).to.be.an('object');
            });

            describe('json object', function () {

                it('should contain data', function () {
                    expect(bitproof.pushOptions('hexadecimal').json.data).to.equal('hexadecimal');
                });

            });
        });
    });

    describe('push', function () {

        it('should call request.post and return json', function (done) {
            bitproof.push('hexadecimal', function (body) {
                expect(body).to.be.a('string');
                expect(JSON.parse(body)).to.be.an('object');
                expect(JSON.parse(body).data).to.equal('postRequest');
            }, function (error) {
            });
            done();
        });

    });
});
