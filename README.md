# Task Manager Application

A collaborative task management application built with **NestJS** and a **micro-frontend** architecture.

---

## Features

### Backend
- **Authentication**: User login, JWT token generation, and secure routes.
- **Project Management**: Create project.
- **Task Management**: Create, update and view task details within projects.

### Frontend (Micro-Frontend Architecture)
- Multiple independent frontend modules:
  - **Authentication Module**: Handles login and registration.
  - **Dashboard Module**: Displays user projects and tasks.
  - **Project Module**: Manages project details and tasks.
  
- Built using **HTML**, **CSS**, **Bootstrap**, and **JavaScript**.

### Dockerized Deployment
The application is fully containerized with **Docker** and includes the following services:
- **Backend** (NestJS, multiple instances for load balancing)
- **Frontend** (micro-frontends served by NGINX)
- **PostgreSQL** (database storage)

### Nginx
The application use web balancing with nginx
