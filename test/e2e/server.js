var server = require('../../server/components/server'),
    request = require('request'),
    expect = require("chai").expect;

describe('server', function () {
    before(function () {
        server();
    });

    describe('/prime-number', function () {
        it('should return 404 available just post method', function (done) {
            request.get('http://localhost:3000/prime-number', function (err, res) {
                expect(res.statusCode).to.equal(404);
                done();
            });
        });

        it('should return 200 or 301', function (done) {
            request.post({
                url:'http://localhost:3000/prime-number',
                json: {maxValue: 3}
            }, function(err,res,body){
                expect([200, 301]).to.include(res.statusCode);
                done();
            });
        });

        it('should should return 3571 for number 3571', function (done) {
            var value = 3571;
            request.post({
                url:'http://localhost:3000/prime-number',
                json: {maxValue: value}
            }, function(err,res,body){
                console.log(body);
                expect(body.number).to.equal(value);
                done();
            });
        });


    });

    describe('/any-unexpected-url', function () {
        it('should return 404', function (done) {
            request.get('http://localhost:3000/any-unexpected-url', function (err, res) {
                expect(res.statusCode).to.equal(404);
                done();
            });
        });
    });
});

