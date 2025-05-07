# PDF Processing Web App (Node.js + Express)

This web application allows users to upload PDF files, parse them using LlamaIndex APIs, and interact with an AI-powered Q&A interface.

## 🚀 Features

- Upload and store PDF files
- Optional integration with LlamaIndex for PDF parsing and vector indexing
- API to ask questions and get answers (mocked)
- Modular Node.js project structure for scalability

---

## 🛠️ Tech Stack

# Backend Stack

- Node.js
- Express.js
- Multer (for file upload)
- Axios (for HTTP requests)
- LlamaIndex Cloud API (For PDF parsing)
- OpenAI API (for chatbot)

# Frontend Stack

- Angular
- PrimeNg

---

## ⚙️ Setup Instructions

### 1. Install dependencies

```bash
npm install
```

### 2. Create a `.env` file

Create a `.env` file in the root directory and add the following:

```env
LLAMA_CLOUD_API_KEY=llx-fcCO23dmPmMs4hV10yWahy4Wy7ACx58jVsUqLiSiuJmqxp50
OPENAI_API_KEY=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
```

> Note: You can also set these values in `environments/env.config.js` if you're not using `.env`.

### 3. Start Project

```bash
nvm use 16
npm start
```

The server will start on `http://localhost:8000`.

---

## 📤 Uploading a PDF

Make a `POST` request to:

```
POST http://localhost:8000/upload
```

With `FormData` containing a key `uploadedPdf` and the PDF file.

---

## ❓ Ask Questions

Make a `POST` request to:

```
POST http://localhost:8000/ask
```

With a JSON body:

```json
{
  "query": "Your question here"
}
```

---

## 📁 Uploads Directory

All uploaded files will be saved in the `/uploads` folder. Ensure this directory exists and is writable.
