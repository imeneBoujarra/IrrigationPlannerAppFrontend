export class Tache {
  prf: number;
  prh: number | undefined;
  constructor(
    public id?: string,
    public name?: string,
    public ph?: number,
    public pf?: number,
  ) {}
}
