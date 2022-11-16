import {isAuthorized, isRegistered} from "./Form.js"


export class Table {
    constructor(options) {
        this.storageRegistration = options.nameOfStorage
        this.container = options.container
        this.btn = options.btn
        this.modal = options.modal
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
        
        if (event.target == this.modal.btn) {
            this.modal.container.style.display = "none"
        } 
    }

    getFormData(form) {
        this.formData = new FormData(form)
        let array = Array.from(new FormData(form))
        return Object.fromEntries(array)
        
    }

    getLocalStorage(key) {
        return JSON.parse(localStorage.getItem(key))
    }

    createTableInputs() {
        return this.modal.content.insertAdjacentHTML('afterbegin', `
        <div class="modal__table">
            <span class="modal__table_title">Edit data:</span>
            <div class="modal__table_inputs">
                <form id="modal-table-form" action="js/script.js" method="post">
                    <input class="table__input_email" name="email" type="email" placeholder="Email">
                    <input class="table__input_password" name="password" type="text" placeholder="Password">
                    <input class="table__input_phone" name="phone" type="text" placeholder="Phone">
                    <input class="table__input_country" name="country" type="text" placeholder="Country">
                </form>
                <button class="table__button" data-table-btn-confirmedit="true">edit</button>
            </div>
        </div>
        `)
    }
    
    createItemTable(userEmail) {
        if (userEmail) {
            return this.container.insertAdjacentHTML('afterbegin', `
            <div class="table__user">
                <span class="item__description">user:</span>
                <span class="item__name">${userEmail}</span>
                <div class="item__buttons">
                    <button class="table_btn_edit" data-table-btn-edit="${userEmail}">edit</button>
                    <button class="table_btn_delete" data-table-btn-delete="${userEmail}">delete</button>
                    <button class="table_btn_view" data-table-btn-view="${userEmail}">view</button>
                </div>
            </div>
            `)  
        }
    }

    createTable() {
        const registeredUsers = this.getLocalStorage(this.storageRegistration)
        if (registeredUsers) {
            for(let i = 0; i < registeredUsers.length; i++) {
                this.createItemTable(registeredUsers[i].email)
            }
        }  
    }

    addInTable() {
        if (isRegistered) {
            const storage = this.getLocalStorage(this.storageRegistration)
            const registeredUser = storage[storage.length - 1].email
            this.createItemTable(registeredUser)
        }   
    }

    viewTableItem(event) {
        if (isAuthorized) {
            const storage = this.getLocalStorage(this.storageRegistration)
            const userEmail = event.target.dataset.tableBtnView
            const findItem = storage.find(e => e.email === userEmail)
            this.createModal(Object.entries(findItem).join('\n').replaceAll(',', ': '))
        } else {
            this.createModal('Please login for using this interface')
        }
    }

    deleteTableItem(event) {
        if (isAuthorized) {
            const storage = this.getLocalStorage(this.storageRegistration)
            const userEmail = event.target.dataset.tableBtnDelete
            const user = storage.findIndex(e => e.email === userEmail)
            storage.splice(user, 1)
            this.updateStorage(this.storageRegistration, storage)
            location.reload()
        } else {
            this.createModal('Please login for using this interface')
        }
    }

    updateStorage(key, item) {
        localStorage.setItem(key, JSON.stringify(item))
    }


    createModalTable(event) {
        if (isAuthorized) {
            this.createModal("")
            !this.modal.container.classList.contains('table-active') && this.createTableInputs()
            this.modal.container.classList.add('table-active')
            this.emailUserToFind = event.target.dataset.tableBtnEdit
        } else {
            this.createModal('Please login for using this interface')
        }
    }
     
    onclickEditTable() {
        const registeredUsers = this.getLocalStorage(this.storageRegistration)
        this.modal.form = document.querySelector('#modal-table-form')
        const dataFormModal = this.getFormData(this.modal.form)
        const findUser = registeredUsers.findIndex(user => user.email === this.emailUserToFind)
        registeredUsers[findUser] = dataFormModal
        localStorage.setItem(this.storageRegistration, JSON.stringify(registeredUsers))
        location.reload()
    }   
}