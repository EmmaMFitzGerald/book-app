import { Component, OnInit } from '@angular/core';
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

  constructor(private bookService: BookService) { }

  getBooks(){
    return this.bookService.get().then(books => {
      this.books = books;
      this.currentlyReading = this.books.filter(book => !book.read).length;
    });
  }

  ngOnInit() {
    this.getBooks();
  }

}
