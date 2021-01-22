/* The Todo model used in the todo component
   contains the fields in used by a todo component.

   if a field has a ? for instance: id?:number would mean the
   field is optional
*/
export class Todo {
    id:number;
    title:string;
    completed:boolean;
}