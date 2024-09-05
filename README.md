# Towson Cyber Defense Club Website

Welcome to the Towson Cyber Defense Club Website! This React app is designed to provide a platform for managing club activities, resources, and communication.

## Running with docker

First clone the repo with `git clone https://github.com/Lightmean03/TUCyberClubWebsite`. Then:

- Use `docker compose up -d` to build and deploy both the backend and the frontend.
- Use `docker compose logs` to view the logs. Use the `-f` flag to follow the logs in real time.
- Use `docker compose down` to stop the containers.
  _Note_: The node (frontend) build appears to hang, but will complete after ~6 minutes.
