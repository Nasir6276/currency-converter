// selectors
const ui = {
    controls: document.getElementById('controls'),
    drawer: document.getElementById('drawer'),
    dismissBtn: document.getElementById('dismiss-btn'),
}

// event listeners

const setUpEventListeners = () => {
    ui.controls.addEventListener('click', showDrawer);
    ui.dismissBtn.addEventListener('click', hideDrawer)
}

// event handlers

const showDrawer = (e) => {
    ui.drawer.classList.add('show')
}

const hideDrawer = (e) => {
    ui.drawer.classList.remove('show')
}

// render functions

// helper functions

// api functions

// initialization

setUpEventListeners()