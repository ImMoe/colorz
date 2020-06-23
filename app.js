/**
 * The javascript code for the color guess game
 * credits to: Mohamed Ali (imMoe)
 */

let colors
let correctColor

const generateButton = document.querySelector('.generate')
const colorsContainer = document.querySelector('.colors')
const boxColors = document.querySelectorAll('.color')
const headingColor = document.querySelector('h1')
const message = document.querySelector('.copied')
const instructions = document.querySelector('.instructions')

instructions.addEventListener('click', () => {
  const main = document.querySelector('.more')
  main.classList.toggle('hidden')
})

generateButton.addEventListener('click', showColors)
document.body.addEventListener('keypress', (e) => {
  // ignores the default scroll
  e.preventDefault()
  if (e.code == 'Space') {
    showColors()
  }
})
colorsContainer.addEventListener('click', validateAnswer)

showColors()

function validateAnswer(e) {
  const { target } = e
  // This returns false if user clicks on empty space rather than a color
  if (target.className == 'colors') return false
  if (target.id == correctColor) {
    target.parentElement.classList.add('animate__tada')
    setTimeout(
      () => target.parentElement.classList.remove('animate__tada'),
      1000
    )
    message.style.display = 'block'
    message.classList.remove('failure')
    message.classList.add('success')
    message.innerText = successMessage()
  } else {
    target.parentElement.classList.add('animate__wobble')
    setTimeout(
      () => target.parentElement.classList.remove('animate__wobble'),
      1000
    )
    message.style.display = 'block'
    message.classList.remove('success')
    message.classList.add('failure')
    message.innerText = failureMessage()
    message.classList.add('animate__shakeX')
    setTimeout(() => {
      message.classList.remove('animate__shakeX')
    }, 1000)
  }
}

function showColors() {
  colors = generateColors(4)
  /* Code below shows colored boxes based on the argument passed */
  let output = ''
  for (let i = 0; i < colors.length; i++) {
    output += `
      <div class="box animate__animated">
        <div class="color" style="background-color: ${colors[i]}" id="${colors[i]}"></div>
      </div>
    `
  }
  colorsContainer.innerHTML = output
  /* Randomly pick a color from the colors array and show it in the header */
  const randomIndex = Math.floor(Math.random() * colors.length)
  correctColor = colors[randomIndex]
  headingColor.innerHTML = 'Which color is this? <br />' + correctColor
}

function generateColors(count) {
  const generatedColors = []
  for (let i = 0; i < count; i++) {
    generatedColors.push(randomRgb())
  }
  return generatedColors
}

function randomRgb() {
  const red = Math.floor(Math.random() * 255 + 1)
  const green = Math.floor(Math.random() * 255 + 1)
  const blue = Math.floor(Math.random() * 255 + 1)
  return `rgb(${red}, ${green}, ${blue})`
}

function successMessage() {
  const messages = [
    'Well done! You guessed the right color 😀',
    "Wohoo! You're on fire today 🔥",
    'You got the eye of a tiger! 😎',
    "Nice one! You're all correct 👌🏽",
    'How did you know that? Are you a magician? 🧙‍♂️',
    'Are you Pablo Picasso or Leonardo Da Vinci 😮',
  ]
  const randomIndex = Math.floor(Math.random() * messages.length)
  return messages[randomIndex]
}

function failureMessage() {
  const messages = [
    'Oops! You did not guess the correct color 😅',
    'Ouch! Try again i know you got it! 💪',
    'Even i can do i better than you human 😂',
    'Nobody is expert with RGB colors. Practice makes perfect 🎨',
  ]
  const randomIndex = Math.floor(Math.random() * messages.length)
  return messages[randomIndex]
}
