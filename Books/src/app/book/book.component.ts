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

    books: any[];
  
    constructor(private bookService: BookService) { }
  
    ngOnInit() {
      this.getBooks();
    }

    getBooks(): void {
      this.bookService.getBooks()
      .subscribe(books => this.books = books)
    };

    add(title: string): void {
      title = title.trim();
      if (!title) { return; }
      this.bookService.addBook({ title } as Book)
        .subscribe(book => {
          this.books.push(book);
        });
    }

    delete(book: Book): void {
      this.books = this.books.filter(b => b !== book);
      this.bookService.deleteBook(book).subscribe();
    }
}


