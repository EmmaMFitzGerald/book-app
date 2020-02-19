import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { BookService } from './book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  providers: [BookService]
})

export class BookComponent implements OnInit {
    selectedBook: Book;

    books: Book[];
  
    constructor(private bookService: BookService) { }
  
    ngOnInit() {
      this.getBooks();
    }

    getBooks(): void {
      this.bookService.getBooks()
      .subscribe(books => this.books = books)
    };
}


