Naukri Chaahiye – Full Job Portal (Employer + Candidate)

A modern, scalable job portal built with React + MUI + Vite.

👩🏻‍💻 Developer

Afreeda Asad
Software Engineer / QA Analyst
GitHub: https://github.com/afridaasad

📌 Project Overview
Naukri Chaahiye is a two-panel job portal consisting of:

✅ Employer Panel

Post jobs

Manage jobs

View applicants

Dashboard insights

Auto-scrolling hiring stats

OTP-based login

Multi-step posting workflow

✅ Candidate Panel

Find jobs

Apply to jobs

View job details

Save jobs

Manage profile

Auto-search & filters

The project is built mobile-first and follows UI inspired by Naukri, JobChaahiye, and Indeed.

🛠️ Tech Stack
Layer	Technology
Frontend Framework	React (Vite)
UI Library	Material UI (MUI)
Routing	React Router v6
Animations	CSS keyframes, AOS
State	React Hooks / Context (later Redux)
Icons	MUI Icons
API Simulation	Mock JSON / Axios (placeholder)
📁 Project Structure (Planned)
job-portal-frontend/
│
├── public/
│   ├── logo.svg
│   ├── companies/
│   │      ├── amazon.png
│   │      ├── google.png
│   │      ├── facebook.png
│   │      └── ...
│
├── src/
│   ├── pages/
│   │    ├── Home/
│   │    │    └── JobPortalLanding.jsx
│   │    ├── Employer/
│   │    │    ├── EmployerLanding.jsx
│   │    │    ├── EmployerDashboard.jsx
│   │    │    ├── EmployerLoginModal.jsx
│   │    │    ├── EmployerOtpModal.jsx
│   │    │    ├── PostJob/
│   │    │    │     ├── JobDetails.jsx
│   │    │    │     ├── JobRequirements.jsx
│   │    │    │     ├── SalaryAndLocation.jsx
│   │    │    │     └── ReviewAndPost.jsx
│   │    │    └── PostedJobs.jsx
│   │    ├── Candidate/
│   │    │    ├── CandidateLanding.jsx
│   │    │    ├── JobSearch.jsx
│   │    │    ├── JobDetails.jsx
│   │    │    ├── SavedJobs.jsx
│   │    │    └── Profile/
│   │    │         ├── ProfileView.jsx
│   │    │         ├── ProfileEdit.jsx
│   │    │         └── ResumeUpload.jsx
│   │    
│   ├── components/
│   │    ├── Employer/
│   │    │    ├── EmployerHero.jsx
│   │    │    ├── StatsScroller.jsx
│   │    │    ├── CompanyScroller.jsx
│   │    │    ├── Sidebar.jsx
│   │    │    └── JobCard.jsx
│   │    ├── Home/
│   │    │    ├── Hero.jsx
│   │    │    ├── SuccessStories.jsx
│   │    │    ├── PopularSearches.jsx
│   │    │    ├── FeaturedJobs.jsx
│   │    │    └── PopularJobCategories.jsx
│   │    ├── Candidate/
│   │    │    ├── CandidateHero.jsx
│   │    │    ├── SearchFilters.jsx
│   │    │    └── ApplicationCard.jsx
│   │    └── common/
│   │         ├── Navbar.jsx
│   │         ├── Footer/
│   │         │     ├── FooterTop.jsx
│   │         │     └── FooterMain.jsx
│   │         └── Loader.jsx
│   │
│   ├── routes/
│   │     ├── EmployerRoutes.jsx
│   │     └── CandidateRoutes.jsx
│   │
│   └── App.jsx
│
└── README.md

🚀 Routing Plan
📌 Employer Routes
/employer

Employer landing page

Hero

Mobile login modal

Auto-scrolling company logos

Auto-scrolling hiring stats

/employer/login

Static OTP-based login flow

Enter mobile

Enter OTP

/employer/dashboard

Main panel

Overview cards

Total jobs posted

Recent applicants

Quick stats

/employer/post-job

Multi-step job posting

Job Details

Requirements

Salary & Location

Review + Post

/employer/posted-jobs

List of posted jobs

/employer/job/:id

View applicants per job

📌 Candidate Routes
/

Homepage

Hero

Featured jobs

Popular categories

Testimonials

/jobs

Job search page

Search bar

Filters

Sidebar

/jobs/:id

Job details page

Apply button

JD details

Company info

/saved-jobs

Candidate saved jobs list

/profile

Main profile page

/profile/edit

Edit profile info

/profile/resume

Upload resume (PDF, docx)

📊 Features Checklist
Employer

✔ OTP login
✔ Dashboard
✔ Auto-scroll logos
✔ Auto-scroll stats
✔ Post a job (multi-step)
✔ Manage jobs
✔ Applicants list

Candidate

✔ Search & filters
✔ Save jobs
✔ Job details
✔ Apply flow (UI static)
✔ Profile + resume

🔧 API Endpoints (Future Integration)

For now, static mock data is used.
Later these APIs will be connected:

POST /auth/send-otp
POST /auth/verify-otp
POST /jobs
GET /jobs
GET /jobs/:id
GET /employer/jobs
GET /employer/dashboard-stats
POST /candidate/profile
POST /candidate/resume-upload

📌 Installation
npm install
npm run dev

📌 Deployment Plan

Frontend → Vercel

Images → Cloudinary

Backend (future) → Node / Express / Railway

🎉 Final Note

This project follows a clean component-architecture and is being developed by:

Afreeda Asad (Software Engineer & QA Analyst)
👩🏻‍💻 Passion for UI, Cybersecurity & scalable frontend systems.