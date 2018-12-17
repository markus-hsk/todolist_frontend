import {Component, OnInit} from '@angular/core';

import {Todo} from '../todo';
import {TodoService} from '../todo.service';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

    public todos: Todo[];
    public searchterm = '';

    constructor(private todoService: TodoService) {
    }

    ngOnInit() {
        this.getRecords();
    }


    /**
     * Fetch all records from the Service
     *
     * @return  void
     * @author  Markus Buscher
     */
    getRecords(): void {
        this.todoService.getAll(this.searchterm).subscribe(todos => this.todos = todos);
    }


    /**
     * Delete a record from the Service
     *
     * @return  void
     * @author  Markus Buscher
     */
    delete(todo: Todo): void {
        const result = confirm('Wollen sie diesen Eintrag wirklich unwiderruflich löschen?');
        if (result) {
            this.todos = this.todos.filter(h => h !== todo);
            this.todoService.deleteRecord(todo).subscribe();
        }
    }
}
