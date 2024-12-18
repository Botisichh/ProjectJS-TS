console.log('JS connected');
const phone = document.getElementById('phone');
const btn = document.getElementById('button');

btn.onclick = () => {
    phone.style.borderColor = 'green';
};
