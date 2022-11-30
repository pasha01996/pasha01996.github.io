
import {Form} from "./Form.js"
import {Control} from "./Control.js"
import {checks} from "./module.js"
import {Table} from "./Table.js"
import {Page} from "./Page.js"



//regex
// regexEmail = /^([A-Za-z0-9_\-\.]{3,20})+\@([A-Za-z0-9_\-\.]{3,8})+\.([A-Za-z]{2,4})/
// regexPass = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
// regexPhone = /(\+)(\d){12}/
// regexCity = /([A-Za-z\.]{3,20})/
const formSigninEl = document.getElementById('form-signin')
const formSignupEl = document.getElementById('form-signup')
const buttonsSwitchForm = document.querySelectorAll('button[data-switch-form]')
const inputSubmitSignup = document.getElementById('inputSubmitSignup')
const inputSubmitSignin = document.getElementById('inputSubmitSignin')
const btnSwitchSignin = document.getElementById('switch-signin')
const btnSwitchSignup =document.getElementById('switch-signup')



const modalConteiner = document.querySelector('#modalConteiner')
const modalText = document.querySelector('#modalText')
const modalContent = document.querySelector('#modalContent')
const modalBtn = document.querySelector('#modalBnt')



//--------------------------------------------form--------------------------------------------
const formOptionSignup = {
    inputs:[new Control('inputEmailSignup', [checks.includesAt, checks.minLengthEight]), 
            new Control('inputPassSignup', [checks.minLengthEight]),
            new Control('inputPhoneSignup', [checks.minLengthEight, checks.firstLetterPlus]),
            new Control('inputCountrySignup', [checks.minLengthEight])],
}

const formOptionSignin = {
    inputs: [new Control('inputEmailSignin', [checks.includesAt, checks.minLengthEight]),
            new Control('inputPassSignin', [checks.minLengthEight])],
}

//----------------------------------------page---------------------------------------------------
const psgeOptions = {
    formSignup: new Form('form-container-signup', formOptionSignup),
    formSignin: new Form('form-container-signin', formOptionSignin),
    btn: {  submitSignin: inputSubmitSignin, submitSignup: inputSubmitSignup,
            switch: [btnSwitchSignin, btnSwitchSignup],
        },
    nameOfStorage: 'registration'
}

const page = new Page(psgeOptions)

page.btn.switch.forEach(btn => btn.addEventListener('click', () => page.switchForm()))
page.btn.submitSignup.addEventListener('click', (event) => page.authorization(event))
page.btn.submitSignin.addEventListener('click', (event) => page.registration(event))


//------------------------------------------table-------------------------------------------------
const tableBodyEl = document.querySelectorAll('[data-body]')
const tableBtnEditEl = document.querySelector('#tableBody')
const tableBtnDeleteEl = document.querySelector('#tableBtnDelete')
const tableBtnViewEl = document.querySelector('.table_btn_view')
const tableSignupUsers = document.querySelector('#table-signup-users')


// console.log(tableBodyEl)

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


