import { Heure } from "../heure";

export class Journaliere {
  constructor(
    public id?: string,
    public sector?: string,
    public da?: Date,
    public hod?: Heure,
    public hof?:Heure,
    public va? :Boolean,
   
    public farmarUid?: string,

  ) { }
}
