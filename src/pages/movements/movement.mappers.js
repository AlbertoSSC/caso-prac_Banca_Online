export const mapMovListFromApiToVm = movementList => {
    return movementList.map(movement => mapMovFromApiToVm(movement))
};


const mapMovFromApiToVm = movement => {
    return {
        ...movement,
        amount: `${movement.amount} €`,
        balance: `${movement.balance} €`,
        transaction: new Date(movement.transaction).toLocaleDateString(),
        realTransaction: new Date(movement.realTransaction).toLocaleDateString(),
    };
};