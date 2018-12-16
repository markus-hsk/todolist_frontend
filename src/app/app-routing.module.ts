import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TodoListComponent} from './todo-list/todo-list.component';
import {TodoEditComponent} from './todo-edit/todo-edit.component';

const routes: Routes = [
    {path: '', redirectTo: '/todos', pathMatch: 'full'},
    {path: 'todos/:id', component: TodoEditComponent},
    {path: 'todos', component: TodoListComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
