const html = document.querySelector('html')
const mainButtons = document.querySelectorAll('.app__card-button')
const banner = document.querySelector('.app__image')
const timerElement = document.querySelector('#timer')
const titleBanner = document.querySelector('.app__title')
const musicInput = document.querySelector('#alternar-musica')
const startPauseBt = document.querySelector('#start-pause')
const childStartPauseBt = startPauseBt.childNodes
const timer = document.querySelector('#timer')
const resetTime = document.querySelector('#reset-time')


const music = new Audio('/sons/luna-rise-part-one.mp3')
music.loop = true;

const playMusic = new Audio('/sons/play.wav')
const pauseMusic = new Audio('/sons/pause.mp3')
const stopMusic = new Audio('/sons/beep.mp3')

let focoTime = 1500
let shortRestTime = 300
let longRestTime = 900
let verifyItem = 0

let intervalId = null




for (let counter = 0; counter < mainButtons.length; counter++) {
    mainButtons[counter].addEventListener('click', () => {
         const template = mainButtons[counter].classList[2]
        html.setAttribute('data-contexto', template)
        banner.setAttribute('src', `/imagens/${template}.png`)
        mainButtons.forEach((button) => {
            button.classList.remove('active')
        })
        mainButtons[counter].classList.add('active')
        
        zerar()     
        childStartPauseBt[3].textContent = "Começar"
        childStartPauseBt[1].setAttribute('src', "/imagens/play_arrow.png")
        pauseMusic.play()

        switch (template) {
            case "foco":
                titleBanner.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
                verifyItem = 0
                fromatTime(focoTime)
                break;
            case "descanso-curto":
                titleBanner.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`
                verifyItem = 1
                fromatTime(shortRestTime)
                break;
            case "descanso-longo":
                titleBanner.innerHTML = `Hora de voltar a superfície<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`
                verifyItem = 2
                fromatTime(longRestTime)
                break
        }
    })
}
musicInput.addEventListener('change', () => {
    if(music.paused) {
        music.play()
        music.volume = 0.3
    } else {
        music.pause()
        music.currentTime = 0
    }
})

startPauseBt.addEventListener('click', startAndPause)

resetTime.addEventListener('click', () => {
    if(verifyItem == 0) {     
        focoTime = 1500
        fromatTime(focoTime)
    } else if (verifyItem == 1) {
        shortRestTime = 300
        fromatTime(shortRestTime)
    }
    else if (verifyItem == 2) {
        longRestTime = 900
        fromatTime(longRestTime)
    }
    zerar()     
    childStartPauseBt[3].textContent = "Começar"
    childStartPauseBt[1].setAttribute('src', "/imagens/play_arrow.png")
})

function zerar() {
    if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
    }
}
const countDown = () => {
    if(verifyItem == 0) {     
        if(focoTime <= 0) {
            zerar()
            stopMusic.play()
            focoTime = 1500
            return
        }
        focoTime -= 1
        fromatTime(focoTime)
    } else if (verifyItem == 1) {
        if(shortRestTime <= 0) {
            zerar()
            stopMusic.play()
            shortRestTime = 300
            return
        }
        shortRestTime -= 1
        fromatTime(shortRestTime)
    }
    else if (verifyItem == 2) {
        if(longRestTime <= 0) {
            zerar()
            stopMusic.play()
            longRestTime = 900
            return
        }
        longRestTime -= 1
        fromatTime(longRestTime)
    }
}
function startAndPause() {
    if(intervalId) {
        zerar()     
        childStartPauseBt[3].textContent = "Começar"
        childStartPauseBt[1].setAttribute('src', "/imagens/play_arrow.png")
        pauseMusic.play()
        return
    }
    intervalId = setInterval(countDown, 1000)
    childStartPauseBt[3].textContent = "Pausar"
    childStartPauseBt[1].setAttribute('src', "/imagens/pause.png")
    playMusic.play()
    
}

function fromatTime(timePerItem) {
    const time = new Date(timePerItem * 1000)
    const formatedTime = time.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    timer.textContent = `${formatedTime}`
}
fromatTime(focoTime)