// // Первое условие
// let list = [50, 23, 170, 80, 60, 90, 1, 17, 56, 90];

// let sum = list.reduce((sum, elem) => sum + elem);

// let firstCash = 0;
// let secondCash = 0;

// list.map((elem, index) => (index % 2 > 0) ? firstCash += elem : secondCash += elem)

// console.log(firstCash)
// console.log(secondCash)

// // Второе условие
// let allCash = [];
// let everySecond = 0;
// let everyFourth = 0;

// for (let i = 1; i <= 10; i++) {
//     allCash.push(prompt(`Cумма № ${i} кассы`));
// }

// alert(allCash);

// allCash.map((elem, index) => (index % 2 > 0) ? everySecond += (+elem) : false)
// allCash.map((elem, index) => (!((index+1)%4)) ? everyFourth += (+elem) : false)

// alert(everySecond);
// alert(everyFourth);

//Свап авторизации на регистрацию
const linkSignInEl = document.getElementById('link_sign-in')
const linkSignUpEl = document.getElementById('link_sign-up')
const formSignInEl = document.getElementById('form_sign-in')
const formSignUpEl = document.getElementById('form_sign-up')

linkSignInEl.addEventListener('click', change)
linkSignUpEl.addEventListener('click', change)

function change() {
    formSignInEl.classList.toggle('not_active')
    formSignUpEl.classList.toggle('not_active')
}

//Закрытие модалльного окна
window.onclick = function(event) {
    let target = event.target
    if (target == modalEl || target == modalContentEl) {
      modalEl.style.display = "none";
    }
  }

// Регистрация
document.getElementById('button_sign-up').onclick = checkSignUpData

const regexEmail = /^([A-Za-z0-9_\-\.]{3,})+\@([A-Za-z0-9_\-\.]{3,20})+\.([A-Za-z]{2,4})/
const regexPass = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
const modalEl = document.getElementById('modal')
const modalContentEl = document.getElementById('modal-content')
const modalText = document.getElementById('modal-text')
const emailSignUpEl = document.getElementById('input_sign-up_email')
const passSignUpEl = document.getElementById('input_sign-up_pass')

//Проверка email и пароль
function checkSignUpData() {
    if (regexEmail.test(emailSignUpEl.value) && regexPass.test(passSignUpEl.value) ) {
        modalEl.style.display = 'block'
        modalText.innerText = 'Успешная регистрация!'
        window.localStorage.setItem('login', JSON.stringify(emailSignUpEl.value))
        window.localStorage.setItem('password', JSON.stringify(passSignUpEl.value))
    } else {
        modalEl.style.display = 'block'
        modalText.innerText = 'Введите корректный Email или пароль'
    }
}


// Авторизация 
document.getElementById('button_sign-in').onclick = checkSignIpData

const emailSignIn = document.getElementById('input_sign-in_email')
const passSignIn = document.getElementById('input_sign-in_pass')

function checkSignIpData() {
    let emailStorage = window.localStorage.getItem('login')
    let passwordStorage = window.localStorage.getItem('password')

    if (JSON.parse(emailStorage) === emailSignIn.value && JSON.parse(passwordStorage) === passSignIn.value) {
        modalEl.style.display = 'block'
        modalText.innerText = 'Успешная авторизация!'
    } else {
        modalEl.style.display = 'block'
        modalText.innerText = 'Попробуйте другой Email или пароль'
    }
}





