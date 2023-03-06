import { history } from '../../core/router'
import { getMovementList } from './movement-list.api';
import { mapMovListFromApiToVm } from './movement.mappers';
import { addMovementRows } from './movements.helpers';
import { onSetValues } from '../../common/helpers/element.helpers'
import { getAccount } from '../account/account.api';
import { mapAccountFromApiToVm } from '../account/account.mappers'

const params = history.getParams(); //params.id
// const movId = Number(params.id);
console.log(params.id)

getMovementList(params.id).then(movementList => {
    const viewModelMovList = mapMovListFromApiToVm(movementList);
    addMovementRows(viewModelMovList);
});

getAccount(params.id).then(result => {
    const viewModelMovList2 = mapAccountListFromApiToVm(result);
    onSetValues(viewModelMovList2);
});

getAccount(params.id).then(apiAccount => {
    const vmAccount = mapAccountFromApiToVm(apiAccount);
    onSetValues(vmAccount);
});