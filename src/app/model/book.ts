export class Book {
  id: string;
  title: string;
  author: string;
  description: string;
  publishYear: number;
  price: number;

  constructor(
    id: string,
    title: string,
    author: string,
    description: string,
    publishYear: number,
    price: number
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.description = description;
    this.publishYear = publishYear;
    this.price = price;
  }
}
