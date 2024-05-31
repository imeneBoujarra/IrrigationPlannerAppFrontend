export class ProductAgr {
  public id?: string;
  public products?: string[];
  public qty: number; // Assurez-vous que c'est 'number' et non 'Number'

  constructor(id?: string, products?: string[], qty: number = 0) {
    this.id = id;
    this.products = products;
    this.qty = qty;
  }
}
