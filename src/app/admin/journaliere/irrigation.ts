import { Timestamp } from "firebase/firestore";
import { Heure } from "../heure";

export class Irrigation {
  constructor(
    public id?: string,
    public sector?: string,
    public date?: Date,
    public hod?: Timestamp,
    public hof?: Timestamp,
    public state?: boolean,
    public farmerId?: string,
    public planificationId?: string
  ) {}

}
