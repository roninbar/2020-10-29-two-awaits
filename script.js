const ALLCOUNTRIESURL = 'https://restcountries.eu/rest/v2/all';

async function fetchAllCountries1Async() {
    const response = await fetch(ALLCOUNTRIESURL);
    const { status, statusText } = response;
    if (200 <= status && status < 300) {
        return await response.json();
    }
    else {
        throw new Error(`${status} ${statusText}`);
    }
}

function fetchAllCountries2Async() {
    return fetch(ALLCOUNTRIESURL).then(function (response) {
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

    function createLi(text) {
        const li = document.createElement('li');
        li.innerText = text;
        return li;
    }

    function populateList(countries) {
        ul.innerHTML = '';
        ul.append(...countries.map(({ name }) => createLi(name)));
    }

    document.getElementById('async').addEventListener('click', async function () {
        try {
            const countries = await fetchAllCountries1Async();
            populateList(countries);
        } catch (error) {
            alert(error);
        }
    });

    document.getElementById('then').addEventListener('click', function () {
        fetchAllCountries2Async().then(function (countries) {
            populateList(countries);
        }).catch(function (error) {
            alert(error);
        });
    });

    document.getElementById('clear').addEventListener('click', function () {
        ul.innerHTML = '';
    });
});

