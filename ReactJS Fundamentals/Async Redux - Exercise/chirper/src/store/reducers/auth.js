export default (store = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
            console.log(action.payload)
            return store
            
        default:
            return store
    }
}