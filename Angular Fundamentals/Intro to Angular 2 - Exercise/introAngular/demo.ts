let reducerFunc = (...params: number[]) => {
    let tempSumator: number = 0;

    params.map(num => {
        tempSumator += num;
    });

    console.log(tempSumator);
}

reducerFunc(1, 2, 3);

class Car {
    private color: string;
    private engine: string;

    constructor(color: string, engine: string) {
        this.color = color;
        this.engine = engine;
    }

    start() {
        console.log('My color is ' + this.color + ' and I have ' + this.engine + ' engine.');
    }
}

class minimalCar {
    constructor(private color: string, private engine: string) { }
    
    start() {
        console.log('My color is ' + this.color + ' and I have ' + this.engine + ' engine.');
    }
}

let Lambo = new Car('black', 'V8');
Lambo.start();

let BMW = new minimalCar('white', 'V12');
BMW.start();

interface human {
    name: string;
    age?: number;
}

let pesho: human = {
    name: 'Pesho',
    age: 12
}

let gosho: human = {
    name: 'Gosho',
    age: 15
}

let cal = (...params: human[]) => { // Array<human>
    params.map(h => {
        console.log(h);
    });
}

cal(pesho, gosho);