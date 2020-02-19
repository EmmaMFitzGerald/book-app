import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Observable, of } from 'rxjs';

import { MessageService } from '../message.service';
import { Book } from '../book';

@Injectable({
  providedIn: 'root'
})

export class BookService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
    ) { }

    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.booksUrl)
    .pipe(
      tap(_ => this.log('fetched books')),
      catchError(this.handleError<Book[]>('getBooks', []))
    );
  }

  getBook(id: number): Observable<Book> {
    const url = `${this.booksUrl}/${id}`;
    return this.http.get<Book>(url).pipe(
      tap(_ => this.log(`fetched book id=${id}`)),
      catchError(this.handleError<Book>(`getBook id=${id}`))
    );
  }

  updateBook (book: Book): Observable<any> {
    return this.http.put(this.booksUrl, book, this.httpOptions).pipe(
      tap(_ => this.log(`updated book id = ${book.id}`)),
      catchError(this.handleError<any>('updateError'))
    );
  }

  addBook (book: Book): Observable<Book>{
    return this.http.post<Book>(this.booksUrl, book, this.httpOptions).pipe(
      tap((newBook: Book) => this.log(`added new book: id = ${newBook.id}`)),
      catchError(this.handleError<any>('addBook'))
    );
  }

  deleteBook(book: Book | number): Observable<Book>{
    const id = typeof book === 'number' ? book : book.id;
    const url = `${this.booksUrl}/${id}`;

    return this.http.delete<Book>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted book with id: ${id}`)),
      catchError(this.handleError<Book>('deleteBook'))
    )
  }

  searchBooks(term: string): Observable<Book[]> {
    if(!term.trim()) {
      return of([])
    }

    return this.http.get<Book[]>(`${this.booksUrl}/?title=${term}`).pipe(
      tap(x =>  x.length ?
        this.log(`found books matching "${term}"`) :
        this.log(`no books matching "${term}"`)),
        catchError(this.handleError<Book[]>('searchBook', []))
        )
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`BookService: ${message}`);
  }

  private booksUrl = 'api/books';

}
