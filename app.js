const toggleSwitch = document.querySelector('#checkbox');
const todoForm = document.querySelector('#form1');
const todoList = document.querySelector('#thelist');
const userEntry = document.querySelector('#todoItem');



/* dark mode stuff */
if(localStorage.darkmode == 'true'){
    toggleSwitch.checked = 'true';
    document.body.className = "dark";
}

toggleSwitch.addEventListener('click', function(e){
    const {checked} = toggleSwitch;
    document.body.className = checked ? "dark" : "";
    localStorage.darkmode = checked;
});

// localStorage.todoList = JSON.stringify([{"item":"DMV", "class":"completed"},{"item":"go to store", "class":"open"}]);

// initialize ui upon return to webpage
if (localStorage.todoList){
    console.log(rebuild());
}


// rebuilding todo list from localStorage
// localStorage is re-initialized - algorithm is delete and re-write upon page reload
function rebuild(){
    todoObjects = JSON.parse(localStorage.todoList);
    localStorage.removeItem('todoList'); // delete or we get dupes on adding back
    for (const obj of todoObjects){
        makeTodo(obj.item, obj.class);
    }
};


// form entry and create line items
function makeButton(){
    a_button = document.createElement('button');
    a_button.innerText = "remove"
    return a_button;
}


// make a todo list item from manual add or local storage rebuild
// algorithm is add to back of queue
function makeTodo(text, complete){

    newTodo = document.createElement('li');

    if (text === undefined){ // manual add path
        newTodo.innerText = userEntry.value;
    }else{ // auto rebuild path
        newTodo.innerText = text;
    }
    if (complete === 'completed'){ // auto rebuild path
        newTodo.setAttribute('class', 'completed')
    }else{newTodo.setAttribute('class', 'open')}; // init class

    pushLocalStorage(newTodo);
    newTodo.append(makeButton());
    todoList.append(newTodo);


    userEntry.value = "";
};


// build localStorage when adding
function pushLocalStorage(todoItem){
    todoObjects = [];
    if (localStorage.todoList){
        todoObjects = JSON.parse(localStorage.todoList);
    }
    todoObjects.push({"item":todoItem.innerText, "class":todoItem.classList[0]});
    localStorage.todoList = JSON.stringify(todoObjects);
};


// when remove button is hit, listener calls this
// removes from localStorage and UI
function removeItem(button){
    let li = button.parentElement
    todoObjects = JSON.parse(localStorage.todoList);
    todoObjects.splice(getIndice(li,todoObjects),1);
    localStorage.todoList = JSON.stringify(todoObjects);
    button.parentElement.remove();
};


// find the indice of the item in the list
function getIndice(item, objList){
    let location = 0
    for(let i = 0;i < objList.length;i++){
        //remove extra remove (button innerText)
        if (item.innerText.slice(0,-6) === objList[i].item && item.getAttribute('class') === objList[i].class){
            location = i;
        }
    }
    return location;
}


// TODO - storage in class not updating
// update class adjustments in local storage
function updateLocalStorage(li, aString){
    let location = 0;
    todoObjects = JSON.parse(localStorage.todoList);
    location = getIndice(li, todoObjects);
    console.log(location); /// always loggin 0
    todoObjects[location].class = aString;
    localStorage.todoList = JSON.stringify(todoObjects);
}


// have to update local storage first or you won't find a match with storage
todoList.addEventListener('click', function(e){
    if (e.target.tagName === "BUTTON"){
        removeItem(e.target);
    }else if (e.target.tagName === "LI"){
        if(e.target.classList.contains('completed')){
            updateLocalStorage(e.target, 'open');
            e.target.setAttribute('class', 'open');
        }else{
            updateLocalStorage(e.target, 'completed');
            e.target.setAttribute('class', 'completed');

        }
    }
});

todoForm.addEventListener("submit", function(e){
    e.preventDefault();
    makeTodo();
});


