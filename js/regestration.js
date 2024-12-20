// Проверка номера телефона
function phoneValidation(input) {
    const regex = /^\+380(50|66|99|95|63|68|97|93|67|73)\d{7}$/;
    return regex.test(input.trim()); // Убираем пробелы перед проверкой
}

// Проверка email
function emailValidation(input) {
    // Убираем пробелы вокруг строки
    const email = input.trim();

    // Проверяем общую длину
    if (email.length > 24) {
        return false;
    }

    // Регулярное выражение для проверки структуры email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Проверка на совпадение пароля
function passwordsMatch(password, confirmPassword) {
    return password === confirmPassword;
}

// Функция для скрытия ошибок
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

// Функция для создания ошибок
function createError(input, text) {
    const parent = input.parentNode;
    const errorLabel = document.createElement('label');
    errorLabel.classList.add('error-label');
    errorLabel.textContent = text;
    parent.classList.add('error');
    parent.append(errorLabel);
}

// Функция для добавления класса valid
function createValid(input) {
    const text = 'All Good!';
    const parent = input.parentNode;
    const validLabel = document.createElement('label');
    validLabel.classList.add('valid-label');
    validLabel.textContent = text;
    // Скрываем старые ошибки (если были)
    hideError(input); 
    // Добавляем класс успешной валидации
    parent.classList.add('valid');
    parent.append(validLabel);
}


// Основная функция валидации
function validation(form) {
    const allInputs = form.querySelectorAll('input');
    let result = true; // Начальное значение (предполагаем, что форма валидна)

    for (const input of allInputs) {
        hideError(input); // Скрываем предыдущие ошибки

        if (input.value.trim() === '') {
            // Если поле пустое
            const text = 'Field cannot be empty!';
            createError(input, text);
            result = false;
        } else {
            // Проверяем конкретные поля
            if (input.id === 'phone' && !phoneValidation(input.value)) {
                const text = 'Invalid phone number!';
                createError(input, text);
                result = false;
            } else if (input.id === 'email' && !emailValidation(input.value)) {
                const text = 'Invalid email address!';
                createError(input, text);
                result = false;
            } else if (
                input.id === 'confirm-password' &&
                !passwordsMatch(
                    document.getElementById('password').value,
                    input.value
                )
            ) {
                const text = 'Passwords do not match!';
                createError(input, text);
                result = false;
            } else {
                createValid(input); // Поле валидно
            }
        }
    }

    return result; // Возвращаем результат проверки
}

// Обработчик отправки формы
document.getElementById('add-form').addEventListener('submit', (event) => {
    event.preventDefault(); // Останавливаем стандартное действие формы

    if (validation(document.getElementById('add-form'))) {
        alert('All Good!');
        // Здесь можно отправить данные формы или выполнить другие действия
    }
});
