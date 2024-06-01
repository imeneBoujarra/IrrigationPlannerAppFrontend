import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from 'firebase/firestore';

@Pipe({
  name: 'timestampToDate'
})
export class TimestampToDatePipe implements PipeTransform {
  transform(timestamp: Timestamp | null): string {
    if (!timestamp) {
      return '';
    }
    const date = new Date(timestamp.seconds * 1000);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
