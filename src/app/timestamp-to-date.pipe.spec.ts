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
    return date.toLocaleDateString('en-US'); // Adjust the format as needed
  }
}
