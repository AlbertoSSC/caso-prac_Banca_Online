export const mapAccountListFromApiToVm = accountList => {
    return accountList.map(account => mapAccountFromApiToVm(account))
};

const mapAccountFromApiToVm = account => {
    return {
        id: account.id,
        iban: account.iban,
        name: account.name,
        balance: `${account.balance} €`,
        lastTransaction: new Date(account.lastTransaction).toLocaleDateString(),
    }
};