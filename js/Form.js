export let isAuthorized = false
export let isRegistered = false

export class Form {
    constructor(options){
        this.container = options.container
        this.form = options.form
        this.regExp = options.regExp
        this.btn = options.btn
        this.nameOfStorage = options.nameOfStorage
        this.modal = options.modal
        this.inputs = options.inputs
    }
    isValid() {
        
    }

    createModal(text) {
        this.modal.container.style.display = 'block'
        this.modal.text.innerText = text
    }

    closeModal(event) {
        if (this.modal.container.classList.contains('table-active')) {
            this.modal.content.firstChild.nextElementSibling.remove()
        }
        this.modal.container.classList.remove('table-active')
        this.modal.container.style.display = "none"
    }

    switchForm() {
        this.container.signup.classList.toggle('not_active')
        this.container.signin.classList.toggle('not_active')
    }

    getFormData(form) {
        this.formData = new FormData(form)
        let array = Array.from(new FormData(form))
        return Object.fromEntries(array)
    }

    isValidSignup() {
        const formData = this.getFormData(this.form.signup)
        return this.regExp.email.test(formData.email) && this.regExp.password.test(formData.password)
    }

    isValidSignin() {
        const form = this.getFormData(this.form.signin)
        const storage = this.getLocalStorage(this.nameOfStorage)
        const findUser = storage.find(elem => elem.email === form.email && elem.password === form.password)
        console.log(findUser)
        return findUser ? true : false
    }

    setLocalStorage(name) {
        const storage = this.getLocalStorage(name)
        const obj = this.getFormData(this.form.signup)
        storage.push(obj)
        localStorage.setItem(name, JSON.stringify(storage))
    }

    getLocalStorage(name) {
        return JSON.parse(localStorage.getItem(name) || '[]')
    }

    registration(event) {
        event.preventDefault()
        if (this.isValidSignup()) {
            this.setLocalStorage(this.nameOfStorage)
            isRegistered = true
            this.createModal('Successful registration')
        } else { 
            this.createModal('Try another email or password')
            isRegistered = false
        }
        this.form.signup.reset()
    }

    authorization(event) {
        event.preventDefault()
        if (this.isValidSignin()) {
            this.createModal('Successful authorization')
            isAuthorized = true
        } else {
            this.createModal('Try another email or password')
            isAuthorized = false
        }
        this.form.signin.reset()
    }

}


