import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../model/book';
import { Observable } from 'rxjs';
import { BookDTO } from '../model/book-dto';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private bookUrl: string;

  constructor(private http: HttpClient) {
    this.bookUrl = 'http://localhost:8080/books';
  }
  public findAll(): Observable<Book[]> {
    return this.http.get<Book[]>(this.bookUrl);
  }
  public save(bookDTO: BookDTO) {
    return this.http.post<Book>(this.bookUrl, bookDTO);
  }
  public delete(id: string) {
    return this.http.delete<Book>(`${this.bookUrl}/${id}`);
  }
  public update(book: Book) {
    return this.http.put<Book>(`${this.bookUrl}/${book.id}`, book);
  }
}
