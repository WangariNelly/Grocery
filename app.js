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
        //appending a list
        list.appendChild(element)
        displayAlert("item added to list","success")
        //make container visible
        container.classList.add("show-container")
        //  console.log('adding item')
    } else if (value && editFlag) {
        console.log('editing')
    } 
    else{
        //console.log('empty')
      displayAlert('please enter a value');
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
}
// ****** LOCAL STORAGE **********

// ****** SETUP ITEMS **********