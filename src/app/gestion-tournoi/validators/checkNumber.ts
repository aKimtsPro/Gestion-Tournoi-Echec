import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";

export function checkNumber(minControlName : string, maxControlName:string) : ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const minControl = formGroup.get(minControlName);
    const maxControl = formGroup.get(maxControlName);

    if (minControl && maxControl) {
      const minValue = minControl.value;
      const maxValue = maxControl.value;

      if (minValue !== null && maxValue !== null && minValue > maxValue) {
        maxControl.setErrors({ invalidNumber: true });
        return { invalidNumber: true };
      } else {
        maxControl.setErrors(null);
      }
    }

    return null;
  };
}
