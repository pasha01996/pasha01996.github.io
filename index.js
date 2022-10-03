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
const linkAut = document.getElementById('link_sign-in')
const linkReg = document.getElementById('link_sign-up')
const formSignIn = document.getElementById('form_sign-in')
const formSignUp = document.getElementById('form_sign-up')

linkAut.addEventListener('click', change)
linkReg.addEventListener('click', change)

function change() {
    formSignIn.classList.toggle('not_active')
    formSignUp.classList.toggle('not_active')
}


// Регистрация
document.getElementById('button_sign-up').onclick = registration
const regexEmail = /^([A-Za-z0-9_\-\.]{2,})+\@([A-Za-z0-9_\-\.]{2,})+\.([A-Za-z]{2,4})/
const modal = document.getElementById('modal')
const modalContent = document.getElementById('modal-content')
const modalBody = document.getElementById('modal-body')

function registration() {
    let emailSignUp = document.getElementById('input_sign-up_email')
    let passSignUp = document.getElementById('input_sign-up_pass')

    if (regexEmail.test(emailSignUp)) {
        window.localStorage.setItem('login', JSON.stringify(emailSignUp.value))
        window.localStorage.setItem('password', JSON.stringify(passSignUp.value))
    } else {
        modal.style.display = "block"
    }
}

//Закрытие модалльного окна
window.onclick = function(event) {
    let target = event.target
    if (target == modal || target == modalContent || target == modalBody) {
      modal.style.display = "none";
    }
  }

// Авторизация 
document.getElementById('button_sign-in').onclick = authorization

function authorization() {
    let emailStorage = window.localStorage.getItem('login')
    let passwordStorage = window.localStorage.getItem('password')

    let emailSignIn = document.getElementById('input_sign-in_email')
    let passSignIn = document.getElementById('input_sign-in_pass')

    if (JSON.parse(emailStorage) === emailSignIn.value && JSON.parse(passwordStorage) === passSignIn.value) {
        console.log('Успешная авторизация!')
    } else {
        console.log('Попробуйте другой логин и пароль')
    }
    
}

//Проверка email



