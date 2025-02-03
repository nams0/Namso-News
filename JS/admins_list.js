const adminsTable = document.querySelector(".news-table")
const tbody = adminsTable.querySelector('tbody')
const tableBox = document.getElementById('table-box')
tableBox.style.display = "block"

const getAdmins = async () => {
    const response = await fetch("http://localhost:3000/api/admins")
    const res = await response.json()
    displayAdmins(res)
}
getAdmins()

const displayAdmins = admins => {
    tbody.innerHTML = ""
    admins.forEach(admin => {
        const date = admin.created_at.split("T")[0]
        const time = admin.created_at.split("T")[1].split(".")[0]
        tbody.innerHTML += `
        <tr>
        <td>${admin.admin_id}</td>
        <td>${admin.admin_name}</td>
        <td>${admin.email}</td>
        <td>${date + " " + time}</td>
        </tr>`
    })
}
