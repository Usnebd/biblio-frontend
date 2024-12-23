import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
import { BookDTO } from '../../model/book-dto';
import { SnackbarService } from '../../service/snackbar.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-addbook-page',
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  providers: [],
  templateUrl: './addbook-page.component.html',
  styleUrl: './addbook-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddbookPageComponent {
  snackbarService = inject(SnackbarService);
  bookService = inject(BookService);

  bookForm = new FormGroup({
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

  submitApplication() {
    if (this.bookForm.invalid) {
      return; // Non eseguire il submit se il form non è valido
    }
    const book = new BookDTO(
      this.bookForm.value.title ?? '',
      this.bookForm.value.author ?? '',
      this.bookForm.value.description ?? '',
      Number(this.bookForm.value.publishYear),
      Number(this.bookForm.value.price)
    );
    this.bookService.save(book).subscribe(() => {
      this.bookForm.reset();
      this.snackbarService.openSnackBar('Book Added ✅');
      Object.keys(this.bookForm.controls).forEach((key) => {
        const control = this.bookForm.get(key);
        control?.markAsPristine(); // Rende il controllo "pulito"
        control?.markAsUntouched(); // Rende il controllo "non toccato"
        control?.setErrors(null); // Rimuove gli errori
      });
    });
  }
}
