import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Book } from './book'

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb(){

    const books = [
    {id: 1, title: "Golden in Death", author: "J.D. Robb", read: true},
    {id: 2, title: "Crooked River", author: "Lincoln Child", read: true},
    {id: 3, title: "American Dirt", author: "J Cummins", read: false},
    {id: 4, title: "Where the Crawdads Sing", author: "Delia Owens", read: false}
    ];
    return {books};
  }

  genId(books: Book[]): number {
    return books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 1;
  }
}
