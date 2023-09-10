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

/* form entry and create line items */
function makeButton(){
    a_button = document.createElement('button');
    a_button.innerText = "remove"
    return a_button;
}


function makeTodo(){
    newTodo = document.createElement('li');
    newTodo.innerText = userEntry.value + '\t';
    newTodo.append(makeButton());
    todoList.append(newTodo);
    userEntry.value = "";
};

todoForm.addEventListener("submit", function(e){
    e.preventDefault();
    makeTodo();
});


todoList.addEventListener('click', function(e){
    if (e.target.tagName === "BUTTON"){
        e.target.parentElement.remove();
    }else if (e.target.tagName === "LI"){
        e.target.classList.toggle('completed');
    }
});
