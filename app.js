// ****** SELECT ITEMS **********
const form = document.querySelector(".grocery-form");
const alert = document.querySelector(".alert");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

// edit option
let editElement;
let editFlag = false;
let editID = "";

// ****** EVENT LISTENERS **********
form.addEventListener('submit', addItem);

clearBtn.addEventListener('click', clearItems)
// ****** FUNCTIONS ***** *****
function addItem(e) {
    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getTime().toString(); //CHEAT CODE TO ENERATE UNIQUE ID
    
    //logic to display and use the edit flag
    if (value !== "" && !editFlag) {
        //create container
        const element = document.createElement('article')
        //add class
        element.classList.add('grocery-item');
        //add id
        const attr = document.createAttribute('data-id')
        attr.value = id;
        element.setAttributeNode(attr);
        element.innerHTML = ` <p class="title">${value}</p>
        <div class="btn-container">
          <!-- edit btn -->
          <button type="button" class="edit-btn">
            <i class="fas fa-edit"></i>
          </button>
          <!-- delete btn -->
          <button type="button" class="delete-btn">
            <i class="fas fa-trash"></i>
          </button>
        </div>`
        const deleteBtn = element.querySelector('.delete-btn').addEventListener('click', deleteItem);
        const editBtn = element.querySelector('.edit-btn').addEventListener('click', editItem);

        //appending a list
        list.appendChild(element)
        displayAlert("item added to list","success")
        //make container visible
        container.classList.add("show-container")
        //  console.log('adding item')

         // set local storage
    addToLocalStorage(id, value);
    // set back to default
    setBackToDefault();
    } else if (value && editFlag) {
        console.log('editing')
    } 
    else{
        //console.log('empty')
      displayAlert('please enter a value');
      } 
    }
      // display alert
function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    // remove alert
    setTimeout(function () {
      alert.textContent = "";
      alert.classList.remove(`alert-${action}`);
    }, 1000);
  }

//clear items
function clearItems(){
    const items = document.querySelectorAll('.grocery-item');
    if(items.length > 0){
        items.forEach((item) => {
            list.removeChild(item)
        });
    }
    container.classList.remove('show-container');
    displayAlert("List is empty", "danger")
    setBackToDefault();
    //localStorage.removeItem('list)
}

// delete items

function deleteItems(e){
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
  
    list.removeChild(element);
  
    if (list.children.length === 0) {
      container.classList.remove("show-container");
    }
    displayAlert("item removed", "danger");
  
    setBackToDefault();
    // remove from local storage
    removeFromLocalStorage(id);
}

// edit item
function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    // set edit item
    editElement = e.currentTarget.parentElement.previousElementSibling;
    // set form value
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    //
    submitBtn.textContent = "edit";
  }


//setting back to default  for the input field
function setBackToDefault(){
    // console.log('Default');
    grocery.value = "";
    editFlag = false;
    editID = "";
    submitBtn.textContent = "submit"
}
// ****** LOCAL STORAGE **********

function addToLocalStorage(id,value){
    const grocery = { id, value };
    let items = getLocalStorage();
    items.push(grocery);
    localStorage.setItem("list", JSON.stringify(items));
  }
  
  function getLocalStorage() {
    return localStorage.getItem("list")
      ? JSON.parse(localStorage.getItem("list"))
      : [];
  }
  
  function removeFromLocalStorage(id) {
    let items = getLocalStorage();
  
    items = items.filter(function (item) {
      if (item.id !== id) {
        return item;
      }
    });
  
    localStorage.setItem("list", JSON.stringify(items));
  }

function editLocalStorage(id,value){
    let items = getLocalStorage();

    items = items.map(function (item) {
      if (item.id === id) {
        item.value = value;
      }
      return item;
    });
    localStorage.setItem("list", JSON.stringify(items));
  }
}
// ****** SETUP ITEMS **********