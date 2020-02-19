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
  books;
  currentlyReading;
  bookTitle;

  book: Book = {
    id: 1,
    title: "Harry Potter",
    author: "JK Rowling",
    read: false
  };

  selectedBook: Book;

  onSelect(book: Book): void {
    this.selectedBook = book;
  }

  constructor(private bookService: BookService) { }

  getBooks(){
    return this.bookService.get().then(books => {
      this.books = books;
      this.currentlyReading = this.books.filter(book => !book.read).length;
    });
  }

  addBook(){
    this.bookService.add({ title: this.bookTitle, read: false }).then(() => {
      return this.getBooks();
    }).then(() => {
      this.bookTitle = ''; // clear input form value
    });
  }

  ngOnInit() {
    this.getBooks();
  }

}
