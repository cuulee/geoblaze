'use strict';

let expect = require('chai').expect;

let load = require('../load/load');
let identify = require('./identify');

let url = 'http://localhost:3000/data/test.tiff';
let point = [80.63, 7.42];
let expected_value = 350.7;

let test = () => (
    describe('Gio Identify Feature', function() {
        describe('Identify Point in Raster', function() {
            this.timeout(1000000);
            it('Identified Point Correctly', () => {
                return load(url).then(georaster => {
                    let value = identify(georaster, point)[0];
                    expect(value).to.equal(expected_value);
                });
            });
        });
        describe('Try to identify point outside raster', function() {
            this.timeout(1000000);
            it('Correctly returned null', () => {
                return load(url).then(georaster => {
                    let value = identify(georaster, [-200, 7.42]);
                    expect(value).to.equal(null);
                });
            });
        });
    })
)

test();

module.exports = test;
