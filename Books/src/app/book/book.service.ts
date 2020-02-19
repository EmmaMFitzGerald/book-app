import { Injectable } from '@angular/core';

const BOOKS = [
   {title: "Golden in Death", author: "J.D. Robb", read: true},
   {title: "Crooked River", author: "Lincoln Child", read: true},
   {title: "American Dirt", author: "J Cummins", read: false},
   {title: "Where the Crawdads Sing", author: "Delia Owens", read: false}
]

@Injectable({
  providedIn: 'root'
})

export class BookService {

  constructor() { }

  get() {
    return new Promise(resolve => resolve(BOOKS));
  }

  add(data) {
    return new Promise(resolve => {
      BOOKS.push(data);
      resolve(data);
    });
  }
}
