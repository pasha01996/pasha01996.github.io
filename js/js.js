function minLength(value) {
    return value.length >= 2 
}

function firstLetterCapital(value) {
    reg = /[A-Z\.]/
    return reg.test(value[0])
}




class Control {
    constructor(id, checks){
        this.id = id
        this.checks = checks
        this.elemenLink = document.getElementById(id)
    }
    startChecks() {
        return this.checks.every(check => check(this.elemenLink.value))
    }
}   



const control = new Control('email', [minLength, firstLetterCapital])

const control1 = new Control('email', [minLength, firstLetterCapital])




const form = new Form(formOption)


form.form.signup.addEventListener('submit', (event) => form.registration(event))




function registration() {
    const isValid = [control, control1].every(emel => emel.startChecks())
    
    if (isValid) {
        this.setLocalStorage(this.nameOfStorage)
        isRegistered = true
        this.createModal('Successful registration')
    } else { 
        this.createModal('Try another email or password')
        isRegistered = false
    }
    this.form.signup.reset()
}