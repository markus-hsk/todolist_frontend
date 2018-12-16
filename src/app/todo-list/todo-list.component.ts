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
        this.todoService.getAll().subscribe(todos => this.todos = todos);
    }


    /**
     * Delete a record from the Service
     *
     * @return  void
     * @author  Markus Buscher
     */
    delete(todo: Todo): void {
        this.todos = this.todos.filter(h => h !== todo);
        this.todoService.deleteRecord(todo).subscribe();
    }
}
