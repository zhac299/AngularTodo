import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// Allows us to add our routes to project
import { TodosComponent } from './components/todos/todos.component';

import { AboutComponent } from './components/pages/about/about.component';

const routes: Routes = [
    { path: '', component: TodosComponent },
    { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }