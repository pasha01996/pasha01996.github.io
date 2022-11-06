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
                <span class="table_body" data-body></span>
                <div class="table_buttons">
                    <button class="table_btn_edit" id="tableBtnEdit">edit</button>
                    <button class="table_btn_delete" data-table_btn_delete="true">delete</button>
                    <button class="table_btn_view" data-table_btn_view="true">view</button>
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
            const array = this.getStorage('registration')
            const item = array[array.length - 1][0][1]
            this.createItemTable()
            this.conteiner.firstElementChild.childNodes[3].innerText = item
        }   
    }
    
    viewTableItem() {
        const array = this.getStorage('registration')
        const name = event.target.parentElement.previousElementSibling.innerText
        const findItem = array.find(e => e[0][1] === name)
        this.createModal(findItem.join('\n').replaceAll(',', ': '))
        
    }

    deleteTableItem() {
        const array = this.getStorage('registration')
        const name = event.target.parentElement.previousElementSibling.innerText
        const findItem = array.findIndex(e => e[0][1] === name)
        array.splice(findItem, 1)
        console.log(array)
        this.updateStorage('registration', array)
    }

    editTableItem() {
        
    }


    FORTEST() {
        
    }
    
       
    }




