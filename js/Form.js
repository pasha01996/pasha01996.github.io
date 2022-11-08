let stateOfRegistration = false

export class Form {
    constructor(options){
    this.modal = options.modal
    this.form = options.form
    this.name = options.name
    this.regExp = options.regExp
    this.btn = options.btn
    this.input = options.input
    }
  
    isValidSignIn () {
        let inputEmail = this.input.signIn.email.value
        let inputPass = this.input.signIn.password.value
        let array = JSON.parse(localStorage.getItem('registration'))
        let findElem = array.find(e => e[0][1] === inputEmail && e[1][1] === inputPass)
        console.log(findElem)
        if (findElem != undefined) {
            return true
        } else {return false}
    }

    isValidSignUp (regex, input) {
        return regex.test(input.value)
    }

    switchForm () {
        this.form.signUp.classList.toggle('not_active')
        this.form.signIn.classList.toggle('not_active')
    }

    createModal (text) {
        this.modal.conteiner.style.display = 'block'
        this.modal.text.innerText = text
    }

    closeModal(event) {
        if (event.target == this.modal.conteiner || event.target == this.modal.text) {
            this.modal.conteiner.style.display = "none"
        }
    }

    getDataStorage(name) {
        return JSON.parse(localStorage.getItem(name) || '[]') 
    }

    addToStorage(name, obj) {
        let storage = this.getDataStorage(name)
        let array = Object.entries(obj)
        array.forEach(e => e = e[1] = e[1].value)
        storage.push(array)
        localStorage.setItem(name, JSON.stringify(storage))
    }

    viePass() {
        this.input.signIn.password.type = 'text'
        this.input.signUp.password.type = 'text'
    }

    hidePass() {
        this.input.signIn.password.type = 'password'
        this.input.signUp.password.type = 'password'
    }

    registration() {
        if (this.isValidSignUp(this.regExp.email, this.input.signUp.email) &&
            this.isValidSignUp(this.regExp.password, this.input.signUp.password) &&
            this.isValidSignUp(this.regExp.phone, this.input.signUp.phone) &&
            this.isValidSignUp(this.regExp.city, this.input.signUp.city)) {
                this.addToStorage('registration', this.input.signUp)
                this.createModal('Successful registration')
                stateOfRegistration = true
            } else {
                this.createModal('Enter correct Email or Password')
                stateOfRegistration = false
            }
    }

    authorization() { 
        if(this.isValidSignIn()) {
            this.createModal('Successful authorization')
        } else {
            this.createModal('Try another Email or Password')
        } 
    }
}




export class Table {
    constructor(options) {
        this.conteiner = options.conteiner
        this.btn = options.btn
        this.modal = options.modal
        this.tableEditTarget
        this.tableEditBtn
    }

    updateStorage(key, item) {
        localStorage.setItem(key, JSON.stringify(item))
    }

    createModal(text) {
        this.modal.conteiner.style.display = 'block'
        this.modal.text.innerText = text
    }

    getStorage(key) {
        return JSON.parse(localStorage.getItem(key))
    }

    createItemTable() {
        return this.conteiner.insertAdjacentHTML('afterbegin', `
            <div class="table_item">
                <div class="table_title">user:</div>
                <span class="table_body"></span>
                <div class="table_buttons">
                    <button class="table_btn_edit" data-table_btn_edit="true">edit</button>
                    <button class="table_btn_delete" data-table_btn_delete="true">delete</button>
                    <button class="table_btn_view" data-table_btn_view="true">view</button>
                </div>
            </div>
        `)
    }

    createTableInputs() {
        return this.modal.content.insertAdjacentHTML('afterbegin', `
        <div class="modal__table">
            <span class="modal__table_title">Edit data:</span>
            <div class="modal__table_inputs">

                <div class="table__item">
                    <span class="table__span">text</span>
                    <input class="table__input_email" data-table-input type="text" placeholder="Email">
                </div>
                <div class="table__item">
                    <span class="table__span">text</span>
                    <input class="table__input_password" data-table-input type="text" placeholder="Password">
                </div>
                <div class="table__item">
                    <span class="table__span">text</span>
                    <input class="table__input_phone" data-table-input type="text" placeholder="Phone">
                </div>
                <div class="table__item">
                    <span class="table__span">text</span>
                    <input class="table__input_country" data-table-input type="text" placeholder="Country">
                </div>
                <button class="table__button">edit</button>
            </div>
        </div>
        `)
    }
        

    loadTable() {
        const array = this.getStorage('registration')
        if (array !== null) {
            for(let i = 0; i < array.length; i++) {
                this.createItemTable()
                this.conteiner.firstElementChild.childNodes[3].innerText = array[i][0][1]
            }
        }  
    }

    addInTable() {
        if (stateOfRegistration) {
            const storage = this.getStorage('registration')
            const item = storage[storage.length - 1][0][1]
            this.createItemTable()
            this.conteiner.firstElementChild.childNodes[3].innerText = item
        }   
    }
    
    viewTableItem() {
        const storage = this.getStorage('registration')
        const name = event.target.parentElement.previousElementSibling.innerText
        const findItem = storage.find(e => e[0][1] === name)
        this.createModal(findItem.join('\n').replaceAll(',', ': '))
        
    }

    deleteTableItem() {
        const storage = this.getStorage('registration')
        const name = event.target.parentElement.previousElementSibling.innerText
        const findItem = storage.findIndex(e => e[0][1] === name)
        storage.splice(findItem, 1)
        console.log(storage)
        this.updateStorage('registration', storage)
    }

    editTableItem(btn) {
        this.createModal("")
        if (!this.modal.conteiner.classList.contains('table-active')) {
            this.createTableInputs()
        }
        this.modal.conteiner.classList.add('table-active')
        const inputsTable = document.querySelectorAll('input[data-table-input]')
        inputsTable[0].value = ''
        inputsTable[1].value = ''
        inputsTable[2].value = ''
        inputsTable[3].value = ''
        this.tableEditTarget = event.target.parentElement.previousElementSibling.innerText
        this.tableEditBtn = document.querySelector('.table__button')


        if (!this.modal.conteiner.classList.contains('edit-table-btn')) {
            this.tableEditBtn.addEventListener('click', () => this.onclickEditTable())
        }
        this.modal.conteiner.classList.add('edit-table-btn')
        
        console.log(this.tableEditTarget)
    }
     

    onclickEditTable() {
        const storage = this.getStorage('registration')
        const inputsTable = document.querySelectorAll('input[data-table-input]')
        const email = inputsTable[0].value 
        const password = inputsTable[1].value 
        const phone = inputsTable[2].value 
        const country = inputsTable[3].value

        const findElem = storage.findIndex(e => e[0][1] === this.tableEditTarget)
        
        storage[findElem][0][1] = email
        storage[findElem][1][1] = password
        storage[findElem][2][1] = phone
        storage[findElem][3][1] = country
        localStorage.setItem('registration', JSON.stringify(storage))
        console.log(storage[findElem])
        location.reload()
    }
       
    }




