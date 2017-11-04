const functionHolder = {}

const observerMenu = {
    addObserver: (name, func) => {
        functionHolder[name] = func
    },
    executeObserver: (name, param) => {
        functionHolder[name](param);
    }
}

export default observerMenu;