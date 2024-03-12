const html = document.querySelector('html')
const mainButtons = document.querySelectorAll('.app__card-button')
const banner = document.querySelector('.app__image')
const timerElement = document.querySelector('#timer')
const titleBanner = document.querySelector('.app__title')
const startPause = document.querySelector('.app__card-primary-button')

const focusTime = 1500
const shortRest = 300
const longRest = 900

for (let counter = 0; counter < mainButtons.length; counter++) {
    mainButtons[counter].addEventListener('click', () => {
        const template = mainButtons[counter].classList[2]
        html.setAttribute  ('data-contexto', template)
        banner.setAttribute('src', `/imagens/${template}.png`)

        switch (template) {
            case "foco":
                titleBanner.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
                break;
            case "descanso-curto":
                titleBanner.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`
                break;
            case "descanso-longo":
                titleBanner.innerHTML = `Hora de voltar a superfície<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`
        }
    })
}
