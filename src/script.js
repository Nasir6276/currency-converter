const key = 'fca_live_BpiKXwqZsrPGzhAPOHSQuxhIHi8O43VHxTd0Nmet'

const state = {
    openedDrawer: null,
    currencies: [],
    filteredCurrencies: [],
    base: 'USD',
    target: 'EUR',
}

// selectors
const ui = {
    controls: document.getElementById('controls'),
    drawer: document.getElementById('drawer'),
    dismissBtn: document.getElementById('dismiss-btn'),
    currencyList: document.getElementById('currency-list'),
    searchInput: document.getElementById('search'),
    baseBtn: document.getElementById('base'),
    targetBtn: document.getElementById('target')
}

// event listeners

const setUpEventListeners = () => {
    document.addEventListener('DOMContentLoaded', initApp);
    ui.controls.addEventListener('click', showDrawer);
    ui.dismissBtn.addEventListener('click', hideDrawer);
    ui.searchInput.addEventListener('input', filterCurrency);
    ui.currencyList.addEventListener('click', selectPair)
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
    
    state.filteredCurrencies = getAvailableCurrencies().filter(({ code, name }) => {
        return (
            code.toLowerCase().includes(keyword) ||
            name.toLowerCase().includes(keyword)
        );
    });

    displayCurrencies()
}

const selectPair = (e) => {
    if (e.target.hasAttribute('data-code')) {
        const { openedDrawer } = state;

        // update the base or target in the state 
        state[openedDrawer] = e.target.dataset.code;

        // update the btn
        [ui.baseBtn, ui.targetBtn].forEach((btn) => {
            const code = state[btn.id];

            btn.textContent = code;
        })

        // close drawer after selection 
        hideDrawer()
    }
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

const getAvailableCurrencies = () => {
    return state.currencies.filter(({code}) => {
        return state.base !== code && state.target !== code;
    })
}

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
            state.filteredCurrencies = getAvailableCurrencies();
            displayCurrencies()
        })
        .catch(console.error)
}

// initialization

setUpEventListeners()