import { Heure } from "../heure";

export class Planification {
  constructor(
    public id?: string,
    public sector?: string,
    public start?: Date,
    public end?: Date,
    public hod?: Heure,
    public hof?: Heure,

  ) { }

}
