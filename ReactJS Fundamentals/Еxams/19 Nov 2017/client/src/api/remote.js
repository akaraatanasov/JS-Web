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

async function listYearly(year) {
    const res = await fetch(host + 'plan/' + year, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + localStorage.authToken
        }
    });
    return await res.json();
}

async function listMonthly(year, month) {
    const res = await fetch(host + 'plan/' + year + '/' + month, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + localStorage.authToken
        }
    });
    return await res.json();
}

async function updateMonthly(year, month, income, budget) {
    const res = await fetch(host + 'plan/' + year + '/' + month, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + localStorage.authToken
        },
        body: JSON.stringify({
            income,
            budget
        })
    });
    return await res.json();
}

async function addExpense(year, month, date, name, category, amount) {
    const res = await fetch(host + 'plan/' + year + '/' + month + '/expense', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + localStorage.authToken
        },
        body: JSON.stringify({
            date,
            name,
            category,
            amount
        })
    });
    return await res.json();
}

async function deleteExpense(expenseId) {
    const res = await fetch(host + 'plan/expense/' + expenseId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + localStorage.authToken
        }
    });
    return await res.json();
}

export { 
    register,
    login, 
    listYearly,
    listMonthly,
    updateMonthly,
    addExpense, // to do
    deleteExpense
};