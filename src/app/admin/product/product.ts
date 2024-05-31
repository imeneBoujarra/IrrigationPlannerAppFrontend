export class Product {
  public id?: string;
  public name?: string;
  public useMethod?: string;
  public four?: string;
  public desc?: string;
  public qty?: number;
  public consumedQty: number;  // Retirer le point d'interrogation car une valeur par défaut est fournie
  public start?: Date;
  public end?: Date;
  public nfo?: string;

  constructor(
    id?: string,
    name?: string,
    useMethod?: string,
    four?: string,
    desc?: string,
    qty?: number,
    consumedQty: number = 0, // Fournir une valeur par défaut ici
    start?: Date,
    end?: Date,
    nfo?: string
  ) {
    this.id = id;
    this.name = name;
    this.useMethod = useMethod;
    this.four = four;
    this.desc = desc;
    this.qty = qty;
    this.consumedQty = consumedQty;  // Utiliser la valeur par défaut si rien n'est passé au constructeur
    this.start = start;
    this.end = end;
    this.nfo = nfo;
  }

  get remainingQty(): number {
    // Calculer la quantité restante
    return (this.qty || 0) - this.consumedQty;
  }
  static fromFirestore(doc: any): Product {
    return new Product(
      doc.id,
      doc.name,
      doc.useMethod,
      doc.four,
      doc.desc,
      doc.qty,
      doc.consumedQty,
      doc.start,
      doc.end,
      doc.nfo
    );
  }
}
