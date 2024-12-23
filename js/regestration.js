import{getUsers, addUser, userExists} from './storage.js'

// First and last name verification
function nameValidation(input) {
    const value = input.trim();
    const regex = /^[A-ZА-Я][a-zа-я]+$/; // The first letter is uppercase, the rest are lowercase
    return regex.test(value);
}

// Convert name/surname to the correct form
function formatName(input) {
    const value = input.trim();
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

// Checking for invalid values
function isInvalidValue(input) {
    const invalidValues = ["undefined", "null", "nan", "none"];
    return invalidValues.includes(input.trim().toLowerCase());
}

// Phone number verification
function phoneValidation(input) {
    const regex = /^\+380(50|66|99|95|63|68|97|93|67|73|98)\d{7}$/; 
    return regex.test(input.trim()); // Remove spaces before checking
}

// Email verification
function emailValidation(input) {
    // Remove spaces around the string
    const email = input.trim();

    // Check the total length
    if (email.length > 24) {
        return false;
    }

    // Regular expression to check the email structure
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Passwords matching check
function passwordsMatch(password, confirmPassword) {
    return password === confirmPassword;
}

// Function to hide errors
function hideError(input) {
    const parent = input.parentNode;
    if (parent.classList.contains('error')) {
        const errorLabel = parent.querySelector('.error-label');
        if (errorLabel) errorLabel.remove();
        parent.classList.remove('error');
    }else if(parent.classList.contains('valid')){
        const validLabel = parent.querySelector('.valid-label');
        if(validLabel) validLabel.remove();
        parent.classList.remove('valid');
    }
}

// Function to create error messages
function createError(input, text) {
    const parent = input.parentNode;

    // Hide any valid labels before adding an error
    if (parent.classList.contains('valid')) {
        const validLabel = parent.querySelector('.valid-label');
        if (validLabel) validLabel.remove();
        parent.classList.remove('valid');
    }

    // If an error already exists, replace the text
    let errorLabel = parent.querySelector('.error-label');
    if (!errorLabel) {
        errorLabel = document.createElement('label');
        errorLabel.classList.add('error-label');
        parent.append(errorLabel);
    }

    parent.classList.add('error');
    errorLabel.textContent = text;
}

// Function to add the valid class
function createValid(input) {
    const text = 'All Good!';
    const parent = input.parentNode;
    const validLabel = document.createElement('label');
    validLabel.classList.add('valid-label');
    validLabel.textContent = text;
    // Hide old errors (if any)
    hideError(input); 
    // Add the success validation class
    parent.classList.add('valid');
    parent.append(validLabel);
}


// Handler for the "Show all users" button
function setupShowUsersButton(buttonId) {
    const button = document.getElementById(buttonId);
    button.addEventListener('click', () => {
        window.location.href = '/ProjectJS-TS/html/users.html';
    });
}

// Initialization of the "Show all users" button
setupShowUsersButton('show-users-button');

// Main validation function
function validation(form) {
    const allInputs = form.querySelectorAll('input');
    let result = true;

    for (const input of allInputs) {
        hideError(input);

        const value = input.value.trim();
        
        if (value === '' || isInvalidValue(value)) {
            createError(input, 'Field contains invalid data!');
            result = false;
        } else {
            if (input.id === 'first-name' || input.id === 'last-name') {
                if (!nameValidation(value)) {
                    createError(input, 'Only letters allowed. First letter must be uppercase!');

                    result = false;
                } else {
                    createValid(input);
                }
            } else if (input.id === 'phone' && !phoneValidation(value)) {
                createError(input, 'Invalid phone number!');
                result = false;
            } else if (input.id === 'email' && !emailValidation(value)) {
                createError(input, 'Invalid email address!');
                result = false;
            } else if (
                input.id === 'confirm-password' &&
                !passwordsMatch(document.getElementById('password').value, value)
            ) {
                createError(input, 'Passwords do not match!');
                result = false;
            } else {
                createValid(input);
            }
        }
    }

    return result;
}

// Form submit handler
document.getElementById('add-form').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form action

    if (validation(document.getElementById('add-form'))) {
        const firstNameInput = document.getElementById('first-name');
        const lastNameInput = document.getElementById('last-name');
        const phoneInput = document.getElementById('phone');
        const emailInput = document.getElementById('email');

        const user = {
            firstName: formatName(firstNameInput.value),
            lastName: formatName(lastNameInput.value),
            phone: phoneInput.value.trim(),
            email: emailInput.value.trim(),
        };

        if (userExists(user.email)) {
            alert('User with this email already exists!');
            createError(emailInput, 'User with this email already exists!'); // Highlight the email field
        } else {
            addUser(user);
            alert('User added successfully!');
            window.location.href = '../html/users.html';
        }
    }
});


document.getElementById('clear-users-button').addEventListener('click', () => {
    localStorage.removeItem('users'); // Remove all users from localStorage
    alert('All users have been deleted!');
});
