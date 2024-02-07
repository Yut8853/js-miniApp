'use strict';

const text = document.querySelector('.text');
const saveBtn = document.querySelector('.save');
const deleteBtn = document.querySelector('.delete');
const message = document.querySelector('.message');

localStorage.getItem('memo') ? text.value = localStorage.getItem('memo') : text.value = '';

saveBtn.addEventListener('click', () => {
    message.classList.add('appear');
    setTimeout(() => {
        message.classList.remove('appear');
    }, 1000);
    localStorage.setItem('memo', text.value);
})

deleteBtn.addEventListener('click', () => {
    confirm('Are you sure you want to delete the memo?') ? localStorage.removeItem('memo') : text.value = '';
})