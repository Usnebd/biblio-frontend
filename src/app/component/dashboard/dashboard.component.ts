import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { BookService } from '../../service/book.service';
import { Book } from '../../model/book';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  imports: [MatGridListModule, MatCardModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  books: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.findAll().subscribe((data) => {
      this.books = data;
      this.books.reverse();
    });
  }
}
