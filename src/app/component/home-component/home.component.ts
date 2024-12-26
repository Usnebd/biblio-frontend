import { Component, HostListener, inject, signal } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { BookService } from '../../service/book.service';
import { Book } from '../../model/book';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Clipboard } from '@angular/cdk/clipboard'; // Importa Clipboard
import { SnackbarService } from '../../service/snackbar.service';
import { RouterModule } from '@angular/router'; // <-- Aggiungi questa importazione
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-home',
  imports: [
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatTooltipModule,
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
    this.calculateGridColumns();
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

  copyToClipboard(title: string) {
    this.clipboard.copy(title); // Copia il nome negli appunti
    this.snackbarService.openSnackBar('Copied to Clipboard 📋');
  }
  cols: number = 5; // Default number of columns

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.calculateGridColumns(); // Update columns on window resize
  }

  calculateGridColumns(): void {
    const width = window.innerWidth;
    if (width > 1200) {
      this.cols = 4;
    } else if (width > 900) {
      this.cols = 3;
    } else if (width > 600) {
      this.cols = 2;
    } else {
      this.cols = 1;
    }
  }
}
