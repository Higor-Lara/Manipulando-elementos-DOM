const html = document.querySelector('html')
const mainButtons = document.querySelectorAll('.app__card-button')

for (let counter = 0; counter < mainButtons.length; counter++) {
    mainButtons[counter].addEventListener('click', () => {
        const template = mainButtons[counter].classList[2]
        console.log(template)
        html.setAttribute  ('data-contexto', template)
    }) 
}