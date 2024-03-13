const html = document.querySelector('html')
const mainButtons = document.querySelectorAll('.app__card-button')
const banner = document.querySelector('.app__image')
const timerElement = document.querySelector('#timer')
const titleBanner = document.querySelector('.app__title')
const musicInput = document.querySelector('#alternar-musica')
const startPauseBt = document.querySelector('#start-pause')

const music = new Audio('/sons/luna-rise-part-one.mp3')
music.loop = true;

let timeInSecond = 5
let intervalId = null

for (let counter = 0; counter < mainButtons.length; counter++) {
    mainButtons[counter].addEventListener('click', () => {
        const template = mainButtons[counter].classList[2]
        html.setAttribute  ('data-contexto', template)
        banner.setAttribute('src', `/imagens/${template}.png`)
        mainButtons.forEach((button) => {
            console.log(button)
            button.classList.remove('active')
        })
        mainButtons[counter].classList.add('active')

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

musicInput.addEventListener('change', () => {
    if(music.paused) {
        music.play()
    } else {
        music.pause()
        music.currentTime = 0
    }
})

const countDown = () => {
    if(timeInSecond <= 0) {
        zerar()
        alert('Tempo finalizado')
        return
    }
    timeInSecond -= 1
    console.log('Temporizador: ' + timeInSecond)
}

startPauseBt.addEventListener('click', startAndPause)

function startAndPause () {
    if(intervalId) {
        zerar()
        return
    }
    intervalId = setInterval(countDown, 1000)
}
function zerar() {
    if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
    }
}