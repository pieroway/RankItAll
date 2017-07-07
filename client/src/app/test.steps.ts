/// <reference path="../../typings/globals/cucumber/cucumber.d.ts" />
'use strict';

import { assert } from 'chai';

__adapter__.addStepDefinitions(scenario => {

    var x;
    var y;

    scenario.Given(/^I load in (\d+) and (\d+)$/, (a: number, b: number) => {
        x = a;
        y = b;
    });

    scenario.Then(/^the values are equal$/, () => {
        assert.equal(x, y, `${x} not equal ${y}`);
    });


});