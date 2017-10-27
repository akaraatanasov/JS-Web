const fs = require('fs');

// utilities
function p(value) {
    console.log(value);
}


let storage = (function() {
    let memory = {};

    const EXPORT_FILE_NAME = 'storage.json';

    function wait(ms) {
        return new Promise(r => setTimeout(r, ms));
    }
      
    var self = this;
    async function put(key, value) {
        return new Promise( resolve => { 
            if (typeof key !== "string") {
                reject("Key is not string");
            }
    
            if (key in memory) {
                reject("Key already exists");
            }
            
            memory[key] = value;
            resolve(value);
        });
    }

    async function get(key) {
        return new Promise( resolve => { 
            if (typeof key !== "string") {
                reject("Key is not string");
            }

            if (! key in memory) {
                reject("Key already exists");
            }

            resolve(memory.key);
        });
    }

    async function getAll() {
        return new Promise( resolve => { 
                
            if (memory.length === 0) {
                console.log('Memory is empty! :(');
            }

            resolve(memory);
        });
    }

    async function update(key, value) {
        return new Promise( resolve => { 
            if (typeof key !== "string") {
                reject("Key is not string");
            }

            if (! key in memory) {
                reject("Key doesn't exists");
            }
            
            memory[key] = value;
            resolve(value);
        });
    }

    async function remove(key) {
        return new Promise( resolve => { 
            if (typeof key !== "string") {
                reject("Key is not string");
            }

            if (! key in memory) {
                reject("Key doesn't exists");
            }

            resolve();
            delete memory[key];
        });
    }

    function clear() {
        return new Promise( resolve => { 
            memory = {};

            resolve(memory);
        });
    }

    function save() {
        return new Promise( resolve => { 
            fs.writeFile(EXPORT_FILE_NAME, memory, 'utf8',  (err, data) => {
                memory = JSON.stringify(data);
                resolve(memory);
            });
        });
    }

    function load() {
        return new Promise( resolve => { 
            if (fs.existsSync(EXPORT_FILE_NAME)) {
                memory = JSON.parse(fs.readFile(EXPORT_FILE_NAME));
            }
            resolve(memory);
        });
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
        debug,
        EXPORT_FILE_NAME
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

storage.load().then(()=>{
    storage.put('first','firstValue')
    storage.put('second','secondValue')
    storage.put('third','thirdValue')
    storage.put('fouth','fourthValue')
    storage.remove('second')
    storage.update('first','updatedFirst')
    storage.save()
    storage.clear()
    storage.load()
}).then(() => {

    console.log(storage.getAll());
});
