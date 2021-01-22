// added Input to imports
// added EventEmitter to import
// added Output to import
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

// imports the TodoService called TodoServiceService from location
import { TodoServiceService } from '../../services/todo-service.service';

// Auto Generated import from @Input()
import { Todo } from 'src/app/models/Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  // created an input property
  @Input() todo: Todo;

  // created an output property
  @Output() deleteItem: EventEmitter<Todo> = new EventEmitter();

  // injects the TodoService into the constructor
  constructor(private todoService:TodoServiceService) { }

  ngOnInit(): void {
  }

  // custom method which sets dynamic classes
  setClasses() {
    /* creates a variable called classes and if the objects inside
       the class is of variable todo then if isCompleted=true
       the css style from is-completed{...} is run on it.
    */
    let classes = {
      todo: true,
      'is-completed':this.todo.completed
    }
    return classes;
  }

  /*
    the onToggle and onDelete methods are associated with an
    even in the todo-item-component.html file with an event like
    click or change. They both receive a parameter of todo
    and execute their respective code.
  */
  onToggle(todo) {
    // Toggle in UI
    todo.completed = !todo.completed;

    // Toggle on server
    // this will return an observable again so we will use 
    // .subscribe()
    this.todoService.toggleCompleted(todo).subscribe(todo => {
      console.log(todo);
    });
  }

  // when the delete button is clicked and the click event is run
  // this method is run, when this button is run the @Output and 
  // EventEmitter emits the request out of this file to the
  // todos.component.ts file and as a deleteItem function is located
  // in that file that function is run. This is because it is
  // said in todos.component.html that when this event happens it
  // should run the deleteItem method
  onDelete(todo) {
    this.deleteItem.emit(todo);
  }

}
