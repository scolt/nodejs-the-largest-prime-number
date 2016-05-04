var server = require('../../server/app'),
    request = require('request'),
    expect = require("chai").expect;

describe('server', function () {
    describe('route /prime-number', function () {
        it('should return 404 for GET available just POST method', function (done) {
            request.get('http://localhost:1222/prime-number', function (err, res) {
                expect(res.statusCode).to.equal(404);
                done();
            });
        });

        it('should return 200 for POST method', function (done) {
            request.post({
                url:'http://localhost:1222/prime-number',
                json: {maxValue: 3}
            }, function(err,res,body){
                expect([200]).to.include(res.statusCode);
                done();
            });
        });

        it('should return 3571 for number 3571', function (done) {
            var value = 3571;
            request.post({
                url:'http://localhost:1222/prime-number',
                json: {maxValue: value}
            }, function(err,res,body){
                expect(body.number).to.equal(value);
                done();
            });
        });

        it('should return 500 for invalid value', function (done) {
            var value = 3571;
            request.post({
                url:'http://localhost:1222/prime-number',
                json: {maxValue: 'SOME-NaN-VALUE'}
            }, function(err,res){
                expect(res.statusCode).to.equal(500);
                done();
            });
        });

        it('should return 500 for empty value', function (done) {
            var value = 3571;
            request.post({
                url:'http://localhost:1222/prime-number',
                json: {maxValue: ''}
            }, function(err,res){
                expect(res.statusCode).to.equal(500);
                done();
            });
        });


    });

    describe('/any-unexpected-url', function () {
        it('should return 404', function (done) {
            request.get('http://localhost:1222/any-unexpected-url', function (err, res) {
                expect(res.statusCode).to.equal(404);
                done();
            });
        });
    });
});

