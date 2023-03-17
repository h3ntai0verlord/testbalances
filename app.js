const urlParams = new URLSearchParams(window.location.search);
const apiKey = urlParams.get('api_key');
const apiSecret = urlParams.get('secret');

fetch('https://api.3commas.io/public/api/v1/accounts', {
  headers: {
    'APIKEY': apiKey,
    'SECRET': apiSecret,
  }
})
.then(response => {
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
})
.then(accounts => {
  const balances = accounts.map(account => {
    return `<li>${account.currency}: ${account.available}</li>`;
  }).join('');

  document.querySelector('#balances').innerHTML = balances;
})
.catch(error => {
  console.error('Error fetching balances:', error);
});
