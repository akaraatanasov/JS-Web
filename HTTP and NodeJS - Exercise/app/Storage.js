const fs = require('fs');

// utilities
function p(value) {
    console.log(value);
}


let storage = (function() {
    let memory = {};

    const EXPORT_FILE_NAME = 'storage.json';

    function put(key, value) {
        if (typeof key !== "string") {
            throw Error("Key is not string");
        }

        if (key in memory) {
            throw Error("Key already exists");
        }
        
        return memory[key] = value;
    }

    function get(key) {
        if (typeof key !== "string") {
            throw Error("Key is not string");
        }

        if (! key in memory) {
            throw Error("Key already exists");
        }

        return memory.key;
    }

    function getAll() {
        if (memory.length === 0) {
            console.log('Memory is empty! :(');
        }

        return memory;
    }

    function update(key, value) {
        if (typeof key !== "string") {
            throw Error("Key is not string");
        }

        if (! key in memory) {
            throw Error("Key doesn't exists");
        }
        
        return memory[key] = value;
    }

    function remove(key) {
        if (typeof key !== "string") {
            throw Error("Key is not string");
        }

        if (! key in memory) {
            throw Error("Key doesn't exists");
        }

        delete memory[key];
    }

    function clear() {
        memory = {};
    }

    function save() {
        let jsonMemory = JSON.stringify(memory);
        fs.writeFileSync(EXPORT_FILE_NAME, jsonMemory, 'utf8');
    }

    function load() {
        if (fs.existsSync(EXPORT_FILE_NAME)) {
            memory = JSON.parse(fs.readFileSync(EXPORT_FILE_NAME));
        }
    }

    function debug() {
        console.log(memory);
    }

    return {
        put,
        get,
        getAll,
        update,
        remove,
        clear,
        save,
        load,
        debug
    };
})();

/*
storage.put('existsTwice', '99');
storage.put('ab', 'im ab');
storage.put('1', 'im 1');
storage.put('goshko', 'im goshko');
storage.debug();

p(storage.get('ab'));
//storage.get(5);
//torage.get('non existent');

storage.remove('ab');
storage.debug();
storage.load();

storage.save();

storage.remove('1');

p(storage.getAll());

storage.load();
storage.debug();

*/

storage.load()
storage.put('first','firstValue')
storage.put('second','secondValue')
storage.put('third','thirdValue')
storage.put('fouth','fourthValue')
console.log(storage.get('first'))
console.log(storage.getAll())
storage.remove('second')
storage.update('first','updatedFirst')
storage.save()
storage.clear()
console.log(storage.getAll())
storage.load()
console.log(storage.getAll())
