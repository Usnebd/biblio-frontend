import { Component, inject, signal } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { BookService } from '../../service/book.service';
import { Book } from '../../model/book';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Clipboard } from '@angular/cdk/clipboard'; // Importa Clipboard
import { SnackbarService } from '../../service/snackbar.service';
import { RouterModule } from '@angular/router'; // <-- Aggiungi questa importazione

@Component({
  selector: 'app-home',
  imports: [
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  books = signal<Book[]>([]); // Inizializza con un array vuoto
  snackbarService = inject(SnackbarService);
  clipboard = inject(Clipboard);
  bookService = inject(BookService);
  ngOnInit() {
    this.bookService.findAll().subscribe((data) => {
      if (data) {
        this.books.set(data.reverse());
      }
    });
  }
  deleteBook(book: Book) {
    this.bookService.delete(book.id).subscribe(() => {
      this.books.update((data) => data.filter((b) => b.id !== book.id));
      this.snackbarService.openSnackBar('Deleted Book ✅');
    });
  }
  updateBook(book: Book) {
    this.bookService.update(book).subscribe((updatedBook) => {
      this.books.update((array) =>
        array.map((b) => (b.id === updatedBook.id ? updatedBook : b))
      );
      this.snackbarService.openSnackBar('Book Updated ✅');
    });
  }

  copyToClipboard(title: string) {
    this.clipboard.copy(title); // Copia il nome negli appunti
    this.snackbarService.openSnackBar('Copied to Clipboard 📋');
  }
}
