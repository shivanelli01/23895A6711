# URL Shortener Web Application  

This repository contains my submission for the **Campus Hiring Evaluation - Frontend Track**.  
The project is a client-side **React-based URL Shortener** that allows users to shorten URLs, manage validity, use custom shortcodes, and view analytics such as clicks and expiry details.  

---

## 📂 Repository Structure  

├── LoggingMiddleware/ # Logging Middleware implementation
├── FrontendTestSubmission/ # React Frontend Code for URL Shortener


---

## 🚀 Features  

- Shorten up to **5 URLs at once**  
- Optional **validity period** (default = 30 mins)  
- Optional **custom shortcode** (unique, alphanumeric)  
- Copy button to copy the short URL  
- Client-side **redirection** (short link → original link)  
- **Statistics Page** showing:
  - Short URL with creation & expiry time  
  - Total click count  
  - Click details (timestamp, source, location - dummy data)  
- **Robust error handling** for invalid inputs & shortcode collisions  
- Integrated with **custom Logging Middleware** (no `console.log`)  
- Clean and responsive UI using **Material UI**  

---

## 🛠️ Tech Stack  

- **Frontend:** React (JavaScript)  
- **Styling:** Material UI + CSS  
- **Routing:** React Router DOM  
- **Logging:** Custom Middleware  

---

## 📸 Screenshots  

👉 Add these after running your project locally:  

- URL Shortener Page (Desktop + Mobile)  
- Statistics Page (Desktop + Mobile)  
- Redirection Demo  

---

## ⚙️ Installation & Running  

1. Clone this repository:  
   ```bash
   git clone https://github.com/<your-username>/<rollnumber>.git
   cd FrontendTestSubmission
Install dependencies:

npm install


Run the application:

npm start


Access at:

http://localhost:3000
📌 Notes

The application uses dummy local storage for persistence (session-based).

All short links are unique within the session.

Analytics data (click source & location) is simulated for demonstration.

✅ Submission Checklist

 Logging Middleware integrated

 React frontend developed

 No external CSS libraries (only Material UI & CSS used)

 Unique short links with expiry support

 Redirection handled on client-side

 Repository structure as per guidelines

 Screenshots of desktop & mobile views
