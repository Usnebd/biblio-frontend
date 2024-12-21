import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { BookService } from '../../service/book.service';
import { Book } from '../../model/book';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  imports: [MatGridListModule, MatCardModule, HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  books: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.findAll().subscribe((data) => {
      this.books = data;
    });
  }
}
