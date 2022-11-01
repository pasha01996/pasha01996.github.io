class Form {
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
                this.createModal('Successful registration')
            } else {
                this.createModal('Enter correct Email or Password')
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


export default Form