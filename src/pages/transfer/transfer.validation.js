import { Validators, createFormValidation } from "@lemoncode/fonk";
import { iban } from '@lemoncode/fonk-iban-validator';
import { isNumber } from '@lemoncode/fonk-is-number-validator';
import { laterDate } from '@lemoncode/fonk-later-date-validator';


const validationSchema = {
    field: {
        // 'select-account': [Validators.required],
        iban: [Validators.required, iban.validator],
        name: [Validators.required],
        email: [Validators.email],
        amount: [Validators.required, isNumber.validator],
        exeDate: [{
            validator: laterDate.validator,
            customArgs: {
                date: new Date(),
                parseStringToDateFn: value => new Date(value),
                inclusive: false,
            },
            message: 'Revise que la fecha sea posterior al día de hoy'
        }
        ],

    }
};

export const formValidation = createFormValidation(validationSchema);