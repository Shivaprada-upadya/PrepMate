<div align="center">
  <h1><b>🎯 Placement Prep Tracker</b></h1>
  <p>A responsive full-stack web app to track your IT/software placement preparation journey.</p>
</div>

---

## 🚀 Tech Stack

- **Frontend**: React.js  
- **Backend**: Spring Boot (Java)  
- **Database**: MySQL  
- **Styling**: CSS  
- **Notifications**: React Toastify  
- **API**: RESTful  

---

## ✨ Features

- ✅ Add, edit, delete, and mark tasks as complete
- 🔍 Filter and sort tasks
- 🌗 Dark mode toggle
- 🔔 Toast notifications for user feedback
- 📱 Responsive design for both mobile and desktop
- 🗂️ MySQL-based persistent storage

---

## 📸 Screenshots

### 🏠 Homepage

![Homepage Screenshot](https://github.com/Shivaprada-upadya/PrepMate/blob/main/screennshots/homepage.png)

### 🌙 Dark Mode

![Dark Mode Screenshot](https://github.com/Shivaprada-upadya/PrepMate/blob/main/screennshots/dark-mode.png)

---

## ⚙️ How to Run Locally

### 📁 Prerequisites

- Node.js and npm
- Java (JDK 17 or above)
- Spring Boot
- MySQL
- Git

---

### 🧹 Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

### 🛠️ Backend Setup

```bash
cd backend
# Ensure MySQL is running and database is created
# Update `application.properties` with your DB credentials
mvn spring-boot:run
```

---

## 🧪 Database Configuration

1. Create a MySQL database named `placement_tracker` (or update the name in `application.properties`)
2. Example DB config in `application.properties`:

```
spring.datasource.url=jdbc:mysql://localhost:3306/placement_tracker
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

---

## 🌐 Live Demo (Optional)

> Add your deployed link here if available  
[🔗 Live Website](https://your-deployed-link.com)

---

## 🧑‍💻 Author

- GitHub: [@shivaprada-upadya](https://github.com/shivaprada-upadya)

---

## 📜 License

This project is licensed under the **MIT License**.

&copy; 2025 [Shivaprada](https://github.com/shivaprada-upadya)

Permission is hereby granted, free of charge, to any person obtaining a copy  
of this software and associated documentation files (the "Software"), to deal  
in the Software without restriction, including without limitation the rights  
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell  
copies of the Software, and to permit persons to whom the Software is  
furnished to do so, subject to the following conditions:

> Full license details can be found in the [LICENSE](./LICENSE) file.
