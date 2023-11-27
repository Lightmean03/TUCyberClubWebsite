# Towson Cyber Defense Club Website

Welcome to the Towson Cyber Defense Club Website! This React app is designed to provide a platform for managing club activities, resources, and communication.

## Project Structure

The project is organized with several key components:

- **`express/`**: Contains the backend server implementation using Express.js.
  - `build/`, `static/`: Build and static files for deployment.
  - `controllers/`: Controllers for handling routes and business logic.
  - `models/`: Database models (e.g., User, Score).
  - `routes/`: Express route definitions for different features (e.g., Calendar, Authentication).
  - `service.js`: Backend server entry point.

- **`my-app/`**: Houses the React frontend.
  - `public/`: Public assets (e.g., images, favicon, manifest).
  - `src/`: React application source code.
    - **`Components/`**: Organize your reusable components by feature.
      - **`Images/`**: Store all assets such as images and videos in this folder.
    - `Layout.js`: Main layout structure.
    - `ProtectedRoute.js`: Component for protected routes.
    - `App.js`: Main component for the React app.
    - `index.js`: Entry point for React app.
  - `App.test.js`, `reportWebVitals.js`, `setupTests.js`: Testing and performance-related scripts.

  

## Getting Started

Follow these instructions to set up the project on your local machine.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/your-repo.git
    cd your-repo
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

## Usage

### Starting the React App

Navigate to the `my-app` folder and run:

```bash
cd my-app
npm start

```
## Starting the Backend Server

Navigate to the express folder and run:


```bash
cd express
node service.js
```
