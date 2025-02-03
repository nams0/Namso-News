const checkbox = document.querySelectorAll('.checkbox')
const refreshButton = document.getElementById('refresh-button')
const refreshButtonBack  = document.querySelector('.ref-button-back')
const inbox = document.querySelector('.inbox')
const tableBox = document.querySelector('#table-box')
const tbody = document.querySelector('tbody')
const alertSuccess = document.querySelector('.alert-success')
const alertError = document.querySelector('.alert-error')

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
            tbody.innerHTML += `
            <tr>
            <td>${news.title}</td>
            <td>${news.content}</td>
            <td>
            <img src="${news.photo_url}" alt="عکس خبر" class="news-photo">
            </td>
            <td>${categories[news.category_name]}</td>
            <td>${news.admin_name}</td>
            
            <td>
                <button onclick="editHandler('${news.news_id}')">
                    <img src="./images/edit.svg"></img>
                    ویرایش
                </button>
                <button onclick="deleteHandler('${news.news_id}')">
                    <img src="./images/trash.svg"></img>
                    حذف
                </button>
            </td>
            </tr>`
        })        
    }
}

const fetchNews = async url => {
    const response = await fetch(url)
    const news = await response.json()
    // console.log(news)
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

const deleteHandler = async news_id => {
    const response = await fetch(BASE_URL + "news/" + news_id,{method: "DELETE"})
    const res = await response.json()
    if(res.error) {
        alertError.style.display = "block"
        setTimeout(() => alertError.style.display = "none", 3000)
    }
    else{
        refreshNews()
        alertSuccess.style.display = "block"
        setTimeout(() => alertSuccess.style.display = "none", 3000)
    }
}

const editHandler = news_id => {
    location.assign("./edit_news.html")
    sessionStorage.setItem("news_id", news_id)
}

refreshButton.addEventListener("mouseenter", () => refreshButton.className = "animate__animated animate__rotateIn ")
refreshButton.addEventListener("mouseleave", () => refreshButton.className = "")
refreshButtonBack.addEventListener("mousedown", () => refreshButtonBack.style.scale = "0.9")
refreshButtonBack.addEventListener("mouseup", () => refreshButtonBack.style.scale = "1")
refreshButtonBack.addEventListener("click", refreshNews)
