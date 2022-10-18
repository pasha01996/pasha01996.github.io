const moduls = {

switchForm: function(form1, form2) {
    form1.classList.toggle('not_active')
    form2.classList.toggle('not_active')
},


isValidSignUp: function(regexp, input) {
    return regexp.test(input.value)
},

addToStorage: function(name, input) {
    localStorage.setItem(name, JSON.stringify(input.value))
},

isValidSignIn: function(inputEmail, inputPass) {
    let emailStorage = localStorage.getItem('email')
    let passwordStorage = localStorage.getItem('password')
    return (JSON.parse(emailStorage) === inputEmail.value && JSON.parse(passwordStorage) === inputPass.value)
},

createModal: function(modal, modalText, text) {
    modal.style.display = 'block'
    modalText.innerText = text

},

checkPassword: function(modal, modalText) {
    let a = localStorage.getItem('email')
    let b = localStorage.getItem('password') 
    
    this.createModal(modal, modalText,`Your Email: ${a} \n Your password: ${b}`)
},

closeModal: function(event, modal, modalText) {
    (event.target == modal || event.target == modalText) ? modal.style.display = "none" : false
}
}

export default moduls