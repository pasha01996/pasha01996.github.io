export let isAuthorized = false
export let isRegistered = false

export class Page {
    constructor(options) {
        this.formSignup = options.formSignup
        this.formSignin = options.formSignin
        this.btn = options.btn
        this.nameOfStorage = options.nameOfStorage
    }

    switchForm() {
        this.formSignup.conteiner.classList.toggle('not_active')
        this.formSignin.conteiner.classList.toggle('not_active')    //GOOD
    }

    setLocalStorage(name, userData) {
        const storage = this.getLocalStorage(name)
        storage.push(userData)
        localStorage.setItem(name, JSON.stringify(storage))
    }

    getLocalStorage(name) {
        return JSON.parse(localStorage.getItem(name) || '[]')
    }
    
    registration(event) {
        event.preventDefault()
        
        const userData = {}
        for (let i = 0; i < this.formSignup.inputs.length; i++) { 
            userData[this.formSignup.getAttributes()[i]] = this.formSignup.getValues()[i]   
        }

        if (this.formSignup.isValidForm()) {
            this.setLocalStorage(this.nameOfStorage, userData)   
            isRegistered = true
            this.switchForm()                                 
        } else {
            isRegistered = false 
        }
    }

    authorization(event) {
        event.preventDefault()
        if (this.formSignin.isValidForm()) {
            isAuthorized = true
        } else {
            isAuthorized = false
        }
    }

}