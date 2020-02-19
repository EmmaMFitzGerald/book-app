import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { BookService } from './book.service';
import { MessageService } from  '../message.service'

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  providers: [BookService]
})

export class BookComponent implements OnInit {
    selectedBook: Book;

    books: Book[];
  
    constructor(private bookService: BookService, private messageService: MessageService) { }
  
    ngOnInit() {
      this.getBooks();
    }

    onSelect(book: Book): void {
      this.selectedBook = book;
      this.messageService.add("BookService: Selected book titled: ${book.title}")
    }

    getBooks(): void {
      this.bookService.getBooks()
      .subscribe(books => this.books = books)
    };
}


