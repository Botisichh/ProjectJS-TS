// Get all users from localStorage
export function getUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users;
}

// Adding a new user to localStorage
export function addUser(user) {
    const users = getUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

// Check if the user with the specified email or phone number exists
export function userExists(email, phone) {
    const users = getUsers();
    return users.some(user => user.email === email || user.phone === phone);
}
