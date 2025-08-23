# Airbnb Booking App

Welcome to the Airbnb Booking App! This project is a full-stack web application that simulates the main functionalities of Airbnb, allowing users to browse, book, and list properties for short-term rentals. Below is a comprehensive guide covering the features, technologies used, setup instructions, and contribution guidelines.

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Getting Started](#getting-started)
5. [Usage](#usage)
6. [API Documentation](#api-documentation)
7. [Contributing](#contributing)
8. [License](#license)
9. [Acknowledgments](#acknowledgments)

---

## Features

- User authentication (sign up, log in, log out)
- Browse property listings with filters (location, price, dates, etc.)
- View property details, images, and reviews
- Book a property for specific dates
- Host: Add, edit, and delete property listings
- Manage bookings (view, cancel, approve)
- User profile and booking history
- Responsive design for desktop and mobile
- Real-time notifications (optional)
- Review and rating system

---

## Tech Stack

- **Frontend:** React.js (or Next.js), Redux/Context API, Tailwind CSS / Bootstrap / Material UI
- **Backend:** Node.js, Express.js
- **Database:** MongoDB / PostgreSQL / MySQL
- **Authentication:** JWT, bcrypt
- **APIs:** RESTful API architecture
- **Cloud/Storage:** AWS S3 (for image uploads) or local storage
- **Deployment:** Vercel/Netlify (Frontend), Heroku/Render (Backend)

---

## Project Structure
├── .gitignore
├── BackEnd
    ├── .gitignore
    ├── Schemas
    │   ├── bookingSchema.js
    │   ├── listingSchema.js
    │   ├── reviewsSchema.js
    │   └── userSchema.js
    ├── app.js
    ├── config
    │   ├── cloundinary.js
    │   ├── mongooseDB.js
    │   └── multer.js
    ├── controller
    │   ├── Review.controller.js
    │   ├── booking.controller.js
    │   ├── listing.controller.js
    │   └── user.controll.js
    ├── middleWare.js
    ├── middleware
    │   └── protectListing.js
    ├── models
    │   ├── bookingModel.js
    │   ├── listingModel.js
    │   ├── reviewModel.js
    │   └── userModel.js
    ├── package-lock.json
    ├── package.json
    ├── routes
    │   ├── User.routes.js
    │   ├── booking.rout.js
    │   ├── listing.route.js
    │   ├── review.rout.js
    │   └── upload.js
    ├── utils
    │   └── tokenGenret.js
    └── vercel.json
├── FrontEnd
    ├── .gitignore
    ├── README.md
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.js
    ├── public
    │   └── vite.svg
    ├── src
    │   ├── App.css
    │   ├── App.jsx
    │   ├── Navbar.jsx
    │   ├── assets
    │   │   ├── ABNB-4aaade0f.png
    │   │   ├── assets.js
    │   │   ├── email_icon.svg
    │   │   ├── lock_icon.svg
    │   │   ├── logo.jpeg
    │   │   ├── logo2.png
    │   │   ├── logo_2.png
    │   │   ├── person_icon.svg
    │   │   ├── profile_upload_icon.svg
    │   │   ├── react.svg
    │   │   └── upload_area.svg
    │   ├── components
    │   │   ├── Cancell.jsx
    │   │   ├── Footer.jsx
    │   │   ├── LisitngCard.jsx
    │   │   ├── ListingCardProfile.jsx
    │   │   ├── MenubarShow.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── Success.jsx
    │   │   └── skeletons
    │   │   │   ├── AllListingSckeleton.jsx
    │   │   │   └── HomePageSkeleton.jsx
    │   ├── context
    │   │   └── AppContext.jsx
    │   ├── index.css
    │   ├── main.jsx
    │   ├── pages
    │   │   ├── AllBookingListingProfile.jsx
    │   │   ├── AllListing.jsx
    │   │   ├── AllListing.profile.jsx
    │   │   ├── Authentication.jsx
    │   │   ├── CreateListing.jsx
    │   │   ├── EditListing.jsx
    │   │   ├── HostPage.jsx
    │   │   ├── SingleListing.jsx
    │   │   ├── home.jsx
    │   │   ├── oneListingProfile.jsx
    │   │   └── profilesShow.jsx
    │   └── views
    │   │   └── body.jsx
    ├── tailwind.config.js
    ├── vercel.json
    └── vite.config.js
└── README.md


/.gitignore:
--------------------------------------------------------------------------------
1 | 
2 | .env
3 | node_modules


--------------------------------------------------------------------------------
/BackEnd/.gitignore:
--------------------------------------------------------------------------------
1 | .env
2 | node_modules
