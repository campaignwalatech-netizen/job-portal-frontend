<p align="left">
    <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" align="left" width="30%">
</p>
<p align="left"><h1 align="left">JOB-PORTAL-FRONTEND.GIT</h1></p>
<p align="left">
	<em><code>❯ REPLACE-ME</code></em>
</p>
<p align="left">
	<img src="https://img.shields.io/github/license/campaignwalatech-netizen/job-portal-frontend.git?style=default&logo=opensourceinitiative&logoColor=white&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/campaignwalatech-netizen/job-portal-frontend.git?style=default&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/campaignwalatech-netizen/job-portal-frontend.git?style=default&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/campaignwalatech-netizen/job-portal-frontend.git?style=default&color=0080ff" alt="repo-language-count">
</p>
<p align="left">
</p>
<p align="left">
</p>
<br>

## 🔗 Quick Links

- [📍 Overview](#-overview)
- [👾 Features](#-features)
- [📁 Project Structure](#-project-structure)
  - [📂 Project Index](#-project-index)
- [🚀 Getting Started](#-getting-started)
  - [☑️ Prerequisites](#-prerequisites)
  - [⚙️ Installation](#-installation)
  - [🤖 Usage](#🤖-usage)
  - [🧪 Testing](#🧪-testing)
- [📌 Project Roadmap](#-project-roadmap)
- [🔰 Contributing](#-contributing)
- [🎗 License](#-license)
- [🙌 Acknowledgments](#-acknowledgments)

---

## 📍 Overview

<code>❯ REPLACE-ME</code>

---

## 👾 Features

<code>❯ REPLACE-ME</code>

---

## 📁 Project Structure

```sh
└── job-portal-frontend.git/
    ├── README.md
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── public
    │   ├── banner-image.svg
    │   ├── banner-image.webp
    │   ├── banner-photo.webp
    │   ├── companies
    │   │   ├── amazon.png
    │   │   ├── blackrock.png
    │   │   ├── bloomberg.png
    │   │   ├── consensys.png
    │   │   ├── google.png
    │   │   ├── meta.png
    │   │   ├── microsoft.png
    │   │   └── twosigma.png
    │   ├── logo.svg
    │   └── vite.svg
    ├── src
    │   ├── App.css
    │   ├── App.jsx
    │   ├── api
    │   │   └── auth.js
    │   ├── assets
    │   │   └── react.svg
    │   ├── components
    │   │   ├── Employee
    │   │   │   ├── EmployeeHeader.jsx
    │   │   │   ├── EmployeeHero.jsx
    │   │   │   ├── EmployeeLoginModal.jsx
    │   │   │   ├── EmployeeOtpModal.jsx
    │   │   │   ├── EmployeeSuccessStories.jsx
    │   │   │   ├── StatsScroller.jsx
    │   │   │   ├── Testimonials.jsx
    │   │   │   └── TopCompanies.jsx
    │   │   ├── Employer
    │   │   │   ├── BlogSection.jsx
    │   │   │   ├── DatabaseSection.jsx
    │   │   │   ├── EmployerHeader.jsx
    │   │   │   ├── EmployerHero.jsx
    │   │   │   ├── EmployerOtpModal.jsx
    │   │   │   ├── PostJob.jsx
    │   │   │   ├── StatsScroller.jsx
    │   │   │   ├── TestimonialsSection.jsx
    │   │   │   ├── TopCompanies.jsx
    │   │   │   └── dashboard
    │   │   │       ├── MiniDigiLocker.jsx
    │   │   │       ├── Navbar.jsx
    │   │   │       └── dashboardheader.jsx
    │   │   ├── Home
    │   │   │   ├── FeaturedJobs.jsx
    │   │   │   ├── Hero.jsx
    │   │   │   ├── PopularJobCategories.jsx
    │   │   │   ├── PopularSearches.jsx
    │   │   │   ├── SuccessStories.jsx
    │   │   │   ├── Testimonials.jsx
    │   │   │   └── WantToHire.jsx
    │   │   ├── RichTextEditor.jsx
    │   │   ├── ToggleSwitch.jsx
    │   │   ├── common
    │   │   │   ├── Footer
    │   │   │   │   ├── Footer.jsx
    │   │   │   │   ├── FooterMain.jsx
    │   │   │   │   └── FooterTop.jsx
    │   │   │   ├── Footer.jsx
    │   │   │   ├── Header
    │   │   │   │   └── Header.jsx
    │   │   │   └── Testimonials.jsx
    │   │   └── data
    │   │       ├── employeeTestimonialsData.js
    │   │       ├── employerTestimonialsData.js
    │   │       └── homeTestimonialsData.js
    │   ├── index.css
    │   ├── main.jsx
    │   └── pages
    │       ├── Home
    │       │   └── JobPortalLanding.jsx
    │       ├── employee
    │       │   ├── EmployeeDashboard.jsx
    │       │   ├── EmployeeLanding.jsx
    │       │   └── register.jsx
    │       └── employer
    │           ├── EmployerDashboard.jsx
    │           ├── EmployerDashboardHome.jsx
    │           ├── EmployerLanding.jsx
    │           ├── EmployerVerification.jsx
    │           ├── PostJob
    │           │   ├── PostJobWrapper.jsx
    │           │   ├── Step1JobDetails.jsx
    │           │   ├── Step2BasicDetails.jsx
    │           │   ├── Step3InterviewDetails.jsx
    │           │   ├── Step4Preview.jsx
    │           │   ├── Step5SelectPlan.jsx
    │           │   ├── post-job.css
    │           │   └── progressbar.jsx
    │           ├── ProfileSettings.jsx
    │           ├── Register.jsx
    │           ├── billing.jsx
    │           ├── credits.jsx
    │           ├── database
    │           │   └── SearchCandidates.jsx
    │           ├── jobs
    │           │   └── JobManagement.jsx
    │           └── notifications.jsx
    ├── vercel.json
    └── vite.config.js
```


### 📂 Project Index
<details open>
	<summary><b><code>JOB-PORTAL-FRONTEND.GIT/</code></b></summary>
	<details> <!-- __root__ Submodule -->
		<summary><b>__root__</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/package-lock.json'>package-lock.json</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/vercel.json'>vercel.json</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/vite.config.js'>vite.config.js</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/package.json'>package.json</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/index.html'>index.html</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/eslint.config.js'>eslint.config.js</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			</table>
		</blockquote>
	</details>
	<details> <!-- src Submodule -->
		<summary><b>src</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/index.css'>index.css</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/App.css'>App.css</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/App.jsx'>App.jsx</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/main.jsx'>main.jsx</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			</table>
			<details>
				<summary><b>components</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/components/ToggleSwitch.jsx'>ToggleSwitch.jsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/components/RichTextEditor.jsx'>RichTextEditor.jsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					</table>
					<details>
						<summary><b>common</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/components/common/Footer.jsx'>Footer.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/components/common/Testimonials.jsx'>Testimonials.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							</table>
							<details>
								<summary><b>Header</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/components/common/Header/Header.jsx'>Header.jsx</a></b></td>
										<td><code>❯ REPLACE-ME</code></td>
									</tr>
									</table>
								</blockquote>
							</details>
							<details>
								<summary><b>Footer</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/components/common/Footer/FooterTop.jsx'>FooterTop.jsx</a></b></td>
										<td><code>❯ REPLACE-ME</code></td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/components/common/Footer/Footer.jsx'>Footer.jsx</a></b></td>
										<td><code>❯ REPLACE-ME</code></td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/components/common/Footer/FooterMain.jsx'>FooterMain.jsx</a></b></td>
										<td><code>❯ REPLACE-ME</code></td>
									</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
					<details>
						<summary><b>Employer</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/components/Employer/EmployerHeader.jsx'>EmployerHeader.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/components/Employer/BlogSection.jsx'>BlogSection.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/components/Employer/DatabaseSection.jsx'>DatabaseSection.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/components/Employer/TopCompanies.jsx'>TopCompanies.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/components/Employer/TestimonialsSection.jsx'>TestimonialsSection.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/components/Employer/StatsScroller.jsx'>StatsScroller.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/components/Employer/PostJob.jsx'>PostJob.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/components/Employer/EmployerHero.jsx'>EmployerHero.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/components/Employer/EmployerOtpModal.jsx'>EmployerOtpModal.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							</table>
							<details>
								<summary><b>dashboard</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/components/Employer/dashboard/MiniDigiLocker.jsx'>MiniDigiLocker.jsx</a></b></td>
										<td><code>❯ REPLACE-ME</code></td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/components/Employer/dashboard/Navbar.jsx'>Navbar.jsx</a></b></td>
										<td><code>❯ REPLACE-ME</code></td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/components/Employer/dashboard/dashboardheader.jsx'>dashboardheader.jsx</a></b></td>
										<td><code>❯ REPLACE-ME</code></td>
									</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
					<details>
						<summary><b>Employee</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/components/Employee/EmployeeLoginModal.jsx'>EmployeeLoginModal.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/components/Employee/EmployeeSuccessStories.jsx'>EmployeeSuccessStories.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/components/Employee/EmployeeOtpModal.jsx'>EmployeeOtpModal.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/components/Employee/TopCompanies.jsx'>TopCompanies.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/components/Employee/StatsScroller.jsx'>StatsScroller.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/components/Employee/EmployeeHero.jsx'>EmployeeHero.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/components/Employee/Testimonials.jsx'>Testimonials.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/components/Employee/EmployeeHeader.jsx'>EmployeeHeader.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							</table>
						</blockquote>
					</details>
					<details>
						<summary><b>Home</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/components/Home/FeaturedJobs.jsx'>FeaturedJobs.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/components/Home/WantToHire.jsx'>WantToHire.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/components/Home/SuccessStories.jsx'>SuccessStories.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/components/Home/Testimonials.jsx'>Testimonials.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/components/Home/Hero.jsx'>Hero.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/components/Home/PopularJobCategories.jsx'>PopularJobCategories.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/components/Home/PopularSearches.jsx'>PopularSearches.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							</table>
						</blockquote>
					</details>
				</blockquote>
			</details>
			<details>
				<summary><b>pages</b></summary>
				<blockquote>
					<details>
						<summary><b>employer</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/pages/employer/EmployerVerification.jsx'>EmployerVerification.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/pages/employer/EmployerLanding.jsx'>EmployerLanding.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/pages/employer/notifications.jsx'>notifications.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/pages/employer/billing.jsx'>billing.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/pages/employer/EmployerDashboard.jsx'>EmployerDashboard.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/pages/employer/Register.jsx'>Register.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/pages/employer/credits.jsx'>credits.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/pages/employer/ProfileSettings.jsx'>ProfileSettings.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/pages/employer/EmployerDashboardHome.jsx'>EmployerDashboardHome.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							</table>
							<details>
								<summary><b>PostJob</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/pages/employer/PostJob/progressbar.jsx'>progressbar.jsx</a></b></td>
										<td><code>❯ REPLACE-ME</code></td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/pages/employer/PostJob/PostJobWrapper.jsx'>PostJobWrapper.jsx</a></b></td>
										<td><code>❯ REPLACE-ME</code></td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/pages/employer/PostJob/Step3InterviewDetails.jsx'>Step3InterviewDetails.jsx</a></b></td>
										<td><code>❯ REPLACE-ME</code></td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/pages/employer/PostJob/Step5SelectPlan.jsx'>Step5SelectPlan.jsx</a></b></td>
										<td><code>❯ REPLACE-ME</code></td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/pages/employer/PostJob/Step1JobDetails.jsx'>Step1JobDetails.jsx</a></b></td>
										<td><code>❯ REPLACE-ME</code></td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/pages/employer/PostJob/Step4Preview.jsx'>Step4Preview.jsx</a></b></td>
										<td><code>❯ REPLACE-ME</code></td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/pages/employer/PostJob/post-job.css'>post-job.css</a></b></td>
										<td><code>❯ REPLACE-ME</code></td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/pages/employer/PostJob/Step2BasicDetails.jsx'>Step2BasicDetails.jsx</a></b></td>
										<td><code>❯ REPLACE-ME</code></td>
									</tr>
									</table>
								</blockquote>
							</details>
							<details>
								<summary><b>jobs</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/pages/employer/jobs/JobManagement.jsx'>JobManagement.jsx</a></b></td>
										<td><code>❯ REPLACE-ME</code></td>
									</tr>
									</table>
								</blockquote>
							</details>
							<details>
								<summary><b>database</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/pages/employer/database/SearchCandidates.jsx'>SearchCandidates.jsx</a></b></td>
										<td><code>❯ REPLACE-ME</code></td>
									</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
					<details>
						<summary><b>employee</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/pages/employee/register.jsx'>register.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/pages/employee/EmployeeDashboard.jsx'>EmployeeDashboard.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/pages/employee/EmployeeLanding.jsx'>EmployeeLanding.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							</table>
						</blockquote>
					</details>
					<details>
						<summary><b>Home</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/pages/Home/JobPortalLanding.jsx'>JobPortalLanding.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							</table>
						</blockquote>
					</details>
				</blockquote>
			</details>
			<details>
				<summary><b>api</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/master/src/api/auth.js'>auth.js</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					</table>
				</blockquote>
			</details>
		</blockquote>
	</details>
</details>

---
## 🚀 Getting Started

### ☑️ Prerequisites

Before getting started with job-portal-frontend.git, ensure your runtime environment meets the following requirements:

- **Programming Language:** JavaScript
- **Package Manager:** Npm


### ⚙️ Installation

Install job-portal-frontend.git using one of the following methods:

**Build from source:**

1. Clone the job-portal-frontend.git repository:
```sh
❯ git clone https://github.com/campaignwalatech-netizen/job-portal-frontend.git
```

2. Navigate to the project directory:
```sh
❯ cd job-portal-frontend.git
```

3. Install the project dependencies:


**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm install
```




### 🤖 Usage
Run job-portal-frontend.git using the following command:
**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm start
```


### 🧪 Testing
Run the test suite using the following command:
**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm test
```


---
## 📌 Project Roadmap

- [X] **`Task 1`**: <strike>Implement feature one.</strike>
- [ ] **`Task 2`**: Implement feature two.
- [ ] **`Task 3`**: Implement feature three.

---

## 🔰 Contributing

- **💬 [Join the Discussions](https://github.com/campaignwalatech-netizen/job-portal-frontend.git/discussions)**: Share your insights, provide feedback, or ask questions.
- **🐛 [Report Issues](https://github.com/campaignwalatech-netizen/job-portal-frontend.git/issues)**: Submit bugs found or log feature requests for the `job-portal-frontend.git` project.
- **💡 [Submit Pull Requests](https://github.com/campaignwalatech-netizen/job-portal-frontend.git/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/campaignwalatech-netizen/job-portal-frontend.git
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="left">
   <a href="https://github.com{/campaignwalatech-netizen/job-portal-frontend.git/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=campaignwalatech-netizen/job-portal-frontend.git">
   </a>
</p>
</details>

---

## 🎗 License

This project is protected under the [SELECT-A-LICENSE](https://choosealicense.com/licenses) License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/) file.

---

## 🙌 Acknowledgments

- List any resources, contributors, inspiration, etc. here.

---
