import moduls from "./moduls.js"


class Form {
    constructor(options){
    this.modal = options.modal
    this.form = options.form
    this.name = options.name
    this.regExp = options.regExp
    this.btn = options.btn
    this.input = options.input
    }
  
    isValidSignIn = (input, storage) => moduls.isValidSignIn(input, storage)
    isValidSignUp = (regex, input) => moduls.isValidSignUp(regex, input)
    switchForm = () => moduls.switchForm(this.form.signIn, this.form.signUp)
    createModal = () => moduls.createModal(this.modal.conteiner, this.modal.text, this.modal.textValue)
    closeModal = () => moduls.closeModal(event, this.modal.conteiner, this.modal.text)

    getDataStorage(name) {
        return JSON.parse(localStorage.getItem(name) || '[]') 
    }

    addToStorage(name, obj) {
        let storage = this.getDataStorage(name)
        let array = Object.entries(obj)
        array.forEach(e => e[1] = e[1].value)
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
                this.createModal(this.modal.textValue ='Successful registration')
            } else {
                this.createModal(this.modal.textValue = 'Enter correct Email or Password')
            }
    }

    authorization() { 
        if(this.isValidSignIn()) {
            this.createModal(this.modal.textValue ='Successful authorization')
        } else {
            this.createModal(this.modal.textValue = 'Try another Email or Password')
        } 
    }
}


export default Form