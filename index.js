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
import belarus from "./by-cities.js"


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


// Functions

    const isValid = function(regexp, input) {
        return regexp.test(input.value)
    }

    const isValidCity = function(array, input) {
        // let count = 0
        // for (let i = 0; i < array.lenght; i++) {
        //    array[i].toLowerCase() === (input.value).toLowerCase() ? count + 1 : false
        // }
        // return count > 0
        return array.includes(input.value)

    }
    
    const addToStorage = function(EmailValue, PasswordValue) {
        localStorage.setItem('email', JSON.stringify(EmailValue.value))
        localStorage.setItem('password', JSON.stringify(PasswordValue.value))
    }

    const createModal = function(modal, modalValue, text) {
        modal.style.display = 'block'
        modalValue.innerText = text
    }


// SignUp
const modalEl = document.querySelector('.modal')
const modalContentEl = document.querySelector('.modal__content')
const modalVelueEl = document.querySelector('.modal__text')
const imputEmailSignUpEl = document.querySelector('.form__input_sign_up_email')
const imputPassSignUpEl = document.querySelector('.form__input_sign_up_password')
const regexEmail = /^([A-Za-z0-9_\-\.]{3,20})+\@([A-Za-z0-9_\-\.]{3,8})+\.([A-Za-z]{2,4})/
const regexPass = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
const cityImputEl = document.querySelector('.form__input_sign_up_country')
const cities = ((belarus.regions.map(e => e.cities)).flat(10)).map(e => e.name)

document.querySelector('.form__button_sign_up').addEventListener('click', () => checkDataInputSignUp())

function checkDataInputSignUp() {

    if (isValid(regexEmail, imputEmailSignUpEl) && isValid(regexPass, imputPassSignUpEl) && isValidCity(cities, cityImputEl)) {
        addToStorage(imputEmailSignUpEl, imputPassSignUpEl)
        createModal(modalEl, modalVelueEl, 'Successful registration')
        console.log(isValidCity(cities, cityImputEl))
    } else {
        createModal(modalEl, modalVelueEl, 'Enter correct email or password')
        console.log(isValidCity(cities, cityImputEl))
    }
}


// SignIn
const emailSignInEl = document.querySelector('.form__input_sign_in_email')
const passSignInEl = document.querySelector('.form__input_sign_in_password')

document.querySelector('.form__button_sign_in').addEventListener('click', () => checkDataInputSignIn(emailSignInEl, passSignInEl))

function checkDataInputSignIn(inputEmail, inputPassword) {

    let emailStorage = localStorage.getItem('email')
    let passwordStorage = localStorage.getItem('password')

    if (JSON.parse(emailStorage) === inputEmail.value && JSON.parse(passwordStorage) === inputPassword.value) {
        createModal(modalEl, modalVelueEl, 'Successful authorization')
    } else {
        createModal(modalEl, modalVelueEl, 'Try a different email or password')
    }
}


//Password Viewer
const passwordViewerEl = document.querySelectorAll('.form__button_password_viewer')

passwordViewerEl[0].onmousedown = () => imputPassSignUpEl.type = 'text'
passwordViewerEl[0].onmouseup = () => imputPassSignUpEl.type = 'password'
passwordViewerEl[1].onmousedown = () => imputPassSignUpEl.type = 'text'
passwordViewerEl[1].onmouseup = () => imputPassSignUpEl.type = 'password'


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
