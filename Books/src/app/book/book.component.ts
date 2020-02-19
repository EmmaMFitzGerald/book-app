import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { BOOKS } from '../mock-books';
import { BookService } from './book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  providers: [BookService]
})

export class BookComponent implements OnInit {
    books = BOOKS;
    selectedBook: Book;
  
    constructor() { }
  
    ngOnInit() {
    }

    onSelect(book: Book): void {
      this.selectedBook = book;
    }
}


