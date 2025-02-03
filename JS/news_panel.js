const titleInput = document.getElementById("title")
const textarea = document.querySelector("textarea")
const imageUrlInput = document.getElementById("image-url")
const radioButtons = document.querySelectorAll('input[type="radio"]')
const submitButton = document.querySelector("#submit-button")
const cancelButton = document.querySelector("#cancel-button")
const alertSuccess = document.querySelector(".alert-success")
const alertError = document.querySelector(".alert-error")
const contentOfAlert = alertError.querySelector("span")

const created_by = +sessionStorage.getItem("admin_id")
const BASE_URL = "http://localhost:3000/api/"

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

    const response = await fetch(BASE_URL + "news", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({title, content, photo_url, category_name, created_by})
    })
    const data = await response.json()
    if (data.error) {
        contentOfAlert.textContent = "خطا در ارسال خبر"
        alertError.style.display = "block"
        setTimeout(() => alertError.style.display = "none", 3000)
    }
    else {
        alertSuccess.style.display = "block"
        setTimeout(() => {
            alertSuccess.style.display = "none"
            location.assign("./admin.html")
        }, 3000)
        
    }
}

submitButton.addEventListener("click", submitNews)
cancelButton.addEventListener("click", () => location.assign("./admin.html"))
