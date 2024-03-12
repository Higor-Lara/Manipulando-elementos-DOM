const html = document.querySelector('html')
const mainButtons = document.querySelectorAll('.app__card-button')
const timerElement = document.querySelector('#timer')
const banner = document.querySelector('.app__image')
const titleBanner = document.querySelector('.app__title')
const startPause = document.querySelector('.app__card-primary-button')

const focusTime = 1500
const shortRest = 300
const longRest = 900

for (let counter = 0; counter < mainButtons.length; counter++) {
    mainButtons[counter].addEventListener('click', () => {
        const template = mainButtons[counter].classList[2]
        console.log(template)
        html.setAttribute  ('data-contexto', template)
    }) 
}
