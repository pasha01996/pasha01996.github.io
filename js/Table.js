import {isAuthorized, isRegistered} from "./Page.js"


export class Table {
    constructor(id, options) {
        this.id = id
        this.container = options.container
        this.btn = options.btn
        this.modal = options.modal
        this.nameOfStorage = options.nameOfStorage
        this.localStorage = JSON.parse(localStorage.getItem(this.nameOfStorage) || '[]')
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

    createCell(userEmail) {
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

    // createEditForm(element, userEmail) {
    //     element.insertAdjacentHTML('afterbegin', `
    //     <div class="modal__table" id="form-container-edit">
    //         <span class="modal__table_title">Edit data:</span>
    //         <div class="modal__table_inputs">
    //             <form id="modal-table-form" action="#">
    //                 <input class="table__input_email" id="inputEmailEdit" name="email" type="email" placeholder="Email">
    //                 <input class="table__input_password" id="inputPassEdit" name="password" type="text" placeholder="Password">
    //                 <input class="table__input_phone" id="inputPhoneEdit" name="phone" type="text" placeholder="Phone">
    //                 <input class="table__input_country" id="inputCountryEdit" name="country" type="text" placeholder="Country">
    //             </form>
    //             <button class="table__button" data-table-btn-confirmedit="${userEmail}">edit</button>
    //         </div>
    //     </div>
    //     `)
    // }
    
    

    createTable(localStorage) {
        if (localStorage) {
            for(let i = 0; i < localStorage.length; i++) {
                this.createCell(localStorage[i].email)
            }
        }  
    }

    // addCellInTable() {
    //     if (isRegistered) {
    //         const storage = this.getLocalStorage(this.nameOfStorage)
    //         const registeredUser = storage[storage.length - 1].email
    //         this.createCell(registeredUser)
    //     }
    // }

    viewTableItem(event) {
        if (isAuthorized) {
            const userEmail = event.target.dataset.tableBtnView
            const findItem = this.localStorage.find(user => user.email === userEmail)
            this.createModal(Object.entries(findItem).join('\n').replaceAll(',', ': '))
        } else {
            this.createModal('Please login for using this interface')
        }
    }

    deleteTableItem(event) {
        if (isAuthorized) {
            const storage = this.getLocalStorage(this.nameOfStorage)
            const userEmail = event.target.dataset.tableBtnDelete
            const user = storage.findIndex(e => e.email === userEmail)
            storage.splice(user, 1)
            this.updateStorage(this.nameOfStorage, storage)
            location.reload()
        } else {
            this.createModal('Please login for using this interface')
        }
    }

    // createModalTable(event) {
    //     if (isAuthorized) {
    //         this.emailUserToFind = event.target.dataset.tableBtnEdit
    //         this.createModal("")
    //         this.createEditForm(this.emailUserToFind)
    //         this.modal.container.classList.add('table-active')
    //     } else {
    //         this.createModal('Please login for using this interface')
    //     }
    // }
     
    // onclickEditTable() {
    //     this.modal.form = document.querySelector('#modal-table-form')
    //     const dataFormModal = this.getFormData(this.modal.form)
    //     const findUser = this.localStorage.findIndex(user => user.email === this.emailUserToFind)
    //     this.localStorage[findUser] = dataFormModal
    //     localStorage.setItem(this.nameOfStorage, JSON.stringify(this.localStorage))
    //     location.reload()
    // }   
}