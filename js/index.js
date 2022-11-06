import {Form} from "./Form.js"
import {Table} from "./Form.js"






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

const modalConteiner = document.querySelector('#modalConteiner')
const modalText = document.querySelector('#modalText')
// for test    
const regexEmail = /([A-Za-z\.]{2,20})+\@([A-Za-z\.]{2,20})/
const regexPassword = /([A-Za-z\.]{2,20})/
const regexPhone = /([A-Za-z\.]{2,20})/
const regexCity = /([A-Za-z\.]{2,20})/
//regex
    // regexEmail = /^([A-Za-z0-9_\-\.]{3,20})+\@([A-Za-z0-9_\-\.]{3,8})+\.([A-Za-z]{2,4})/
    // regexPass = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
    // regexPhone = /(\+)(\d){12}/
    // regexCity = /([A-Za-z\.]{3,20})/

const formOption = {
    modal: {conteiner: modalConteiner, text: modalText, textValue: ''},
    form: {signIn: formSignInEl, signUp: formSignUpEl},
    name: {email: 'email', password: 'password', phone: 'phone', city: 'city'},
    regExp: {email: regexEmail, password: regexPassword, phone: regexPhone, city: regexCity},
    btn: {
        confirm: {signIn: buttonConfirmSingInEl, signUp: buttonConfirmSingUpEl},
        forgot: buttonForgotDataEl,
        viePass: buttonsViewerPasswordEl,
        switch: buttonsSwitchForm,
    },
    input: {
        signIn: {email: inputEmailSingInEl, password: inputPasswordSingInEl},
        signUp: {email: inputEmailSingUpEl, password: inputPasswordSingUpEl, phone: inputPhoneSignUpEl, city: inputCitySignUpEl}
    }
}

const form = new Form(formOption)



//table

const tableBodyEl = document.querySelectorAll('[data-body]')
const tableBtnEditEl = document.querySelector('#tableBody')
const tableBtnDeleteEl = document.querySelector('#tableBtnDelete')
const tableBtnViewEl = document.querySelector('.table_btn_view')
const tableConteinerEl = document.querySelector('#tableConteiner')

const tableOption = {
    conteiner: tableConteinerEl,
    body: tableBodyEl,
    btn: {edit: tableBtnEditEl, delete: tableBtnDeleteEl, view: tableBtnViewEl},
    modal: {conteiner: modalConteiner, text: modalText, textValue: ''}
}

const table = new Table(tableOption)





form.btn.switch.forEach(e => e.addEventListener('click', () => form.switchForm()))

form.btn.confirm.signUp.addEventListener('click', () => form.registration())

form.btn.confirm.signIn.addEventListener('click', () => form.authorization())
form.btn.viePass.forEach(e => e.addEventListener('mousedown', () => form.viePass()))
form.btn.viePass.forEach(e => e.addEventListener('mouseup', () => form.hidePass()))
form.modal.conteiner.addEventListener('click', () => form.closeModal(event))



document.body.addEventListener('load', table.loadTable())
form.btn.confirm.signUp.addEventListener('click', () => table.addInTable())
table.conteiner.addEventListener('click', event => {
    if (event.target.dataset.table_btn_view) {
        table.viewTableItem()
    }
})
table.conteiner.addEventListener('click', event => {
    if (event.target.dataset.table_btn_delete) {
        table.deleteTableItem()
        location.reload()
    }
})




