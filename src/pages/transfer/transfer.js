import {
    onUpdateField, onSetError, onSetFormErrors, onSubmitForm,
    removeElementClass, setErrorMessage, setElementClass
} from "../../common/helpers";
import { history, routes } from "../../core/router";
import { getAccountList } from "../account-list/account-list.api";
import { insertTransfer } from "./transfer.api";
import { setAccountOptions } from "./transfer.helpers";
import { formValidation } from "./transfer.validation";
import moment from 'moment';

const params = history.getParams();
getAccountList().then(accountsList => {
    setAccountOptions(accountsList, params.id);
});

let valueDate = {};

let transfer = {
    sourceId: '',
    iban: '',
    name: '',
    amount: '',
    concept: '',
    notes: '',
    date: new Date(),
    exeDate: '',
    email: '',
};
console.log(transfer);

const selectedAccount = document.getElementById("select-account");
window.onload = () => {
    transfer = {
        ...transfer,
        sourceId: selectedAccount.value,
    };
    console.log(transfer)
};

selectedAccount.addEventListener("change", function () {
    const value = this.options[selectedAccount.selectedIndex].value;
    transfer = {
        ...transfer,
        sourceId: value,
    }
    console.log(transfer);
});

onUpdateField('iban', event => {
    const value = event.target.value;
    transfer = {
        ...transfer,
        iban: value,
    }
    formValidation.validateField('iban', transfer.iban).then(result => {
        onSetError('iban', result);
    })
});

onUpdateField('name', event => {
    const value = event.target.value;
    transfer = {
        ...transfer,
        name: value,
    }
    formValidation.validateField('name', transfer.name).then(result => {
        onSetError('name', result);
    })
});

onUpdateField('amount', event => {
    const value = event.target.value;
    transfer = {
        ...transfer,
        amount: Number(value),
    }
    formValidation.validateField('amount', transfer.amount).then(result => {
        onSetError('amount', result);
    })
});

onUpdateField('concept', event => {
    const value = event.target.value;
    transfer = {
        ...transfer,
        concept: value,
    }
});

onUpdateField('notes', event => {
    const value = event.target.value;
    transfer = {
        ...transfer,
        notes: value,
    }
});

onUpdateField('day', event => {
    const value = event.target.value;
    valueDate = {
        ...valueDate,
        day: value
    };
});

onUpdateField('month', event => {
    const value = event.target.value;
    valueDate = {
        ...valueDate,
        month: value
    };
});

onUpdateField('year', event => {
    const value = event.target.value;
    valueDate = {
        ...valueDate,
        year: value
    };
});

onUpdateField('email', event => {
    const value = event.target.value;
    transfer = {
        ...transfer,
        email: value,
    }
    formValidation.validateField('email', transfer.email).then(result => {
        onSetError('email', result);
    })
});

const onSave = () => {
    insertTransfer(transfer);
};

onSubmitForm('transfer-button', () => {
    {
        transfer = {
            ...transfer,
            exeDate:
                // new Date(valueDate.year, valueDate.month, valueDate.day)
                `${valueDate.year}-${valueDate.month}-${valueDate.day}`
        };

        //moment -> para ver si es una fecha válida
        let moment = require('moment')
        let res = moment(transfer.exeDate).isValid();
        console.log(res)
        if (res === true) {
            removeElementClass('date');
        } else {
            setElementClass('date');
            const messageElement = document.getElementById(`date-error`);
            if (messageElement) {
                messageElement.textContent = 'Fecha no válida';
            }
        }
    }

    formValidation.validateForm(transfer).then(result => {
        onSetFormErrors(result);
        if (result.succeeded) {
            onSave();
            history.push(routes.accountList);
        } else {
            alert('Por favor revise los campos obligaortorios');
        }
    })
});