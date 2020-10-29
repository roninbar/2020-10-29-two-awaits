async function fetchAllCountriesAsync() {
    const response = await fetch('https://restcountries.eu/rest/v2/all');
    const { status, statusText } = response;
    if (200 <= status && status < 300) {
        return await response.json();
    }
    else {
        throw new Error(`${status} ${statusText}`);
    }
}

window.addEventListener('load', async function () {
    const countries = await fetchAllCountriesAsync();
    const lis = countries.map(function ({ name }) {
        const li = document.createElement('li');
        li.innerText = name;
        return li;
    });
    document.querySelector('ul').append(...lis);
});

