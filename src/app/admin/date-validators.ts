import { AbstractControl, ValidatorFn } from '@angular/forms';

export function dateLessThan(startDate: string, endDate: string): ValidatorFn {
  return (formGroup: AbstractControl): { [key: string]: any } | null => {
    const start = formGroup.get(startDate)?.value;
    const end = formGroup.get(endDate)?.value;
    return start && end && start > end ? { 'dateInvalid': true } : null;
  };
}

export function timeLessThan(startTime: string, endTime: string): ValidatorFn {
  return (formGroup: AbstractControl): { [key: string]: any } | null => {
    const start = formGroup.get(startTime)?.value;
    const end = formGroup.get(endTime)?.value;
    return start && end && start > end ? { 'timeInvalid': true } : null;
  };
}
