# Resume Roast

Upload your resume. Get roasted. Get hired.

Resume Roast is an AI-powered resume review platform that analyzes resumes like a recruiter and provides direct, actionable feedback with improvements.

It highlights weak sections, appreciates strong ones, rewrites low-impact content, and helps improve interview readiness.

## Features

* Upload PDF resumes
* Section-by-section review
* Recruiter-style feedback
* Resume score
* Resume rewrites and improvements
* ATS compatibility insights
* Bullet point optimization
* Recruiter decision simulation

## Tech Stack

### Frontend

* React
* TypeScript
* Tailwind CSS
* ShadCN UI
* Framer Motion

### Backend

* Node.js
* Express

### AI

* Google Gemini API

### Resume Processing

* PDF parsing

## Getting Started

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/Resumeroaster.git
cd Resumeroaster
```

Install dependencies:

```bash
npm install
```

Install backend dependencies:

```bash
cd server
npm install
```

Create:

`server/.env`

```env
GEMINI_API_KEY=YOUR_API_KEY
```

Run backend:

```bash
npm run dev
```

Run frontend:

```bash
npm run dev
```

## Example Output

Input:

> Aspiring AI Engineer with experience in Python and Machine Learning.

Output:

* Summary is too generic
* Skills need prioritization
* Projects need measurable impact
* Improved rewrite generated

## Roadmap

* Resume comparison
* Export improved resume
* Resume history
* Additional review modes

