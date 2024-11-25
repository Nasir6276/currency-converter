const key = 'fca_live_BpiKXwqZsrPGzhAPOHSQuxhIHi8O43VHxTd0Nmet'

const state = {
    openDrawer: null,
    currencies: []
}

// selectors
const ui = {
    controls: document.getElementById('controls'),
    drawer: document.getElementById('drawer'),
    dismissBtn: document.getElementById('dismiss-btn'),
    currencyList: document.getElementById('currency-list')
}

// event listeners

const setUpEventListeners = () => {
    document.addEventListener('DOMContentLoaded', initApp)
    ui.controls.addEventListener('click', showDrawer);
    ui.dismissBtn.addEventListener('click', hideDrawer)
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
    state.openDrawer = null;
    ui.drawer.classList.remove('show')
}

// render functions

const displayCurrencies = () => {
    ui.currencyList.innerHTML = state.currencies.map(({code, name}) => {
        return `
            <li data-code=${code}>
                <img src="https://placeholder.co/48" alt="${name}">
                <div>
                    <h4>${code}</h4>
                    <P>${name}</P>
                </div>
            </li>
        `
    }).join('')
}

// helper functions

// api functions

const fetchCurrencies = () => {
    fetch(`https://api.freecurrencyapi.com/v1/currencies?apikey=${key}`)
        .then(response => response.json())
        .then(({data}) => {
            state.currencies = Object.json;
            displayCurrencies()
        })
        .catch(console.error)
}

// initialization

setUpEventListeners()