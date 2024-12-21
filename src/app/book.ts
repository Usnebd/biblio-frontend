export class Book {
  id: number;
  title: string;
  author: string;
  description: string;
  publishDate: string;
  price: number;

  constructor(
    id: number,
    title: string,
    author: string,
    description: string,
    publishDate: string,
    price: number
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.description = description;
    this.publishDate = publishDate;
    this.price = price;
  }
}
