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


//Switch singIN/singUp
const buttonSwitchEl = document.querySelectorAll('.form__button_switch')
const formSignInEl = document.querySelector('.form__sign_in')
const formSignUpEl = document.querySelector('.form__sign_up')

buttonSwitchEl[0].addEventListener('click', () => switchForm(formSignInEl, formSignUpEl))
buttonSwitchEl[1].addEventListener('click', () => switchForm(formSignInEl, formSignUpEl))

function switchForm(elem1, elem2) {
    elem1.classList.toggle('not_active')
    elem2.classList.toggle('not_active')
}


// SignUp
const modalEl = document.querySelector('.modal')
const modalContentEl = document.querySelector('.modal__content')
const modalVelueEl = document.querySelector('.modal__text')
const emailSignUpEl = document.querySelector('.form__input_sign_up_email')
const passSignUpEl = document.querySelector('.form__input_sign_up_password')

document.querySelector('.form__button_sign_up').addEventListener('click', () => checkInputData(emailSignUpEl, passSignUpEl, modalEl, modalVelueEl))

function checkInputData(inputEmail, inputPass, modalBody, modalText) {
    
    let regexEmail = /^([A-Za-z0-9_\-\.]{3,})+\@([A-Za-z0-9_\-\.]{3,20})+\.([A-Za-z]{2,4})/
    let regexPass = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
    
    if (regexEmail.test(inputEmail.value) && regexPass.test(inputPass.value) ) {
        modalBody.style.display = 'block'
        modalText.innerText = 'Успешная регистрация!'
        localStorage.setItem('login', JSON.stringify(inputEmail.value))
        localStorage.setItem('password', JSON.stringify(inputPass.value))

    } else {
        modalBody.style.display = 'block'
        modalVelueEl.innerText = 'Введите корректный Email или пароль'
    }
}


// SignIn
const emailSignInEl = document.querySelector('.form__input_sign_in_email')
const passSignInEl = document.querySelector('.form__input_sign_in_password')

document.querySelector('.form__button_sign_in').addEventListener('click', () => checkSignIpData(emailSignInEl, passSignInEl, modalEl, modalVelueEl))

function checkSignIpData(inputEmail, inputPassword, modalBody, modalText) {

    let emailStorage = localStorage.getItem('login')
    let passwordStorage = localStorage.getItem('password')

    if (JSON.parse(emailStorage) === inputEmail.value && JSON.parse(passwordStorage) === inputPassword.value) {
        modalBody.style.display = 'block'
        modalText.innerText = 'Успешная авторизация!'
        inputEmail.value = ''
        inputPassword.value = ''
    } else {
        modalBody.style.display = 'block'
        modalText.innerText = 'Попробуйте другой Email или пароль'
    }
}


//Password Viewer
const passwordViewerEl = document.querySelectorAll('.form__button_password_viewer')

passwordViewerEl[0].onmousedown = () => passSignInEl.type = 'text'
passwordViewerEl[0].onmouseup = () => passSignInEl.type = 'password'
passwordViewerEl[1].onmousedown = () => passSignUpEl.type = 'text'
passwordViewerEl[1].onmouseup = () => passSignUpEl.type = 'password'


//Close modal window
window.onclick = function(event) {
    if (event.target == modalEl || event.target == modalVelueEl || event.target == modalContentEl) {
        modalEl.style.display = "none";
    }
}


//Forgot password
document.querySelector('.form__link_forgot').addEventListener('click', checkPassword)

function checkPassword() {
    let a = localStorage.getItem('login')
    let b = localStorage.getItem('password') 
    
    modalEl.style.display = 'block'
    modalVelueEl.innerText = `Your Email: ${a} 
                            Your password: ${b}`
}