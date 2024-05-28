document.addEventListener('DOMContentLoaded', () => {
    fetchIndicators();
});

function fetchIndicators() {
    const apiURL = 'https://mindicador.cl/api';

    fetch(apiURL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const dolarValue = data.dolar.valor;
            const euroValue = data.euro.valor;
            const ufValue = data.uf.valor;
            const utmValue = data.utm.valor;

            document.getElementById('dolar').textContent = dolarValue;
            document.getElementById('euro').textContent = euroValue;
            document.getElementById('UF').textContent = ufValue;
            document.getElementById('UTM').textContent = utmValue;
        })
        .catch(error => console.error('There was a problem with the fetch operation:', error));
}