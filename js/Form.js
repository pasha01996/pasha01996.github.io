import moduls from "./moduls.js"

class Form {
    constructor(options){
    this.formOption = options.form
    this.email = options.email
    this.password = options.password
    this.phone = options.phone
    this.city = options.city
    this.generalButtons = options.generalButtons
    }
    
    
}



// const formOption = [{
//     form: [formSignInEl, formSignUpEl],
//     email: {name: 'email', validations: [minLengh(8), regexEmail], input: [inputEmailSingInEl, inputEmailSingUpEl]},
//     password: {name: 'password', validations: [minLengh(8), regexPassword], input: inputPasswordSingInEl, inputPasswordSingUpEl},
//     phone: {name: 'phone', validations: [minLengh(10), regexPhone], input: inputPhoneSignUpEl},
//     city: {name: 'city', validations: [minLengh(15), regexCity], input: inputCitySignUpEl},
//     generalButtons: [buttonConfirmSingInEl, buttonConfirmSingUpEl, buttonForgotDataEl, buttonsViewerPasswordEl, buttonsSwitchForm]
// }]


// const formSignInEl = document.querySelector('#formSingIn')
// const formSignUpEl = document.querySelector('#formSingUp')
// const inputEmailSingInEl = document.querySelector('#emailSingIn')
// const inputEmailSingUpEl = document.querySelector('#emailSingUp')
// const inputPasswordSingInEl = document.querySelector('#passwordSingIn')
// const inputPasswordSingUpEl = document.querySelector('#passwordSingUp')
// const inputPhoneSignUpEl = document.querySelector('#phoneSignUp')
// const inputCitySignUpEl = document.querySelector('#citySignUp')
// const buttonConfirmSingInEl = document.querySelector('#buttonConfirmSingIn')
// const buttonConfirmSingUpEl = document.querySelector('#buttonConfirmSingUp')
// const buttonForgotDataEl = document.querySelector('#buttonForgotPass')
// const buttonsViewerPasswordEl = document.querySelectorAll('button[data-viewer-password]')
// const buttonsSwitchForm = document.querySelectorAll('button[data-switch-form]')

// const regexEmail = /([A-Za-z\.]{2,20})+\@([A-Za-z\.]{2,20})/
// const regexPassword = /([A-Za-z\.]{3,20})/
// const regexPhone = /([A-Za-z\.]{3,20})/
// const regexCity = /([A-Za-z\.]{3,20})/






// const Form = function(id) { 
  
// //methods
//     this.isValidEmail = () => moduls.isValidSignUp(this.regexEmail, this.inputSignUpEmail)
//     this.isValidPass = () => moduls.isValidSignUp(this.regexPass, this.inputSignUpPass)
//     this.isValidPhone = () => moduls.isValidSignUp(this.regexPhone, this.inputSignUpPhone)
//     this.isValidCity = () => moduls.isValidSignUp(this.regexCity, this.inputSignUpCity)

//     this.switchForm = () => moduls.switchForm(this.formSignUp, this.formSignIn)

//     this.isValidSignIn = () => moduls.isValidSignIn(this.inputSignInEmail, this.inputSignInPass)

//     this.addToStorage = () => moduls.addToStorage(this.inputSignUpEmail, this.inputSignUpPass, this.inputSignUpPhone, this.inputSignUpCity)
    
//     this.createModal = () => moduls.createModal(this.modal, this.modalText, this.text)
   
//     this.checkPassword = () => moduls.checkPassword(this.modal, this.modalText)

//     this.closeModal = () => moduls.closeModal(event, this.modal, this.modalText)

//     this.authorization = () => this.isValidSignIn() ? this.createModal(this.text = 'Successful authorization') : this.createModal(this.text = 'Try another Email or Password')

//     this.registration = () => {
//         if (this.isValidEmail() && this.isValidPass() && this.isValidPhone() && this.isValidCity()) {
//             this.addToStorage()
//             this.createModal(this.text = "Successful registration")
//             console.log('Yes')
//         } else {
//             this.createModal(this.text = 'Enter correct Email or Password')
//             console.log('No')
//         }   
//     }

// //init
//     this.init = function() {
//         const that = this

//         this.buttonSignInSwitch.addEventListener('click', (e) => that.switchForm(e))
//         this.buttonSignUpSwitch.addEventListener('click', (e) => that.switchForm(e))

//         this.buttonSignUp.addEventListener('click', () => that.registration())
//         this.buttonSignIn.addEventListener('click', () => that.authorization())

//         this.inputSignInForgotPass.addEventListener('click', () => that.checkPassword())

//         this.modal.addEventListener('click', () => that.closeModal())

//         this.inputSignInPassViewer.addEventListener('mousedown', () => this.inputSignInPass.type = 'text' )
//         this.inputSignInPassViewer.addEventListener('mouseup', () => this.inputSignInPass.type = 'password')
//         this.inputSignUpPassViewer.addEventListener('mousedown', () => this.inputSignUpPass.type = 'text')
//         this.inputSignUpPassViewer.addEventListener('mouseup', () => this.inputSignUpPass.type = 'password')
//     }
// }



export default Form