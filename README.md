# Secure-Watch: Security Guard Management System 🛡️

> **Internship Evaluation Project** > This repository contains a frontend development task built specifically for an internship selection process. It was developed to demonstrate proficiency in modern UI/UX implementation, component structuring, routing, and complex client-side state management within a time-bound evaluation period.

## 📖 Project Overview

**Secure-Watch** is a responsive, frontend-only web application designed to simulate real-world management workflows for security personnel. 

Because this was designed as a frontend-specific evaluation without a live backend, the application intelligently leverages browser storage (LocalStorage) and mock data to simulate complex data mutations, session handling, and dashboard analytics. The primary focus is on clean architecture, scalable folder structure, and professional design patterns.

## ✨ Differentiating Highlights

As an evaluation piece, this project specifically focuses on showcasing robust frontend skills:

* **Simulated Full-Stack Workflows:** Complete implementation of CRUD operations (Create, Read, Update, Delete) entirely on the client side, proving an understanding of data flow before an API is even connected.
* **Complex State Management:** Managing supervisor sessions and guard registries securely without external databases.
* **Form Validation & Error Handling:** Comprehensive edge-case handling on registration and login screens to ensure robust user inputs.
* **Component Reusability:** Modular UI design ensuring that tables, cards, and notification banners can be easily reused and scaled.

## 🚀 Key Features

### 1. Landing Interface
* Engaging application introduction and feature overview.
* Intuitive navigation guiding users to authentication flows.

### 2. Secure Authentication
* **Supervisor Login & Registration:** Dedicated flows for management access.
* **Robust Validation:** Real-time form validation for all input fields.
* **Session Management:** Secure state simulation using LocalStorage to persist supervisor sessions across page reloads.

### 3. Centralized Supervisor Dashboard
* **Guard Management:** Interface to add new guards, view detailed profiles, and manage existing security personnel.
* **System Monitoring:** A dedicated view for system notifications, alerts, and operational updates.
* **Structured Navigation:** Clean, accessible routing through the management interface.

## 💻 Tech Stack & Architecture

* **Frontend:** [Insert your framework, e.g., React.js / Next.js / Vanilla JS]
* **Styling:** [Insert your styling tool, e.g., Tailwind CSS / CSS Modules]
* **State/Storage:** Browser LocalStorage API
* **Architecture Strategy:** Container-Presentational component pattern for clean separation of logic and UI.

## 🛠️ Getting Started

To run this evaluation project locally:

1. Clone the repository:
   ```bash
   git clone [https://github.com/bhumi1235/Secure-Watch.git](https://github.com/bhumi1235/Secure-Watch.git)
   cd Secure-Watch

```

2. Install dependencies:
```bash
npm install

```


3. Start the development server:
```bash
npm run dev

```
