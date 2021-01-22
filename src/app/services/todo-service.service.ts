// an Injectable allows us to inject this code into a constructor
// in a component.
import { Injectable } from '@angular/core';

// import the HttpClient and HttpHeader 
// (used to so we can identify the data format of JSON)
import { HttpClient, HttpHeaders } from '@angular/common/http'; 


import { Todo } from '../models/Todo';
import { Observable } from 'rxjs';

/*
  as data is being sent to be updated we have to send the 
  content type of application/json so it knows that we are
  sending data in json format
*/
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {

  todosUrl:string = 'https://jsonplaceholder.typicode.com/todos';
  // appened to the end of todosUrl when used to limit the 
  // number of results to 5
  todosLimit:string = '?_limit=5';

  // pass the HttpClient as http into the constructor
  constructor(private http:HttpClient) { }

  // function getTodos gets all the Todos via get request from
  // the todosUrl. returns an Observable.
  getTodos():Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.todosUrl}${this.todosLimit}`);
  }

    // deletes the todo from the server
  deleteItem(todo: Todo):Observable<Todo> {
    // forms a url to get the specfic todo being deleted
    const url = `${this.todosUrl}/${todo.id}`;
    // returns an observable which deletes the given todo
    return this.http.delete<Todo>(url, httpOptions);
  }
  
  // adds the todo to the UI and to the server
  addTodo(todo: Todo):Observable<Todo> {
    // sends a POST request to the server to save the todo to the server
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
  }

  // changes isCompleted via a PUT request to change the 
  // isCompleted value on the server
  toggleCompleted(todo: Todo):Observable<any> {
    // url constructs the url for that todo using the url and 
    // the id of that todo so that it can be updated
    const url = `${this.todosUrl}/${todo.id}`;

    // sends a put request with the following parameters
    // to update the data at the server
    return this.http.put(url, todo, httpOptions);
  }
}
