const key = 'fca_live_BpiKXwqZsrPGzhAPOHSQuxhIHi8O43VHxTd0Nmet'

const state = {
    openDrawer: null,
    currencies: [],
    filteredCurrencies: []
}

// selectors
const ui = {
    controls: document.getElementById('controls'),
    drawer: document.getElementById('drawer'),
    dismissBtn: document.getElementById('dismiss-btn'),
    currencyList: document.getElementById('currency-list'),
    searchInput: document.getElementById('search')
}

// event listeners

const setUpEventListeners = () => {
    document.addEventListener('DOMContentLoaded', initApp);
    ui.controls.addEventListener('click', showDrawer);
    ui.dismissBtn.addEventListener('click', hideDrawer);
    ui.searchInput.addEventListener('input', filterCurrency)
}

// event handlers

const initApp = () => {
    fetchCurrencies()
}

const showDrawer = (e) => {
    if (e.target.hasAttribute('data-drawer')) {
        state.openDrawer = e.target.id;
        ui.drawer.classList.add('show')
    }
}

const hideDrawer = () => {
    clearSearchInput()
    state.openDrawer = null;
    ui.drawer.classList.remove('show')
}

const filterCurrency = () => {
    const keyword = ui.searchInput.value.trim().toLowerCase();
    
    state.filteredCurrencies = state.currencies.filter(({ code, name }) => {
        return (
            code.toLowerCase().includes(keyword) ||
            name.toLowerCase().includes(keyword)
        );
    });

    displayCurrencies()
}

// render functions

const displayCurrencies = () => {
    ui.currencyList.innerHTML = state.filteredCurrencies.map(({code, name}) => {
        return `
            <li data-code=${code}>
                <img src="${getImgUrl(code)}" alt="${name}">
                <div>
                    <h4>${code}</h4>
                    <P>${name}</P>
                </div>
            </li>
        `
    }).join('')
}

// helper functions

const clearSearchInput = () => {
    ui.searchInput.value = '';
    ui.searchInput.dispatchEvent(new Event('input'))
}

const getImgUrl = (code) => {
    const flag = 'https://wise.com/public-resources/assets/flags/rectangle/{code}.png'

    return flag.replace('{code}', code.toLowerCase())
}

// api functions

const fetchCurrencies = () => {
    fetch(`https://api.freecurrencyapi.com/v1/currencies?apikey=${key}`)
        .then((response) => response.json())
        .then(({data}) => {
            state.currencies = Object.values(data);
            state.filteredCurrencies = state.currencies;
            displayCurrencies()
        })
        .catch(console.error)
}

// initialization

setUpEventListeners()