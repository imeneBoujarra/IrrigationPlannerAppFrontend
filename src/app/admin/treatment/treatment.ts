export class Treatment {
  constructor(
    public id?: string,
    public products?: string[],
    public start?: Date,
    public end?: Date,
    public qte?:number,
   public te?:string,
   public se?:string,
    
  ) {}
}
