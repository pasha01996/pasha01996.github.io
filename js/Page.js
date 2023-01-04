export let isAuthorized = false
export let isRegistered = false

export class Page {
    constructor(options) {
        this.elements = options.elements
        this.btn = options.btn
        this.elementsArray = Object.values(this.elements)
        this.nameOfStorage = options.nameOfStorage
        this.localStorage = JSON.parse(localStorage.getItem(this.nameOfStorage) || '[]')
    }   

    setLocalStorage(userData) {
        this.localStorage.push(userData)
        localStorage.setItem(this.nameOfStorage, JSON.stringify(this.localStorage))
    }

    switchToElement(formId) {
        this.elementsArray.forEach(elem => { 
            if(!elem.container.classList.contains('not_active')) {elem.container.classList.toggle('not_active')}
            if (elem.id === formId) {elem.container.classList.toggle('not_active')}
        })
    }
    
    registration(event) {
        event.preventDefault()
        
        const userData = {}
        for (let i = 0; i < this.elements.formSignup.inputs.length; i++) { 
            userData[this.elements.formSignup.getAttributes()[i]] = this.elements.formSignup.getValues()[i]
        }

        if (this.elements.formSignup.isValidForm()) {
            this.setLocalStorage(userData)   
            isRegistered = true
            this.switchToElement('form-container-signin')                                 
        } else {
            isRegistered = false 
        }
    }

    authorization(event) {
        event.preventDefault()
        if (this.elements.formSignin.isValidForm()) {
            isAuthorized = true
            this.elements.table.createTable(this.localStorage)
            this.switchToElement('table-users')
        } else {
            isAuthorized = false
            
        }
    }

    createEditForm(userEmail) {
        const htmlElem = document.createElement('div')
        htmlElem.classList.add('modal__table')
        htmlElem.setAttribute('id','form-container-edit')
        htmlElem.insertAdjacentHTML('afterbegin', `
        <span class="modal__table_title">Edit data:</span>
        <div class="modal__table_inputs">
            <form id="modal-table-form" action="#">
                <input class="table__input_email" id="inputEmailEdit" name="email" type="email" placeholder="Email">
                <input class="table__input_password" id="inputPassEdit" name="password" type="text" placeholder="Password">
                <input class="table__input_phone" id="inputPhoneEdit" name="phone" type="text" placeholder="Phone">
                <input class="table__input_country" id="inputCountryEdit" name="country" type="text" placeholder="Country">
                <p>And more:</p>
                <div>
                    <label for="gender-select">Gender:</label>
                    <select name="gender" id="gender-select">
                        <option value="male">male</option>
                        <option value="woman">woman</option>
                    </select>
                </div>
                <div name="checkbox" id="checkbox-interests">
                    <p>Interests:</p>
                    <div>
                        <input type="checkbox" id="first-checkbox" value="first checkbox">
                        <label for="first-checkbox">first checkbox</label>
                    </div>
                    <div>
                        <input type="checkbox" id="second-checkbox" value="second checkbox">
                        <label for="second-checkbox">second checkbox</label>
                    </div>
                    <div>
                        <input type="checkbox" id="third-checkbox" value="third checkbox">
                        <label for="third-checkbox">third checkbox</label>
                    </div>
                </div>
                <p>Marital status:</p>
                <div class="radio_container" name="status" id="radio-marital-status" data-radio-container>
                    <input class="radio_married" type="radio" name="marital-status" value="married">
                    <input class="radio_single" type="radio" name="marital-status" value="single">
                </div>
                <div>
                    <p>Choose color of your mail:</p>
                    <input type="color" name="color" id="color-mail">
                </div>
                <br>
                <div>
                    <textarea id="description" name="description" placeholder="Tell about yourself:" rows="5" cols="33"></textarea>
                </div>
                <div>
                    <p>Age:</p>
                    <input type="number" name="age" id="age-user">
                </div>
            </form>

            <button class="table__button" data-table-btn-confirmedit="${userEmail}">edit</button>
        </div>

        `)
    
        this.elements.table.modal.content.prepend(htmlElem)
    }

    createModalTable(event) {
        if (isAuthorized) {
            this.emailUserToFind = event.target.dataset.tableBtnEdit
            this.elements.table.createModal("")
            this.createEditForm(this.emailUserToFind)
            this.elements.table.modal.container.classList.add('table-active')
        } else {
            this.elements.table.createModal('Please login for using this interface')
        }
    }

    onclickEditTable() {
        const userData = {}
        for (let i = 0; i < this.elements.formEditTable.inputs.length; i++) { 
            userData[this.elements.formEditTable.getAttributes()[i]] = this.elements.formEditTable.getValues()[i]
        }
        console.log(userData)
        const findUser = this.localStorage.findIndex(user => user.email === this.emailUserToFind)
        this.localStorage[findUser] = userData
        console.log(findUser)

        localStorage.setItem(this.nameOfStorage, JSON.stringify(this.localStorage))
        console.log('i do this')
    }  

}