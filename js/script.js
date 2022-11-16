import {Form} from "./Form.js"
import { Table } from "./Table.js"

////////////////////////////////form

const regexEmail = /([A-Za-z\.]{2,20})+\@([A-Za-z\.]{2,20})/
const regexPassword = /([A-Za-z\.]{2,20})/
const regexPhone = /([A-Za-z\.]{2,20})/
const regexCity = /([A-Za-z\.]{2,20})/
//regex
// regexEmail = /^([A-Za-z0-9_\-\.]{3,20})+\@([A-Za-z0-9_\-\.]{3,8})+\.([A-Za-z]{2,4})/
// regexPass = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
// regexPhone = /(\+)(\d){12}/
// regexCity = /([A-Za-z\.]{3,20})/
const formSigninEl = document.getElementById('form-signin')
const formSignupEl = document.getElementById('form-signup')
const buttonsSwitchForm = document.querySelectorAll('button[data-switch-form]')
const formContainerSignupEl = document.getElementById('form-container-signup')
const formContainerSigninEl = document.getElementById('form-container-signin')

const modalConteiner = document.querySelector('#modalConteiner')
const modalText = document.querySelector('#modalText')
const modalContent = document.querySelector('#modalContent')
const modalBtn = document.querySelector('#modalBnt')


const formOption = {
    container: {signin: formContainerSigninEl, signup: formContainerSignupEl},
    form: {signin: formSigninEl, signup: formSignupEl},
    regExp: {email: regexEmail, password: regexPassword, phone: regexPhone, city: regexCity},
    btn: {switch:buttonsSwitchForm},
    modal: {container: modalConteiner, content: modalContent, btn: modalBtn, text:modalText, textValue: ''},
    nameOfStorage: 'registration'
}

const form = new Form(formOption)

form.form.signup.addEventListener('submit', (event) => form.registration(event))
form.form.signin.addEventListener('submit', (event) => form.authorization(event))
form.btn.switch.forEach(e => e.addEventListener('click', () => form.switchForm()))


////////////////////////////table
const tableBodyEl = document.querySelectorAll('[data-body]')
const tableBtnEditEl = document.querySelector('#tableBody')
const tableBtnDeleteEl = document.querySelector('#tableBtnDelete')
const tableBtnViewEl = document.querySelector('.table_btn_view')
const tableSignupUsers = document.querySelector('#table-signup-users')


const tableOption = {
    nameOfStorage: 'registration',
    container: tableSignupUsers,
    body: tableBodyEl,
    btn: {edit: tableBtnEditEl, delete: tableBtnDeleteEl, view: tableBtnViewEl},
    modal: {container: modalConteiner, content: modalContent, text: modalText, btn: modalBtn, textValue: ''}
}

const table = new Table(tableOption)

table.modal.btn.addEventListener('click', (event) => table.closeModal(event))
document.body.addEventListener('load', table.createTable())

form.form.signup.addEventListener('submit', () => table.addInTable())

table.container.addEventListener('click', (event) => {
    if (event.target.dataset.tableBtnView) {
        table.viewTableItem(event)
    }
})

table.container.addEventListener('click', event => {
    if (event.target.dataset.tableBtnDelete) {
        table.deleteTableItem(event)
    }
})

table.container.addEventListener('click', event => {
    if (event.target.dataset.tableBtnEdit) {
        table.createModalTable(event)
    }
})

table.modal.container.addEventListener('click', event => {
    if(event.target.dataset.tableBtnConfirmedit) {
        table.onclickEditTable()
    }
})


