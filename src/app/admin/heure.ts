export class Heure {
    constructor(public heure: number, public minute: number, public seconde: number) {}
  
    toString(): string {
      return `${this.heure.toString().padStart(2, '0')}:${this.minute.toString().padStart(2, '0')}:${this.seconde.toString().padStart(2, '0')}`;
    }
  }
  