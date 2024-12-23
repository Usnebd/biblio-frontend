export class BookDTO {
  constructor(
    public title: string,
    public author: string,
    public description: string,
    public publishYear: number,
    public price: number
  ) {}
}
