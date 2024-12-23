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
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]), // Campo obbligatorio
    author: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    price: new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.max(100),
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

    this.bookService.update(this.book).subscribe(() => {
      this.router.navigate(['/home']);
      this.snackbarService.openSnackBar('Book Added ✅');
      Object.keys(this.editBookForm.controls).forEach((key) => {
        const control = this.editBookForm.get(key);
        control?.markAsPristine(); // Rende il controllo "pulito"
        control?.markAsUntouched(); // Rende il controllo "non toccato"
        control?.setErrors(null); // Rimuove gli errori
      });
    });
  }
}
