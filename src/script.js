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

// helper functions

// api functions

// initialization

setUpEventListeners()