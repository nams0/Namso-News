# Namso-News

---

# **📰 News API - Node.js Backend**  

A simple **Node.js** backend & pure **Javascript** frontend for a news website that allows **admins** to manage news articles and users to fetch news based on categories.

## **🚀 Features**
- 🔐 **Admin Login** No Registration, Manual Admin Insertion (will be added soon)
- 📰 **CRUD Operations for News** (Add, Edit, Delete, View)
- 📂 **Fetch News by Category** (Supports multiple categories)
- 👥 **Admin Management** (List all admins)
- 🔧 **Built with Pure Node.js** (No frameworks like Express)

---

## **📦 Installation & Setup**
### **1️⃣ Clone the repository**
```sh
git clone https://github.com/your-username/news-api.git
cd news-api
```
### **2️⃣ Install MySQL and Create Database**
- Make sure **MySQL is installed** on your system.
- Create a database called **news_db**:
```sql
CREATE DATABASE news_db;
USE news_db;
```
- Run the following queries to create **admins** and **news** tables:

```sql
CREATE TABLE admins (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    admin_name VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE news (
    news_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    photo_url VARCHAR(255),
    category_name VARCHAR(100) NOT NULL,
    created_by INT NOT NULL,
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES admins(admin_id)
);
```

### **3️⃣ Add an Admin Manually**
```sql
INSERT INTO admins (admin_name, email, password) VALUES
('John Doe', 'john@example.com', '123456');
```

### **4️⃣ Configure Database Connection**
Edit **`db.js`** and update the database credentials:
```js
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your_password',
    database: 'news_db'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

module.exports = db;
```

### **5️⃣ Start the Server**
```sh
node server.js
```
Server will start at **`http://localhost:3000`** 🎉

---

## **📌 API Endpoints**
### **🔹 1. Admin Login**
**Endpoint:** `POST /api/admins/login`  
**Request:**
```json
{
  "email": "john@example.com",
  "password": "123456"
}
```
**Response:**
```json
{
  "admin": {
    "admin_id": 1,
    "admin_name": "John Doe",
    "email": "john@example.com",
    "created_at": "2024-03-27T10:00:00.000Z"
  }
}
```

---

### **🔹 2. Add News**
**Endpoint:** `POST /api/news`  
**Request:**
```json
{
  "title": "New Technology Innovations",
  "content": "Tech world is evolving...",
  "photo_url": "https://example.com/news.jpg",
  "category_name": "Technology",
  "created_by": 1
}
```
**Response:**
```json
{
  "message": "News added successfully"
}
```

---

### **🔹 3. Fetch All News**
**Endpoint:** `GET /api/news`  
**Response:**
```json
[
  {
    "news_id": 1,
    "title": "New Technology Innovations",
    "content": "Tech world is evolving...",
    "photo_url": "https://example.com/news.jpg",
    "category_name": "Technology",
    "published_at": "2024-03-27T10:30:00.000Z"
  }
]
```

---

### **🔹 4. Fetch News by Category**
**Endpoint:** `GET /api/news?category=Technology,Sports`  
**Response:**
```json
[
  {
    "news_id": 2,
    "title": "Latest Sports Update",
    "content": "Exciting match highlights...",
    "category_name": "Sports"
  }
]
```

---

### **🔹 5. Fetch News by ID**
**Endpoint:** `GET /api/news/:news_id`  
**Example:** `GET /api/news/1`  
**Response:**
```json
{
  "news_id": 1,
  "title": "New Technology Innovations",
  "content": "Tech world is evolving...",
  "category_name": "Technology",
  "published_at": "2024-03-27T10:30:00.000Z"
}
```

---

### **🔹 6. Edit News**
**Endpoint:** `PUT /api/news/:news_id`  
**Request:**
```json
{
  "title": "Updated News Title",
  "content": "Updated content...",
  "photo_url": "https://example.com/new-image.jpg",
  "category_name": "Science"
}
```
**Response:**
```json
{
  "message": "News updated successfully"
}
```

---

### **🔹 7. Delete News**
**Endpoint:** `DELETE /api/news/:news_id`  
**Example:** `DELETE /api/news/1`  
**Response:**
```json
{
  "message": "News deleted successfully"
}
```

---

### **🔹 8. Fetch All Admins**
**Endpoint:** `GET /api/admins`  
**Response:**
```json
[
  {
    "admin_id": 1,
    "admin_name": "John Doe",
    "email": "john@example.com",
    "created_at": "2024-03-27T10:00:00.000Z"
  }
]
```

---

## **📜 License**
This project is open-source and available under the **MIT License**.

---
