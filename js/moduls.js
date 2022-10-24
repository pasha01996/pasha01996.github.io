const moduls = {

switchForm: function(form1, form2) {
    form1.classList.toggle('not_active')
    form2.classList.toggle('not_active')
},

isValidSignUp: function(input, regexp) {
    return regexp.test(input.value)
},

isValidSignIn: function(input, storage) {
    let a = localStorage.getItem(storage)
    return (JSON.parse(a) === input.value)
},

addToStorage: function(input, name) {
    localStorage.setItem(name, JSON.stringify(input.value))
},

closeModal: function(event, modal, modalText) {
    (event.target == modal || event.target == modalText) ? modal.style.display = "none" : false
},

createModal: function(modal, modalText, text) {
    modal.style.display = 'block'
    modalText.innerText = text

}
}

export default moduls