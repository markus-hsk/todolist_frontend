import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {TodoEditComponent} from './todo-edit/todo-edit.component';
import {TodoListComponent} from './todo-list/todo-list.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule
    ],
    declarations: [
        AppComponent,
        TodoListComponent,
        TodoEditComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
