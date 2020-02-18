import { Component, OnInit } from '@angular/core';
import { BookService } from './book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  providers: [BookService]
})

export class BookComponent implements OnInit {
  private books;
  private activeTasks;

  constructor(private bookService: BookService) { }

  getBooks(){
    return this.bookService.get().then(books => {
      this.books = books;
      this.activeTasks = this.books.filter(book => !book.read).length;
    })
  }

  ngOnInit(): void {
  }

}
