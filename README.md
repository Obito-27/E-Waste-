# EcoCycle (E-Waste-Scan)

EcoCycle is an innovative platform connecting individuals and businesses (B2C/B2B) with certified e-waste collection agents. Our mission is to simplify the recycling process, provide AI-powered market appraisals for unused electronics, and promote a sustainable, circular economy.

## Features

### For Users (B2C & B2B)
- **AI E-Waste Appraisal**: Upload photos of your old gadgets. Using Google's Gemini AI, the system identifies the device, determines its condition, and provides an instant estimated market value based on current real-world pricing.
- **Schedule Pickups**: Easily request a pickup for your e-waste from your location.
- **Find Collection Centers**: Interactive map integration (via Google Maps API) to discover nearby certified drop-off locations.
- **Track Impact**: View your environmental contribution, including CO2 saved, water conserved, and trees equivalent planted based on the e-waste you've recycled.
- **Real-Time Tracking**: Get live status updates on your pickup requests as agents claim and collect them.

### For Agents (Collectors)
- **Agent Dashboard**: Dedicated interface for collection agents to view available pickups in their area.
- **Claim & Collect**: Agents can claim pending pickups and mark them as collected once completed.

## Tech Stack

### Frontend
- **Framework**: React (using Vite)
- **Routing**: Wouter
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI (Radix UI)
- **State Management**: TanStack React Query & React Context
- **Icons**: Lucide React & React Icons
- **Maps**: `@vis.gl/react-google-maps`

### Backend & AI
- **Server**: Node.js with Express
- **AI Integration**: Google Gen AI SDK (`gemini-2.5-flash` model) for image parsing and appraisal.
- **Database (Primary)**: Firebase Firestore (Real-time updates, users, pickups)
- **Database (Relational fallback/schema)**: Better SQLite3 with Drizzle ORM
- **Authentication**: Firebase Auth

## Getting Started

### Prerequisites
- Node.js (v18+)
- Firebase Project (with Firestore and Auth enabled)
- Google Maps API Key
- Google Gemini API Key

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/eco-cycle.git
   cd eco-cycle
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory and add the following keys:
   ```env
   GOOGLE_MAPS_API_KEY=your_maps_api_key
   VITE_MAPS_API_KEY=your_maps_api_key
   FIREBASE_API_KEY=your_firebase_key
   FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
   FIREBASE_MESSAGING_SENDER_ID=sender_id
   FIREBASE_APP_ID=app_id
   FIREBASE_MEASUREMENT_ID=measurement_id
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5000`.

## Architecture Guide

For a detailed view of the system's architecture, data flows, and component structure, please refer to the [ARCHITECTURE.md](./ARCHITECTURE.md) file.
