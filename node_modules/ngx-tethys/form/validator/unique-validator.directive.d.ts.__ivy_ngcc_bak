import { AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ThyFormDirective } from '../form.directive';
export declare class ThyUniqueCheckValidator implements AsyncValidator {
    private elementRef;
    private thyForm;
    thyUniqueCheck: (value: any) => Observable<boolean>;
    constructor(elementRef: ElementRef, thyForm: ThyFormDirective);
    validate(ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null>;
}
