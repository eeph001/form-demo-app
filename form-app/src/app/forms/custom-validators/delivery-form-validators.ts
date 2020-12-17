import { AbstractControl, ValidatorFn } from "@angular/forms";

export function numberLength(min: number, max: number): ValidatorFn {
    return (formControl: AbstractControl): { [key: string]: boolean} | null => {
        if(formControl.value !== null && (isNaN(formControl.value) || formControl.value < min || formControl.value > max)){
            return {'LengthOfNumberNotCorrect': true}
        }
        return null
    }
}