const cl = console.log;
const todoForm = document.getElementById('todoForm');
const todoItemControl = document.getElementById('todoItem');
const addTodoBtn = document.getElementById('addTodoBtn');
const updateTodoBtn = document.getElementById('updateTodoBtn');
const todoList = document.getElementById('todoList');

let todoArr = [];

if(localStorage.getItem('todoArr')){
    todoArr = JSON.parse(localStorage.getItem('todoArr'))
}

const generateUuid = ()=> {
    return (
      String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
      const random = (Math.random() * 16) | 0;
      const value = character === "x" ? random : (random & 0x3) | 0x8;
      return value.toString(16);
});
};

const createCards = (arr) => {
    let result = '';
    arr.forEach(todo => {
        result += `  <li class="list-group-item d-flex justify-content-between" id='${todo.todoId}'>
                        <strong>${todo.todoItem}</strong>
                        <div>
                            <button class="btn btn-sm btn-outline-info mr-3" onclick='onEditTodo(this)'>Edit</button>
                            <button class="btn btn-sm btn-outline-danger mr-3" onclick='onRemoveTodo(this)'>Remove</button>
                        </div>
                    </li>`
    });
    todoList.innerHTML  = result;
}
createCards(todoArr);

const onEditTodo = (ele) => {
    let editId = ele.closest('li').id;
    cl(editId);
    localStorage.setItem('editId', editId);

    let editObj = todoArr.find(todo => todo.todoId === editId);
    cl(editObj);

    localStorage.setItem('todoArr', JSON.stringify(todoArr));
    addTodoBtn.classList.add('d-none');
    updateTodoBtn.classList.remove('d-none');

    todoItemControl.value = editObj.todoItem;
}

const onRemoveTodo = (ele) => {
    let getConfirm  = confirm('Are you sure to Remove this todo');
    cl(getConfirm);

    if(getConfirm){
        let removeId = ele.closest('li').id;
        cl(removeId);

        let getIndex = todoArr.findIndex(todo => todo.todoId === removeId);
        todoArr.splice(getIndex, 1);

        localStorage.setItem('todoArr', JSON.stringify(todoArr));
        ele.closest('li').remove();
    }
}

const onAddTodo = (eve) => {
    eve.preventDefault();
    let todoObj = {
        todoItem : todoItemControl.value,
        todoId : generateUuid(),
    }
    cl(todoObj);
    todoArr.unshift(todoObj);
    eve.target.reset();

    localStorage.setItem('todoArr', JSON.stringify(todoArr));

    let li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between';
    li.id = todoObj.todoId;
    li.innerHTML = ` <strong>${todoObj.todoItem}</strong>
                        <div>
                            <button class="btn btn-sm btn-outline-info mr-3" onclick='onEditTodo(this)'>Edit</button>
                            <button class="btn btn-sm btn-outline-danger mr-3" onclick='onRemoveTodo(this)'>Remove</button>
                        </div>`;
    todoList.prepend(li);
}

const onUpdateTodo = () => {
    let updateId = localStorage.getItem('editId');
    let updateObj = {
        todoItem : todoItemControl.value,
        todoId : updateId,
    }
    cl(updateObj);

    let getIndex = todoArr.findIndex(todo => todo.todoId === updateId);
    todoArr[getIndex] = updateObj;

    localStorage.setItem('todoArr', JSON.stringify(todoArr));
    todoForm.reset();
    addTodoBtn.classList.remove('d-none');
    updateTodoBtn.classList.add('d-none');

    let li = document.getElementById(updateId);
    li.firstElementChild.innerHTML = updateObj.todoItem;
}

todoForm.addEventListener('submit', onAddTodo);
updateTodoBtn.addEventListener('click', onUpdateTodo);