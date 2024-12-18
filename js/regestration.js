
function validation(form){

    function hideError(input){
        const parent = input.parentNode;
        if(parent.classList.contains('error')){
            parent.querySelector('.error-label').remove();
            parent.classList.remove('error');
        }
    }

    function createError(input, text){
        const parent = input.parentNode;
        const errorLabel = document.createElement('label');
        errorLabel.classList.add('error-label');
        errorLabel.textContent = text;
        console.log(parent);
        parent.classList.add('error');
        parent.append(errorLabel);

    }
    let result = true;
    const allInputs = form.querySelectorAll('input');
    for(const input of allInputs){
        hideError(input);
        if(input.value === ''){
            text = 'Error of field!';
            createError(input, text);
            result = false;
        }
    }
    return result;
}

document.getElementById('add-form').addEventListener('submit', (event) =>{
    event.preventDefault();
    if(validation(document.getElementById('add-form')) === true){
        alert('All Good!');
    }
    document.querySelector
})