import { Component, OnInit } from '@angular/core';
import { ChangeDetectionStrategy, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BookService } from '../../service/book.service';
import { SnackbarService } from '../../service/snackbar.service';
import { Book } from '../../model/book';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-editbook-page',
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './editbook-page.component.html',
  styleUrl: './editbook-page.component.css',
})
export class EditbookPageComponent implements OnInit {
  snackbarService = inject(SnackbarService);
  bookService = inject(BookService);
  router = inject(Router);

  book: Book = history.state.book;
  editBookForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(50)]), // Campo obbligatorio
    author: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(200),
    ]),
    price: new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.max(1000),
    ]),
    publishYear: new FormControl('', [Validators.required, Validators.min(0)]),
  });
  ngOnInit(): void {
    this.book = history.state.book;
    this.editBookForm.patchValue({
      title: this.book?.title,
      author: this.book?.author,
      publishYear: String(this.book?.publishYear),
      price: String(this.book?.price),
      description: this.book?.description,
    });
  }
  submitEditApplication() {
    if (this.editBookForm.invalid) {
      return; // Non eseguire il submit se il form non è valido
    }
    this.book.author = this.editBookForm.value.author ?? '';
    this.book.title = this.editBookForm.value.title ?? '';
    this.book.description = this.editBookForm.value.description ?? '';
    this.book.publishYear = Number(this.editBookForm.value.publishYear);
    this.book.price = Number(this.editBookForm.value.price);

    this.bookService.update(this.book).subscribe((response) => {
      const statusCode = response.status; // Leggi il codice di stato
      if (statusCode === 204) {
        // Caso di No Content (204) - Aggiornamento riuscito
        this.snackbarService.openSnackBar('Book updated successfully ✅');
      } else if (statusCode === 404) {
        // Caso di Not Found (404) - Il libro non esiste
        this.snackbarService.openSnackBar('Book not found ❌');
      } else if (statusCode === 409) {
        // Caso di Conflict (409) - Conflitto (ad esempio, titolo duplicato)
        this.snackbarService.openSnackBar(
          'Conflict: Book title already exists ❌'
        );
      } else {
        // Altri codici di stato
        this.snackbarService.openSnackBar('An unexpected error occurred ❌');
      }
    });
  }
}
