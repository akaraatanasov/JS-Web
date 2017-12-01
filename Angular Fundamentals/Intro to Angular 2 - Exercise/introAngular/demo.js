"use strict";
var reducerFunc = function () {
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
    }
    var tempSumator = 0;
    params.map(function (num) {
        tempSumator += num;
    });
    console.log(tempSumator);
};
reducerFunc(1, 2, 3);
var Car = /** @class */ (function () {
    function Car(color, engine) {
        this.color = color;
        this.engine = engine;
    }
    Car.prototype.start = function () {
        console.log('My color is ' + this.color + ' and I have ' + this.engine + ' engine.');
    };
    return Car;
}());
var minimalCar = /** @class */ (function () {
    function minimalCar(color, engine) {
        this.color = color;
        this.engine = engine;
    }
    minimalCar.prototype.start = function () {
        console.log('My color is ' + this.color + ' and I have ' + this.engine + ' engine.');
    };
    return minimalCar;
}());
var Lambo = new Car('black', 'V8');
Lambo.start();
var BMW = new minimalCar('white', 'V12');
BMW.start();
var pesho = {
    name: 'Pesho',
    age: 12
};
var gosho = {
    name: 'Gosho',
    age: 15
};
var cal = function () {
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
    }
    params.map(function (h) {
        console.log(h);
    });
};
cal(pesho, gosho);
