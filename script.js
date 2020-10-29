function fetchAllCountries() {
    return fetch('https://restcountries.eu/rest/v2/all').then(function (response) {
        const { status, statusText } = response;
        if (200 <= status && status < 300) {
            return response.json();
        }
        else {
            throw new Error(`${status} ${statusText}`);
        }
    });
}

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

window.addEventListener('load', function () {

    const ul = document.querySelector('ul');

    function populateList(countries) {
        ul.innerHTML = '';
        const lis = countries.map(function ({ name }) {
            const li = document.createElement('li');
            li.innerText = name;
            return li;
        });
        ul.append(...lis);
    }

    document.getElementById('async').addEventListener('click', async function () {
        populateList(await fetchAllCountriesAsync());
    });

    document.getElementById('then').addEventListener('click', function () {
        fetchAllCountries().then(function (countries) {
            populateList(countries);
        });
    });

    document.getElementById('clear').addEventListener('click', function() {
        ul.innerHTML = '';
    });
});

