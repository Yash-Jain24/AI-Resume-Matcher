# 🧠 AI Resume Matcher

An **AI-powered microservice application** that automates resume–job matching. The system intelligently parses resumes, extracts skills using **Natural Language Processing (NLP)**, and generates dynamic match scores for job descriptions — streamlining recruitment with accuracy and speed.

**🔴 Live Demo:** [Link to the Deployed App](https://ai-resume-matcher-plum.vercel.app/)

---

## ✨ Key Features

- **AI-Powered Skill Extraction:** Uses a dedicated **Python + Flask + spaCy** NLP microservice to identify core technical and soft skills from PDF resumes and job descriptions.
- **Dynamic Match Scoring:** Computes a **real-time percentage match** between a candidate’s resume and job description, with skill-gap analysis.  
- **Secure JWT Authentication:** Includes complete **user authentication and protected APIs** using JSON Web Tokens.  
- **Full-Stack Microservice Architecture:** Built with a **React frontend, Node.js backend, and Python NLP service**, deployed independently for scalability. 
- **Cloud-Native Deployment:** Frontend hosted on **Vercel**, backend and NLP services on **Render**, and database on **MongoDB Atlas**.  
- **Modern, Responsive UI:** Intuitive **dark-themed interface** built with React and Vite for smooth performance.  

---

## 🛠️ Tech Stack & Architecture

| Component | Technology |
|-------|-------------|
| **Frontend** | ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white) ![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white) |
| **Backend API** | ![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/-Express.js-000000?logo=express&logoColor=white) |
|**NLP Service**| ![Python](https://img.shields.io/badge/-Python-3776AB?logo=python&logoColor=white) ![Flask](https://img.shields.io/badge/-Flask-000000?logo=flask&logoColor=white) ![spaCy](https://img.shields.io/badge/-spaCy-09A3D5?logo=spacy&logoColor=white) |
| **Database** | ![MongoDB Atlas](https://img.shields.io/badge/-MongoDB-47A248?logo=mongodb&logoColor=white) |
| **Deployment** | ![Vercel](https://img.shields.io/badge/-Vercel-000000?logo=vercel&logoColor=white) ![Render](https://img.shields.io/badge/-Render-46E3B7?logo=render&logoColor=white) |

---

## ⚙️ System Overview
1. **React Frontend (Vercel):** Handles authentication, resume uploads, and displays skill match scores.

2. **Node.js Backend (Render):** Manages users, JWT-based sessions, and routes NLP requests.

3. **Python NLP Service (Render):** Uses **spaCy** to extract relevant skills and return structured data to the backend.

---

## 🖼️ Screenshots

#### Authentication 

![Login Page](./assets/images/01_login.png)

#### Resume Upload

![Resume Analysis Page](./assets/images/02_resume_analysis.png)

#### Job Matching

![Job Matching Page](./assets/images/03_job_matching.png)

---

## 🚀 Local Setup 

### 1️⃣ Clone Repository
```bash
git clone https://github.com/Yash-Jain24/AI-Resume-Matcher.git
cd AI-Resume-Matcher
```

### 2️⃣ Setup Python NLP Service
```bash
cd nlp-microservice
pip install -r requirements.txt
python app.py
# Runs on http://localhost:5002
```

### 3️⃣ Setup Backend API
```bash
cd ../backend
npm install
# Create a .env file
npm start
# Runs on http://localhost:5001
```
### 4️⃣ Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
# Runs on http://localhost:5173
```
---

### 🔑 Environment Variables

#### `/backend/.env`
```bash
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_token_string
SPACY_SERVICE_URL=http://localhost:5002
```
#### `/frontend/.env.local`
```bash
VITE_API_URL=http://localhost:5001/api
```

---

## 🌩️ Deployment

- **Frontend** → Deployed on **Vercel** directly from `/frontend`.
- **Backend & NLP Service** → Deployed as independent **Render web services**.
- **Database** → Hosted on **MongoDB Atlas** (Free Tier Cluster).

Each service follows its own CI/CD pipeline for seamless updates and scalability.

---

## 🤝 Contributing
Contributions and feature suggestions are welcome — open an issue or pull request.

## 📄 License
Licensed under the **MIT License**.

---

## 👨‍💻 Author
[Github](https://github.com/Yash-Jain24) | [LinkedIn](https://www.linkedin.com/in/yashjain24)