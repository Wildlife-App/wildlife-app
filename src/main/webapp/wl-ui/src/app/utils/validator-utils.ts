import {AbstractControl, FormGroup} from '@angular/forms';

export const INVALID_CHAR_LIST: string[] = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '=', '<', '>', '?', '/', '"', '\'', '_', '|', '{', '}', '[', ']', '+', '`'];
export const VALID_MIDDLE_CHAR_LIST: string[] = ['(', ')']
export const NAME_MIN_LENGTH: number = 3;
export const NAME_MAX_LENGTH: number = 50;
export const MIN_DATE: Date = new Date(2015, 0, 1);
export const MAX_DATE: Date = new Date();

export class ValidatorUtils {

  static validateForm(group: FormGroup, validationMessages: any, formErrors: any): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      formErrors[key] = '';
      if (abstractControl && !abstractControl.valid
        && (abstractControl.touched || abstractControl.dirty)) {
        const messages = validationMessages[key];
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }
      if (abstractControl instanceof FormGroup) {
        ValidatorUtils.validateForm(abstractControl, validationMessages, formErrors);
      }
    });
  }

  static NameValidator(control: AbstractControl): { [key: string]: any } {
    const name: string = control.value;
    const returnIfInvalid = {'invalidName': true};

    if (!name || name.length < NAME_MIN_LENGTH) {
      return null;
    }
    const firstChar: string = name.charAt(0);
    if (!isNaN(+firstChar)) {
      return returnIfInvalid;
    }

    if (VALID_MIDDLE_CHAR_LIST.indexOf(firstChar) > -1) {
      return returnIfInvalid;
    }

    if (INVALID_CHAR_LIST.indexOf(firstChar) > -1) {
      return returnIfInvalid;
    }

    for(let char of INVALID_CHAR_LIST) {
      if (name.indexOf(char) > -1) {
        return returnIfInvalid;
      }
    }
    return null;
  }

  static isSubmittableForm(tourForm: FormGroup): boolean {
    if (!tourForm.touched || tourForm.pristine) {
      console.log('Invalid form!! Not touched or pristine');
      return false;
    }
    if (tourForm.dirty && !tourForm.valid) {
      console.log('Invalid form!! Not Valid');
      return false;
    }
    return true;
  }
}
