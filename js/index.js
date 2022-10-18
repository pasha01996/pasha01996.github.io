import Form from "./Form.js"

//regex
    // this.regexEmail = /^([A-Za-z0-9_\-\.]{3,20})+\@([A-Za-z0-9_\-\.]{3,8})+\.([A-Za-z]{2,4})/
    // this.regexPass = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
    // this.regexPhone = /(\+)(\d){12}/
    // this.regexCity = /([A-Za-z\.]{3,20})/
// for test    


const formSignInEl = document.querySelector('#formSingIn')
const formSignUpEl = document.querySelector('#formSingUp')
const inputEmailSingInEl = document.querySelector('#emailSingIn')
const inputEmailSingUpEl = document.querySelector('#emailSingUp')
const inputPasswordSingInEl = document.querySelector('#passwordSingIn')
const inputPasswordSingUpEl = document.querySelector('#passwordSingUp')
const inputPhoneSignUpEl = document.querySelector('#phoneSignUp')
const inputCitySignUpEl = document.querySelector('#citySignUp')
const buttonConfirmSingInEl = document.querySelector('#buttonConfirmSingIn')
const buttonConfirmSingUpEl = document.querySelector('#buttonConfirmSingUp')
const buttonForgotDataEl = document.querySelector('#buttonForgotPass')
const buttonsViewerPasswordEl = document.querySelectorAll('button[data-viewer-password]')
const buttonsSwitchForm = document.querySelectorAll('button[data-switch-form]')

const regexEmail = /([A-Za-z\.]{2,20})+\@([A-Za-z\.]{2,20})/
const regexPassword = /([A-Za-z\.]{3,20})/
const regexPhone = /([A-Za-z\.]{3,20})/
const regexCity = /([A-Za-z\.]{3,20})/

const formOption = {
    form: [formSignInEl, formSignUpEl],
    email: {name: 'email', validations: ['minLengh(8)', regexEmail], input: [inputEmailSingInEl, inputEmailSingUpEl]},
    password: {name: 'password', validations: ['minLengh(8)', regexPassword], input: inputPasswordSingInEl, inputPasswordSingUpEl},
    phone: {name: 'phone', validations: ['minLengh(10)', regexPhone], input: inputPhoneSignUpEl},
    city: {name: 'city', validations: ['minLengh(15)', regexCity], input: inputCitySignUpEl},
    generalButtons: [buttonConfirmSingInEl, buttonConfirmSingUpEl, buttonForgotDataEl, buttonsViewerPasswordEl, buttonsSwitchForm]
}


const form1 = new Form(formOption)

form1.voice()
