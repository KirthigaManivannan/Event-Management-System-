# Event-Management-System-
This project is a comprehensive tool designed to simplify the process of creating, editing, and managing events. It allows users to easily organize events, manage RSVP responses, and integrate with calendars for better scheduling.

**Tools Used:**
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, MongoDB
- **Authentication**: JWT
- **Deployment**: Netlify (Frontend), Render (Backend)

**Functions:**
- User registration and login via JWT.
- Event creation, editing, and viewing.
- RSVP functionality for events.
- Calender Integration

**Deployment:**
- Frontend deployed on **Netlify**.
- Backend deployed on **Render** with MongoDB for data storage.



## Run Locally

Follow these steps to set up and run the project locally:

1. Clone the repository:
   ```
   git clone <https://github.com/KirthigaManivannan/Event-Management-System-.git>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:
   ```
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-secret-key>
   PORT=5000
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. You should see:
   - `MongoDB Connected: event-management-system database`
   - `Server running on port 5000`

6. Open your browser and access:
   ```
   http://localhost:5000
   ```

