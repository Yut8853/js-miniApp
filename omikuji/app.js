const btn = document.querySelector(".btn")
const result = document.querySelector('p')
const omikuji = ['大吉', '中吉', '小吉', '凶', '大凶']

btn.addEventListener('click', () => {
    const n = Math.floor(Math.random() * omikuji.length)
    result.textContent = omikuji[n]
})