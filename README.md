<h1 align="left">Job Portal Frontend</h1> <p align="left"> <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="180px"> </p>
📍 Overview

A modern, responsive Job Portal frontend built using React + Vite, designed for employers and job seekers.
It includes intuitive dashboards, a multi-step job posting flow, and a structured component architecture for scalable development.
This frontend is optimized for clean API integration, modular UI, and high-performance rendering.

👾 Features

Responsive UI for Home, Employer, and Employee experiences

OTP-based authentication flows

Employer Dashboard with:

Multi-step Post Job process

Credits, Billing, Notifications

Candidate Database Search

Employee Landing with success stories, hero section, and login modal

Reusable UI components (Testimonials, Stats Scrollers, Company Logos, Rich Text Editor)

Clean folder architecture for scalability

Optimized for Vite's fast dev environment

📁 Project Structure
📁 job-portal-frontend/
├── public/               # Static assets, banners, logos, brand images
├── src/
│   ├── components/       # Reusable UI components for Home, Employer, Employee
│   ├── pages/            # Route-level pages (Landing pages, Dashboards, Post Job flow)
│   ├── api/              # API request files (e.g., OTP, register, login)
│   ├── assets/           # Local assets used inside components
│   ├── App.jsx           # Root app component
│   ├── main.jsx          # Application entry point
│   └── index.css         # Global styles
├── package.json          # Dependencies & scripts
├── vite.config.js        # Vite configuration
└── README.md             # Project documentation

🚀 Getting Started
☑️ Prerequisites

JavaScript (ES6+)

npm

⚙️ Installation
git clone https://github.com/campaignwalatech-netizen/job-portal-frontend.git
cd job-portal-frontend
npm install

🤖 Usage (Vite)
npm run dev


This will start the development server at:

http://localhost:5173

🧪 Testing

A /tests folder will be added later using a suitable test framework (Vitest/Jest).
Testing commands will be updated once test setup is complete.

📌 Project Roadmap
✅ Task 1 — Landing Pages (Completed)

Home Landing

Employer Landing

Employee Landing

🚧 Task 2 — Employer Panel (In Progress)

Employer Dashboard & Navigation

5-step Job Posting Flow

Candidate Database

Billing, Credits, Notifications
Assigned to: Afreeda Asad

🕗 Task 3 — Employee Panel (Not Started)

Employee Dashboard

Profile Settings

Job Search UI

👩‍💻 Author

Afreeda Asad
Frontend Developer — Job Portal Platform

🎗 License

This is a private/company project, not open-source.
A license is not included unless provided by the organization.

🙌 Acknowledgments

Design inspirations from modern hiring platforms

UI icons from Material Icon Theme

Component-driven architecture using React best practices

Built with ❤️ by Afreeda Asad.