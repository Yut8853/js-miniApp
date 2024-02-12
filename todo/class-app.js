'use strict';

class TodoList {
  constructor() {
    this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    this.init();
  }

  saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  addTodo(todo) {
    this.todos.push(todo);
    this.saveTodos();
    this.renderTodo(todo);
  }

  deleteTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.saveTodos();
    this.renderAllTodos();
  }

  toggleTodoCompletion(id) {
    const todo = this.todos.find(todo => todo.id === id);
    if (todo) {
      todo.isCompleted = !todo.isCompleted;
      this.saveTodos();
    }
  }

  purgeCompletedTodos() {
    this.todos = this.todos.filter(todo => !todo.isCompleted);
    this.saveTodos();
    this.renderAllTodos();
  }

  createTodoElement(todo) {
    const li = document.createElement('li');
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = todo.isCompleted;
    input.addEventListener('change', () => {
      this.toggleTodoCompletion(todo.id);
    });
    const span = document.createElement('span');
    span.textContent = todo.title;
    const button = document.createElement('button');
    button.textContent = 'x';
    button.addEventListener('click', () => {
      if (confirm('Sure?')) {
        this.deleteTodo(todo.id);
      }
    });

    label.appendChild(input);
    label.appendChild(span);
    li.appendChild(label);
    li.appendChild(button);

    return li;
  }

  renderTodo(todo) {
    const li = this.createTodoElement(todo);
    document.querySelector('#todos').appendChild(li);
  }

  renderAllTodos() {
    const todosContainer = document.querySelector('#todos');
    todosContainer.innerHTML = ''; // Clear current todos
    this.todos.forEach(todo => this.renderTodo(todo));
  }

  init() {
    document.querySelector('#add-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.querySelector('#add-form input');
      const todo = {
        id: Date.now(),
        title: input.value,
        isCompleted: false,
      };
      this.addTodo(todo);
      input.value = '';
      input.focus();
    });

    document.querySelector('#purge').addEventListener('click', () => {
      if (confirm('Sure?')) {
        this.purgeCompletedTodos();
      }
    });

    this.renderAllTodos();
  }
}

// Initialize the Todo List
const todoList = new TodoList();
