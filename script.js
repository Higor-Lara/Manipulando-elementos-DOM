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
music.loop = true

const playMusic = new Audio('/sons/play.wav')
const pauseMusic = new Audio('/sons/pause.mp3')
const stopMusic = new Audio('/sons/beep.mp3')

let timeInSecond = [1500, 300, 900]
let verifyItem = 0

let intervalId = null

for (let counter = 0; counter < mainButtons.length; counter++) {
    mainButtons[counter].addEventListener('click', () => {
         const template = mainButtons[counter].classList[2]
         console.log(mainButtons[counter].classList)
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
                fromatTime(timeInSecond[0])
                break;
            case "descanso-curto":
                titleBanner.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`
                verifyItem = 1
                fromatTime(timeInSecond[1])
                break;
            case "descanso-longo":
                titleBanner.innerHTML = `Hora de voltar a superfície<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`
                verifyItem = 2
                fromatTime(timeInSecond[2])
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
        timeInSecond[0] = 1500
        fromatTime(timeInSecond[0])
    } else if (verifyItem == 1) {
        timeInSecond[1] = 300
        fromatTime(timeInSecond[1])
    }
    else if (verifyItem == 2) {
        timeInSecond[2] = 900
        fromatTime(timeInSecond[2])
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
        if(timeInSecond[0] <= 0) {
            zerar()
            stopMusic.play()
            timeInSecond[0] = 1500
            return
        }
        timeInSecond[0] -= 1
        fromatTime(timeInSecond[0])
    } else if (verifyItem == 1) {
        if(timeInSecond[1] <= 0) {
            zerar()
            stopMusic.play()
            timeInSecond[1] = 300
            return
        }
        timeInSecond[1] -= 1
        fromatTime(timeInSecond[1])
    }
    else if (verifyItem == 2) {
        if(timeInSecond[2] <= 0) {
            zerar()
            stopMusic.play()
            timeInSecond[2] = 900
            return
        }
        timeInSecond[2] -= 1
        fromatTime(timeInSecond[2])
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
fromatTime(timeInSecond[0])