import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';

// import the Todo model from the models folder
import { Todo } from '../../models/Todo';

// import the TodoService from the services folder
import { TodoServiceService } from '../../services/todo-service.service'

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  // make an array of Todo models called todos
  todos:Todo[];

  // pass a private variable called TodoSercice of 
  // type TodoServiceService into the constructor
  constructor(private todoService:TodoServiceService) { }

  // ngOnInit is run when the page is initialised
  ngOnInit(): void {
    // as getTodos returns an Observable and as an Observable is
    // asynchrounous so data can arrive at different times so
    // we use .subscribe which can be though of as a then 
    // (or a promise if familiar with java promises or
    // a django get then).
    // this code currently says that when the data is received
    // from Todos, calling each json object recieved a todos 
    // set this.todos (an array of Todo) to the json received
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  deleteItem(todo:Todo) {
    this.todos = this.todos.filter(t => {
      // loops through all the todos and removes the selected
      // todo from the UI
      t.id !== todo.id;

      // as nothing is returned with a delete request the
      // subscribe does not need to handle any returned data
      // so it can be left empty
      // removes the todo from the database
      this.todoService.deleteItem(todo).subscribe();
    });
  }

  addTodo(todo:Todo) {
    this.todoService.addTodo(todo).subscribe(todo => {
      this.todos.push(todo);
    })
  }

}
