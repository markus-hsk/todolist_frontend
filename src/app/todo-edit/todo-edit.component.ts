import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';

import {Todo} from '../todo';
import {TodoService} from '../todo.service';

@Component({
    selector: 'app-todo-edit',
    templateUrl: './todo-edit.component.html',
    styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent implements OnInit {
    @Input() todo: Todo;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private todoService: TodoService) {
    }

    ngOnInit(): void {
        this.todo = new Todo(); // initialize with an empty object
        this.getRecord();
    }


    /**
     * Fetch the record from the Service
     *
     * @return  void
     * @author  Markus Buscher
     */
    getRecord(): void {
        const id = +this.route.snapshot.paramMap.get('id');

        if (id !== 0) {
            this.todoService.getRecord(id).subscribe(todo => this.todo = todo);
        } else {
            this.todo = new Todo();
            this.todo.id = 0;
        }
    }


    /**
     * Ask the user, if he really wants to cancel the input an return to the list with on yes
     *
     * @return  void
     * @author  Markus Buscher
     */
    cancel(): void {
        const result = confirm('Möchten Sie die Eingabe wirklich abbrechen und zur Liste zurückkehren?');
        if (result === true) {
            this.goToList();
        }
    }


    /**
     * Go to the list view
     *
     * @return  void
     * @author  Markus Buscher
     */
    goToList(): void {
        this.router.navigateByUrl('/todos');
    }


    /**
     * write the data to the server through the Service and go back to the list
     *
     * @return  void
     * @author  Markus Buscher
     */
    save(): void {
        if (this.todo.id > 0) {
            this.todoService.updateRecord(this.todo).subscribe(() => this.goToList());
        } else {
            this.todoService.addRecord(this.todo).subscribe(() => this.goToList());
        }
    }
}
