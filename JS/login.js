const loginButton = document.querySelector(".login-button")
const emailInput = document.querySelector("#email")
const passwordInput = document.querySelector("#password")
const alertError = document.querySelector(".alert-error")
const contentOfAlert = alertError.querySelector("span")
const alertSuccess = document.querySelector(".alert-success")

const adminLogin = async () => {
    const email = emailInput.value
    const password = passwordInput.value
    if (!email || !password) {
        contentOfAlert.textContent = "لطفا ایمیل و رمز عبور را وارد کنید"
        alertError.style.display = "block"
        setTimeout(() => alertError.style.display = "none", 3000)
        return
    }

    const response = await fetch("http://localhost:3000/api/admins/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password})
    })
    const res = await response.json()
    if(res.error){
        contentOfAlert.textContent = " ایمیل یا رمز عبور اشتباه است"
        alertError.style.display = "block"
        setTimeout(() => {
            alertError.style.display = "none"
        }, 3000)
    } 
    else {
        alertSuccess.style.display = "block"
        setTimeout(() => {
            alertSuccess.style.display = "none"
            location.assign("./admin.html")
            sessionStorage.setItem("admin_id", res.admin_id)
        }, 3000)
    }
}

loginButton.addEventListener("mousedown", () => loginButton.style.scale = "0.95")
loginButton.addEventListener("mouseup", () => loginButton.style.scale = "1")
loginButton.addEventListener("click", adminLogin)
