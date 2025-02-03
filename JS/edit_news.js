let titleInput = document.getElementById("title")
let textarea = document.querySelector("textarea")
let imageUrlInput = document.getElementById("image-url")
let radioButtons = document.querySelectorAll('input[type="radio"]')
const submitButton = document.querySelector("#submit-button")
const cancelButton = document.querySelector("#cancel-button")
const alertSuccess = document.querySelector(".alert-success")
const alertError = document.querySelector(".alert-error")
const contentOfAlert = alertError.querySelector("span")

const created_by = +sessionStorage.getItem("admin_id")
const BASE_URL = "http://localhost:3000/api/"

const getNewsById = async () => {
    const news_id = +sessionStorage.getItem("news_id")
    try {
        const response = await fetch(BASE_URL + "news/" + news_id)
        const news = await response.json()
        const { title, content, photo_url, category_name } = news

        titleInput.value = title
        textarea.value = content
        imageUrlInput.value = photo_url

        radioButtons.forEach(radio => {
            if (radio.value === category_name)
                radio.checked = true
        })
    } catch (error) {
        console.error("Failed to fetch news:", error)
        contentOfAlert.textContent = "خطا در دریافت خبر"
        alertError.style.display = "block"
        setTimeout(() => alertError.style.display = "none", 3000)
    }
}
getNewsById()

const submitNews = async () => {
    let category_name
    radioButtons.forEach(radio => {
        if (radio.checked)
            category_name = radio.value
    })
    const title = titleInput.value
    const content = textarea.value
    const photo_url = imageUrlInput.value
    if (!title || !content || !photo_url || !category_name) {
        contentOfAlert.textContent = "لطفا تمامی موارد را پر کنید"
        alertError.style.display = "block"
        setTimeout(() => alertError.style.display = "none", 3000)
        return
    }

    const news_id = +sessionStorage.getItem("news_id")
    const response = await fetch(BASE_URL + "news/" + news_id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, photo_url, category_name, created_by }),
    })

    const data = await response.json()
    if (data.error) {
        contentOfAlert.textContent = "خطا در ارسال خبر"
        alertError.style.display = "block"
        setTimeout(() => alertError.style.display = "none", 3000)
    } else {
        alertSuccess.style.display = "block"
        setTimeout(() => {
            alertSuccess.style.display = "none"
            location.assign("admin.html")
        }, 3000)
    }
}

submitButton.addEventListener("click", submitNews)
cancelButton.addEventListener("click", () => location.assign("./admin.html"))
