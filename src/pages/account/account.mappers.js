export const mapAccountFromApiToVm = account => {
    return {
        ...account,
        alias: account.name,
    };
};

export const mapAccountFromVmToApi = account =>{
    return {
        ...account,
        name: account.alias,
    };
};