# ⏳ Timer-Quest

Timer Quest is a productivity system with two parts:
- React Web App (Dashboard + Login)
- Chrome Extension (Tracks website usage)

The extension tracks time spent on websites and the dashboard visualizes your XP, streaks, and companion mood, all synced through Supabase.

## 🚀 Features
**Chrome Extension:**
- Tracks time spent on websites and stores in a datsabase
- Allows users to define custom timers for focused sessions
- Sends usage and timer data to Supabase

- **WebDashboard:**
- User authentication (Sign up / Login)
- Visualizes XP, streaks
- Database tables for usage logs, users, streaks, and XP

## 🛠️ Tech Stack / Tools
- **Frontend:** HTML, CSS, REACT
- **Backend:** Javascript
- **Database:** PostreSQL

## ⚙️ Installation
### Chrome Extension
1. Clone the repository
2. Open Chrome → Extensions → Load unpacked
3. Select the `extension` folder
4. Start tracking your website usage

### Web Dashboard
1. Clone the repository
2. Run `npm install` in the web folder
3. Set up environment variables for Supabase
4. Run `npm start` to launch the dashboard

## 📄 License