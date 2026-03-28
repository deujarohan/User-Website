# User Management System - Full Stack CRUD Application

## 📋 Project Overview

A complete CRUD (Create, Read, Update, Delete) web application for managing user information. Built with Node.js, Express, MongoDB, and PUG template engine. This application allows users to add, view, edit, and delete user records through a responsive web interface.

**Author:** Rohan Deuja  
**Student Number:** C0957767  
**Course:** Full Stack JavaScript - First Assignment  
**Date:** March 2026

---

## ✨ Features

### Core Functionality

- **Create Users** - Add new users with all personal information
- **Read Users** - View all users in a sortable table format
- **Update Users** - Edit existing user information
- **Delete Users** - Remove users with confirmation dialog

### Technical Features

- RESTful API architecture
- MongoDB Atlas cloud database
- Input validation and sanitization
- Error handling with user-friendly messages
- Responsive design using Bootstrap 5
- Server-side rendering with PUG templates
- Environment variables for configuration

### User Information Fields

| Category     | Fields                                                     |
| ------------ | ---------------------------------------------------------- |
| **Personal** | First Name, Last Name, Date of Birth                       |
| **Address**  | Address Line 1, Address Line 2, City, Postal Code, Country |
| **Contact**  | Phone Number, Email                                        |
| **Notes**    | User Notes (optional)                                      |

---

## Live Demo Pages

1. **Add User Page** - Form to create new user records
2. **User List Page** - Table displaying all users with edit options
3. **Edit User Page** - Form to update user information with delete button

---

## 📁 Project Structure

user website/
├─ config/
│ └─ db.js
├─ Model/
│ └─ User.js
├─ public/
├─ Routes/
│ └─ users.js
├─ Views/
│ ├─ add-user.pug
│ ├─ edit-user.pug
│ ├─ error.pug
│ ├─ layout.pug
│ └─ users-list.pug
├─ .env
├─ index.js
├─ package-lock.json
├─ package.json
└─ README.md

---

## Technologies Used

| Technology            | Purpose                                   |
| --------------------- | ----------------------------------------- |
| **Node.js**           | JavaScript runtime environment            |
| **Express.js**        | Web application framework                 |
| **MongoDB Atlas**     | Cloud database service                    |
| **Mongoose**          | MongoDB ODM for data modeling             |
| **PUG**               | Template engine for server-side rendering |
| **Font Awesome**      | Icons for visual enhancements             |
| **dotenv**            | Environment variable management           |
| **express-validator** | Input validation middleware               |

---

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- MongoDB Atlas account (or local MongoDB)

### Step 1: Clone/Extract the Project

```bash
# Extract the ZIP file to your desired location
cd C0957767_FirstAssignment
```
