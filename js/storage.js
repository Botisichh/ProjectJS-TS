// Получение всех пользователей из localStorage
export function getUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users;
}

// Добавление нового пользователя в localStorage
export function addUser(user) {
    const users = getUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

// Проверка, существует ли пользователь с указанным email или телефоном
export function userExists(email, phone) {
    const users = getUsers();
    return users.some(user => user.email === email || user.phone === phone);
}
