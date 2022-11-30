
export class Control {
    constructor(id, checks){
        this.checks = checks
        this.elemenLink = document.getElementById(id)
    }

    startChecks() {
        return this.checks.every(check => check(this.elemenLink.value))
    }

    getAttribute() {
        return this.elemenLink.getAttribute("name")
    }
    
    getValue() {
        return this.elemenLink.value
    }

    showError() {
        this.elemenLink.value = ''
        this.elemenLink.classList.add('form__input_error')
        this.elemenLink.placeholder = 'Enter correct' + ' ' + this.getAttribute()
    }

}   