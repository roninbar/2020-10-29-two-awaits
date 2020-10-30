function fetchAllCountriesAsync() {
    return fetch('https://restcountries.eu/rest/v2/all', { mode: 'cors' });
}

async function fetchAllCountries1Async() {
    const response = await fetchAllCountriesAsync();
    const { status, statusText } = response;
    if (200 <= status && status < 300) {
        return await response.json();
    }
    else {
        throw new Error(`${status} ${statusText}`);
    }
}

function fetchAllCountries2Async() {
    return fetchAllCountriesAsync()
        .then(function (response) {
            const { status, statusText } = response;
            if (200 <= status && status < 300) {
                return response.json();
            }
            else {
                throw new Error(`${status} ${statusText}`);
            }
        });
}

window.addEventListener('load', function () {

    const ul = document.querySelector('ul');

    function countryToLi({ name }) {
        const li = document.createElement('li');
        li.innerText = name;
        return li;
    }

    function populateList(countries) {
        ul.innerHTML = '';
        ul.append(...countries.map(countryToLi));
    }

    document.getElementById('await').addEventListener('click', async function () {
        try {
            const countries = await fetchAllCountries1Async();
            populateList(countries);
        } catch (error) {
            alert(error);
        }
    });

    document.getElementById('then').addEventListener('click', function () {
        fetchAllCountries2Async()
            .then(function (countries) {
                populateList(countries);
            })
            .catch(function (error) {
                alert(error);
            });
    });

    document.getElementById('clear').addEventListener('click', function () {
        ul.innerHTML = '';
    });
});

