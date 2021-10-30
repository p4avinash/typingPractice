const RANDOM_QUOTE_URL = 'https://api.quotable.io/random?minLength=100&maxLength=140'
const quoteDisplay = document.querySelector('.quote-display')
const inputBox = document.querySelector('.quote-input')
const timer = document.querySelector('.timer')
let isTypingSuccess = true

inputBox.addEventListener('input', () => {
    let quoteArray = quoteDisplay.querySelectorAll('span')
    let valueArray = inputBox.value.split('')

    quoteArray.forEach((character, index) => {
        let inputCharacter = valueArray[index]

        if(inputCharacter == null){
            character.classList.remove('correct')
            character.classList.remove('incorrect')
            isTypingSuccess = false
        } else if(inputCharacter === character.innerText){
            character.classList.add('correct')
            character.classList.remove('incorrect')
            if(quoteArray.length === valueArray.length){
                isTypingSuccess = true
            }
        } else{
            character.classList.remove('correct')
            character.classList.add('incorrect')
            isTypingSuccess = false
        }
    }) 

    if(isTypingSuccess){
        displayNewQuote()
    }
})

const getRandomQuote = () => {
    return fetch(RANDOM_QUOTE_URL).then(response => response.json()).then(quote => quote.content)
}


const displayNewQuote = async() => {
    let quote = await getRandomQuote()
    quoteDisplay.innerText = ''
    inputBox.value = null
    quote.split('').forEach(character => {
        let characterSpan = document.createElement('span')
        characterSpan.innerText = character
        quoteDisplay.appendChild(characterSpan)
        startTimer()
    })
}


let startTime = 0
const startTimer = () => {
    timer.innerText = 0
    startTime = new Date()
    setInterval(() => {
        timer.innerText = getTimerTime()
    }, 1000);
}

const getTimerTime = () => {
    return Math.floor((new Date() - startTime)/1000)
}

displayNewQuote()
