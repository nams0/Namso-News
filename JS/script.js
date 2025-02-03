const checkbox = document.querySelectorAll('.checkbox')
const refreshButton = document.getElementById('refresh-button')
const refreshButtonBack  = document.querySelector('.ref-button-back')
const adminLoginButton = document.getElementById('admin-login-button')
const inbox = document.querySelector('.inbox')
const tableBox = document.querySelector('#table-box')
const tbody = document.querySelector('tbody')
const telegramSvg = document.getElementById('telegram')
const year = document.getElementById('year')

const date = new Date()
year.innerText = date.getFullYear()

const BASE_URL = "http://localhost:3000/api/"
categories = {technology: "تکنولوژی", sports: "ورزشی", economy: "اقتصادی", art: "هنری"}


const displayNews = news => {
    if (!news.length) {
        inbox.style.display = "flex"
        tableBox.style.display = "none"
    }
    else {
        inbox.style.display = "none"
        tableBox.style.display = "block"
        tbody.innerHTML = ""
        news.forEach(news => {
            const date = news.published_at.split("T")[0]
            const time = news.published_at.split("T")[1].split(".")[0]
            tbody.innerHTML += `
            <tr>
            <td>${news.title}</td>
            <td>${news.content}</td>
            <td>
            <img src="${news.photo_url}" alt="عکس خبر" class="news-photo">
            </td>
            <td>${categories[news.category_name]}</td>
            <td>${news.admin_name}</td>
            <td>${date + " " + time}</td>
            </tr>`
        })        
    }
}

const fetchNews = async url => {
    const response = await fetch(url)
    const news = await response.json()
    displayNews(news)
}

const refreshNews = () => {
    category = []
    checkbox.forEach(box => {
        if (box.checked)
            category.push(box.id)
    })

    if (category.length === 0)
        fetchNews(BASE_URL + "news")
    else
    fetchNews(BASE_URL + "news?category=" + category)
}

immediateNewsFetch = () => fetchNews(BASE_URL + "news")
immediateNewsFetch()

refreshButton.addEventListener("mouseenter", () => refreshButton.className = "animate__animated animate__rotateIn ")
refreshButton.addEventListener("mouseleave", () => refreshButton.className = "")
refreshButtonBack.addEventListener("mousedown", () => refreshButtonBack.style.scale = "0.9")
refreshButtonBack.addEventListener("mouseup", () => refreshButtonBack.style.scale = "1")
refreshButtonBack.addEventListener("click", refreshNews)

adminLoginButton.addEventListener("mousedown", () => {
    adminLoginButton.style.scale = "0.9"
    location.assign("./login.html")
})
adminLoginButton.addEventListener("mouseup", () => adminLoginButton.style.scale = "1")

telegramSvg.addEventListener("mousedown", () => telegramSvg.style.scale = "0.9")
telegramSvg.addEventListener("mouseup", () => telegramSvg.style.scale = "1")