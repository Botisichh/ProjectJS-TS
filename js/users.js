import { getUsers } from './storage.js';

// Loading users into a table
function loadUsersIntoTable() {
    const users = getUsers();
    const tableBody = document.querySelector('#users-table tbody');
    tableBody.innerHTML = ''; // Clearing the table

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.phone}</td>
            <td>${user.email}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Loading data after page load
document.addEventListener('DOMContentLoaded', loadUsersIntoTable);
