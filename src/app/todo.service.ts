import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import {Todo} from './todo';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({providedIn: 'root'})
export class TodoService {

    private apiUrl = 'http://localhost:8000/todos'; // @todo should be splitted into apiServerUrl and apiRoute

    constructor(private http: HttpClient) {
    }


    /**
     * Fetch all todos from the server
     *
     * @param   searchterm - Search string to use for filtering
     * @return  Observable
     * @author  Markus Buscher
     */
    getAll(searchterm: string): Observable<Todo[]> {
        return this.http.get<Todo[]>(this.apiUrl + '?searchterm=' + searchterm)
            .pipe(
                tap(_ => this.log('fetched todos')),
                catchError(this.handleError('getAll', []))
            );
    }

    /**
     * Fetch a specific todo by its unique internal id from the server
     *
     * @param   id - The internal id of the record
     * @return  Observable
     * @author  Markus Buscher
     */
    getRecord(id: number): Observable<Todo> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<Todo>(url).pipe(
            tap(_ => this.log(`fetched todo id=${id}`)),
            catchError(this.handleError<Todo>(`getRecord id=${id}`))
        );
    }


    /**
     * Add a new todo to the server
     *
     * @param   todo - The record
     * @return  Observable
     * @author  Markus Buscher
     */
    addRecord(todo: Todo): Observable<Todo> {
        return this.http.post<Todo>(this.apiUrl, todo, httpOptions).pipe(
            tap((next: Todo) => this.log('new todo with id #' + next.id)),
            catchError(this.handleError<Todo>('addRecord'))
        );
    }


    /**
     * update an existing todo on the server
     *
     * @param   todo - The record
     * @return  Observable
     * @author  Markus Buscher
     */
    updateRecord(todo: Todo): Observable<any> {
        const id = todo.id;
        const url = `${this.apiUrl}/${id}`;

        return this.http.patch(url, todo, httpOptions).pipe(
            tap(_ => this.log(`updated todo id=${id}`)),
            catchError(this.handleError<any>(`updateRecord id=${id}`))
        );
    }


    /**
     * Delete a todo from the server
     *
     * @param   todo|number - The record or the id of the record
     * @return  Observable
     * @author  Markus Buscher
     */
    deleteRecord(todo: Todo | number): Observable<Todo> {
        const id = typeof todo === 'number' ? todo : todo.id;
        const url = `${this.apiUrl}/${id}`;

        return this.http.delete<Todo>(url, httpOptions).pipe(
            tap(_ => this.log(`deleted todo id=${id}`)),
            catchError(this.handleError<Todo>(`deleteRecord id=${id}`))
        );
    }


    /**
     * Handle Http operation that failed. Let the app continue.
     *
     * @param   operation - The operation
     * @param   result - The result
     * @return  Observable
     * @author  Markus Buscher
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            this.log(`${operation} failed: ${error.message}`);
            console.error(error);

            return of(result as T);
        };
    }


    /**
     * Write log messages to the browser console
     *
     * @param   message - The log message
     * @return  void
     * @author  Markus Buscher
     */
    private log(message: string) {
        console.log(message);
    }
}
