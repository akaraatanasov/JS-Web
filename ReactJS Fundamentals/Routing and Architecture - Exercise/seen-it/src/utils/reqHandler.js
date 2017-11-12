const appKey = 'kid_Sy7C5uVkM'
const appSecret = '166dbbcdff094afb9694e115ad90b94b'
const hostUrl = 'https://baas.kinvey.com'

let reqHandler = {
    login: (payload) => {
        return fetch(`${hostUrl}/user/${appKey}/login`, {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + btoa(`${appKey}:${appSecret}`),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(res => {
            return res.json()
        })
    },
    register: (payload) => {
        return fetch(`${hostUrl}/user/${appKey}`, {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + btoa(`${appKey}:${appSecret}`),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(res => {
            return res.json()
        })
    },
    logout: (payload) => {
        return fetch(`${hostUrl}/user/${appKey}/_logout`, {
            method: 'POST',
            headers: {
                'Authorization': 'Kinvey ' + payload
            }
        })
    },
    pullPosts: () => {
        return fetch(`${hostUrl}/appdata/${appKey}/posts?query={}&sort={"_kmd.ect": -1}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Kinvey ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.json()
        })
    },
    pullMyPosts: () => {
        return fetch(`${hostUrl}/appdata/${appKey}/posts?query={"author":"${localStorage.getItem('username')}"}&sort={"_kmd.ect": -1}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Kinvey ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.json()
        })
    },
    createPost: (payload) => {
        return fetch(`${hostUrl}/appdata/${appKey}/posts`, {
            method: 'POST',
            headers: {
                'Authorization': 'Kinvey ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(res => {
            return res.json()
        })
    },
    loadPostById: (postId) => {
        return fetch(`${hostUrl}/appdata/${appKey}/posts/${postId}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Kinvey ' + localStorage.getItem('token')
            }
        }).then(data => {
            return data.json();
        })
    },
    loadCommentsById: (postId) => {
        return fetch(`${hostUrl}/appdata/${appKey}/comments?query={"postId":"${postId}"}&sort={"_kmd.etc": -1}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Kinvey ' + localStorage.getItem('token')
            }
        }).then(data => {
            return data.json();
        })
    }
}

export default reqHandler