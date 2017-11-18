async function register(name, email, password) {
    await fetch('http://localhost:5000/auth/signup', {
        method: 'POST',
        body: {
            name,
            email,
            password
        }
    });
}

async function login(email, password) {
    await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        body: {
            email,
            password
        }
    });
}

async function list() {
    await fetch('http://localhost:5000/furniture/all', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
}