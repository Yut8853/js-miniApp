const img = document.querySelectorAll('.imageContainer img')
const mainImg = document.querySelector('#mainImage')
const next = document.querySelector('.next')
const prev = document.querySelector('.prev')
let i = 0

img[1].addEventListener('click', () => {
    i = 1
    mainImg.src = img[1].src
    img[0].classList.remove('active')
    img[1].classList.add('active')
    img[2].classList.remove('active')

})
img[0].addEventListener('click', () => {
    i = 0
    mainImg.src = img[0].src
    img[1].classList.remove('active')
    img[0].classList.add('active')
    img[2].classList.remove('active')

})
img[2].addEventListener('click', () => {
    i = 2
    mainImg.src = img[2].src
    img[0].classList.remove('active')
    img[2].classList.add('active')
    img[1].classList.remove('active')

})

next.addEventListener('click', () => {
    i++
    if(i > 2) {
        i = 0
    }
    mainImg.src = img[i].src
    img[0].classList.remove('active')
    img[1].classList.remove('active')
    img[2].classList.remove('active')
    img[i].classList.add('active')
})

prev.addEventListener('click', () => {
    i--
    if(i < 0) {
        i = 2
    }
    mainImg.src = img[i].src
    img[0].classList.remove('active')
    img[1].classList.remove('active')
    img[2].classList.remove('active')
    img[i].classList.add('active')
})