var expect    = require("chai").expect;
var calculate = require("../server/components/calculate");

describe("Find largest prime numebr by max value", function() {
    describe("for the lower limit numbers", function () {
        it(" should return null for number 0 ", function() {
            expect(calculate.findByMaxValue(0)).to.equal(null);
        });

        it(" should return null for number 1 ", function() {
            expect(calculate.findByMaxValue(1)).to.equal(null);
        });
    });

    describe("for the lower limit for the maxValue equls prime numbers", function () {
        it(" should return 2 for number 2 ", function() {
            expect(calculate.findByMaxValue(2)).to.equal(2);
        });

        it(" should return 3571 for number 3571", function() {
            expect(calculate.findByMaxValue(3571)).to.equal(3571);
        });
    });

    describe("for the lower limit for the big numbers", function () {
        it(" should return 9999991 for number 9999999 ", function() {
            expect(calculate.findByMaxValue(9999999)).to.equal(9999991);
        });

        it(" should return 3571 for number 3571", function() {
            this.timeout(5000);
            expect(calculate.findByMaxValue(999999999)).to.equal(999999937);
        });
    });

    describe("for the unexpected values", function () {
        it(" should return null for null ", function() {
            expect(calculate.findByMaxValue(null)).to.equal(null);
        });
    });

});