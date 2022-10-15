import moduls from "./moduls.js"

const Form = function(id) { 
    //html
    this.formConteiner = id;

    this.formSignIn = id.children[0];
    this.formSignUp = id.children[1];
//signIn
    this.inputSignInEmail = this.formSignIn.children[1];
    this.inputSignInPass = this.formSignIn.children[2].children[0];
    this.inputSignInPassViewer = this.formSignIn.children[2].children[1];
    this.inputSignInForgotPass = this.formSignIn.children[3];
    this.buttonSignIn = this.formSignIn.children[4];
    this.buttonSignInSwitch = this.formSignIn.children[8];
//signUp
    this.inputSignUpEmail = this.formSignUp.children[1];
    this.inputSignUpPass = this.formSignUp.children[2].children[0];
    this.inputSignUpPassViewer = this.formSignUp.children[2].children[1];
    this.inputSignUpPhone = this.formSignUp.children[3];
    this.inputSignUpCity = this.formSignUp.children[4];
    this.buttonSignUp = this.formSignUp.children[5];
    this.buttonSignUpSwitch = this.formSignUp.children[7];
//regex
    // this.regexEmail = /^([A-Za-z0-9_\-\.]{3,20})+\@([A-Za-z0-9_\-\.]{3,8})+\.([A-Za-z]{2,4})/
    // this.regexPass = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
    // this.regexPhone = /(\+)(\d){12}/
    // this.regexCity = /([A-Za-z\.]{3,20})/

//for better check in browser
    this.regexEmail = /([A-Za-z\.]{2,20})+\@([A-Za-z\.]{2,20})/
    this.regexPass = /([A-Za-z\.]{3,20})/
    this.regexPhone = /([A-Za-z\.]{3,20})/
    this.regexCity = /([A-Za-z\.]{3,20})/
//modal
    this.modal = id.children[2]
    this.modalText = this.modal.children[0].children[0]
    this.text = ''

//methods
    this.isValidEmail = () => moduls.isValidSignUp(this.regexEmail, this.inputSignUpEmail)
    this.isValidPass = () => moduls.isValidSignUp(this.regexPass, this.inputSignUpPass)
    this.isValidPhone = () => moduls.isValidSignUp(this.regexPhone, this.inputSignUpPhone)
    this.isValidCity = () => moduls.isValidSignUp(this.regexCity, this.inputSignUpCity)

    this.switchForm = () => moduls.switchForm(this.formSignUp, this.formSignIn)

    this.isValidSignIn = () => moduls.isValidSignIn(this.inputSignInEmail, this.inputSignInPass)

    this.addToStorage = () => moduls.addToStorage(this.inputSignUpEmail, this.inputSignUpPass, this.inputSignUpPhone, this.inputSignUpCity)
    
    this.createModal = () => moduls.createModal(this.modal, this.modalText, this.text)
   
    this.checkPassword = () => moduls.checkPassword(this.modal, this.modalText)

    this.closeModal = () => moduls.closeModal(event, this.modal, this.modalText)

    this.authorization = () => this.isValidSignIn() ? this.createModal(this.text = 'Successful authorization') : this.createModal(this.text = 'Try another Email or Password')

    this.registration = () => {
        if (this.isValidEmail() && this.isValidPass() && this.isValidPhone() && this.isValidCity()) {
            this.addToStorage()
            this.createModal(this.text = "Successful registration")
            console.log('Yes')
        } else {
            this.createModal(this.text = 'Enter correct Email or Password')
            console.log('No')
        }   
    }

//init
    this.init = function() {
        const that = this

        this.buttonSignInSwitch.addEventListener('click', (e) => that.switchForm(e))
        this.buttonSignUpSwitch.addEventListener('click', (e) => that.switchForm(e))

        this.buttonSignUp.addEventListener('click', () => that.registration())
        this.buttonSignIn.addEventListener('click', () => that.authorization())

        this.inputSignInForgotPass.addEventListener('click', () => that.checkPassword())

        this.modal.addEventListener('click', () => that.closeModal())

        this.inputSignInPassViewer.addEventListener('mousedown', () => this.inputSignInPass.type = 'text' )
        this.inputSignInPassViewer.addEventListener('mouseup', () => this.inputSignInPass.type = 'password')
        this.inputSignUpPassViewer.addEventListener('mousedown', () => this.inputSignUpPass.type = 'text')
        this.inputSignUpPassViewer.addEventListener('mouseup', () => this.inputSignUpPass.type = 'password')
    }
}



export default Form