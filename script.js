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
            populateList(await fetchAllCountriesAsync());
        } catch (error) {
            alert(error);
        }
    });

    document.getElementById('then').addEventListener('click', function () {
        fetch('https://restcountries.eu/rest/v2/all').then(function (response) {
            const { status, statusText } = response;
            if (200 <= status && status < 300) {
                return response.json();
            }
            else {
                throw new Error(`${status} ${statusText}`);
            }
        }).then(function (countries) {
            populateList(countries);
        }).catch(function (error) {
            alert(error);
        });
    });

    document.getElementById('clear').addEventListener('click', function () {
        ul.innerHTML = '';
    });
});

