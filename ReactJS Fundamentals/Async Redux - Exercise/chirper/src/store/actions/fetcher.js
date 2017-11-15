import status from './status'

const appKey = 'kid_Bk7cAl5kz'
const appSecret = '2f56d131b72f469caef20a51c464a846'

export default function fetchData(payload) {
        console.log(payload)
        console.log('___________')
    return (dispatch) => {
        dispatch(status.requestCalling());
        return fetch(`https://baas.kinvey.com/user/${appKey}`, {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + btoa(appKey + ':' + appSecret),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(res => res.json(), error => {
                    console.log(error);
                    dispatch(status.error());
                }).then(json => {
                    dispatch({type: 'LOGIN', payload: json})
                    dispatch(status.requestFinished());
            })
    };
}