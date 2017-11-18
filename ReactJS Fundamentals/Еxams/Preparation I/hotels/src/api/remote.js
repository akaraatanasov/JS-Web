const host = 'http://localhost:5000/';

async function register(name, email, password) {
    const res = await fetch(host + 'auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            password
        })
    });
    return await res.json();
}

async function login(email, password) {
    const res = await fetch(host + 'auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });
    return await res.json();
}

async function createHotel(name, location, description, numberOfRooms, image, parkingSlots) {
    const res = await fetch(host + 'hotels/create/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + localStorage.getItem('authToken')
        },
        body: JSON.stringify({ name, location, description, numberOfRooms, image, parkingSlots })
    });
    return await res.json();
}

async function getPage(page) {
    const res = await fetch(host + 'hotels/all?page=' + page, {
        method: 'GET'
    });
    return await res.json();
}

async function deleteHotel(hotelId) {
    const res = await fetch(host + `hotels/${hotelId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'bearer ' + localStorage.getItem('authToken'),            
        }
    });
    return await res.json();
}

async function getDetail(hotelId) {
    const res = await fetch(host + `hotels/details/${hotelId}`, {
        method: 'GET',
        headers: {
            'Authorization': 'bearer ' + localStorage.getItem('authToken'),            
        }
    });
    return await res.json();
}

async function createReview(hotelId, rating, comment) {
    const res = await fetch(host + 'hotels/details/' + hotelId + '/reviews/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + localStorage.getItem('authToken')
        },
        body: JSON.stringify({ rating, comment })
    });
    return await res.json();
}

async function getReviews(hotelId) {
    const res = await fetch(host + 'hotels/details/' + hotelId + '/reviews', {
        method: 'GET',
        headers: {
            'Authorization': 'bearer ' + localStorage.getItem('authToken'),            
        }
    });
    return await res.json();
}

export { register, login, createHotel, getPage, deleteHotel, getDetail, createReview, getReviews };