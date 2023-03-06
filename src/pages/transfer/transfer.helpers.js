const getOption = account => {
  const option = document.createElement('option');
  option.value = account.id;
  option.textContent = account.name;
  return option;
};

export const setAccountOptions = (accounts, selectedId) => {
  const select = document.getElementById('select-account');

  accounts.forEach(account => {
    const option = getOption(account);
    select.appendChild(option);
  });

  if (selectedId) {
    select.value = selectedId;
  } else {
    select.value = 0; // añadido para que 'select' quede en blanco si no hay 'id'.
  }

  return select;
};
