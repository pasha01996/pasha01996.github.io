
import {Form} from "./Form.js"
import {Control} from "./Control.js"
import {checks} from "./module.js"
import {Table} from "./Table.js"
import {Page} from "./Page.js"
import {radio} from "./radio.js"


//regex
// regexEmail = /^([A-Za-z0-9_\-\.]{3,20})+\@([A-Za-z0-9_\-\.]{3,8})+\.([A-Za-z]{2,4})/
// regexPass = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
// regexPhone = /(\+)(\d){12}/
// regexCity = /([A-Za-z\.]{3,20})/
const inputSubmitSignup = document.getElementById('inputSubmitSignup')
const inputSubmitSignin = document.getElementById('inputSubmitSignin')
const btnSwitchSignin = document.getElementById('switch-signin')
const btnSwitchSignup = document.getElementById('switch-signup')

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

const callbackEditTable = () => {
   const formOptionEditTadle = {
        inputs: [new Control('inputEmailEdit', [checks.includesAt, checks.minLengthEight]), 
                new Control('inputPassEdit', [checks.minLengthEight]),
                new Control('inputPhoneEdit', [checks.minLengthEight, checks.firstLetterPlus]),
                new Control('inputCountryEdit', [checks.minLengthEight]),
                new Control('radio-marital-status', 'not checks'),
                new Control('gender-select', 'not checks'),
                new Control('color-mail', 'not checks'),
                new Control('description', 'not checks'),
                new Control('age-user', 'not checks'),
                new Control('checkbox-interests', 'not checks')]}
                

    page.elements.formEditTable = new Form('form-container-edit', formOptionEditTadle)
}
//-----------------------------------------Table----------------------------------------------
const tableBtnEditEl = document.querySelector('#tableBody')
const tableBtnDeleteEl = document.querySelector('#tableBtnDelete')
const tableBtnViewEl = document.querySelector('.table_btn_view')
const tableUsers = document.querySelector('#table-users')

const modalConteiner = document.querySelector('#modalConteiner')
const modalText = document.querySelector('#modalText')
const modalContent = document.querySelector('#modalContent')
const modalBtn = document.querySelector('#modalBnt')


const tableOption = {
    container: tableUsers,
    btn: {edit: tableBtnEditEl, delete: tableBtnDeleteEl, view: tableBtnViewEl},
    modal: {container: modalConteiner, content: modalContent, text: modalText, btn: modalBtn, textValue: ''},
    nameOfStorage: 'registration'
}

//----------------------------------------page---------------------------------------------------
const pageOptions = {
    elements: {
        formSignin: new Form('form-container-signin', formOptionSignin),
        formSignup: new Form('form-container-signup', formOptionSignup),
        table: new Table('table-users', tableOption),
    },

    btn: {  submitSignin: inputSubmitSignin, submitSignup: inputSubmitSignup,
            switchSignin: btnSwitchSignin, switchSignup: btnSwitchSignup,
        },             

    nameOfStorage: 'registration'
}

const page = new Page(pageOptions)

page.btn.switchSignin.addEventListener('click', () => page.switchToElement('form-container-signup'))
page.btn.switchSignup.addEventListener('click', () => page.switchToElement('form-container-signin'))

page.btn.submitSignup.addEventListener('click', (event) => page.registration(event))
page.btn.submitSignin.addEventListener('click', (event) => page.authorization(event))

page.elements.table.modal.btn.addEventListener('click', (event) => page.elements.table.closeModal(event))
page.elements.table.container.addEventListener('click', (event) => {
    if (event.target.dataset.tableBtnView) {
        page.elements.table.viewTableItem(event)
    }
})

// table.container.addEventListener('click', event => {
//     if (event.target.dataset.tableBtnDelete) {
//         table.deleteTableItem(event)
//     }
// })

page.elements.table.container.addEventListener('click', event => {
    if (event.target.dataset.tableBtnEdit) {
        page.createModalTable(event)
        callbackEditTable()
        radio()
        console.log(page.elements.formEditTable)
    }
})

page.elements.table.modal.container.addEventListener('click', event => {
    if(event.target.dataset.tableBtnConfirmedit) {
        page.onclickEditTable()
    }
})
