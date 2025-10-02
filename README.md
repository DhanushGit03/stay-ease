# StayEase: Full-Stack Hotel Booking Platform

## Project Overview

StayEase is a modern, full-stack hotel booking application designed to provide a seamless experience for both hotel owners and guests. It allows users to search for hotels, view details, manage bookings, and for hotel owners to list and manage their properties. The platform emphasizes a responsive user interface, secure authentication, and efficient data management.

## Key Features

- **User Authentication:** Secure registration, login, and session management for guests and hotel owners.
- **Hotel Management:** Hotel owners can add, edit, and delete their hotel listings, including details, facilities, guest capacity, and images.
- **Hotel Search & Filtering:** Guests can search for hotels based on destination, dates, and apply various filters (e.g., star rating, facilities, price range, hotel type).
- **Booking System:** Guests can view hotel availability, select rooms, and make secure bookings.
- **Payment Integration:** Seamless and secure payment processing powered by Stripe.
- **Image Upload:** Cloudinary integration for efficient and scalable image storage and delivery for hotel listings.
- **Responsive Design:** A user-friendly interface that adapts to various screen sizes.
- **My Bookings & My Hotels:** Dedicated sections for users to view their past and upcoming bookings, and for hotel owners to manage their properties.

## Technologies Used

### Frontend

- **React:** A JavaScript library for building user interfaces.
- **TypeScript:** A superset of JavaScript that adds static typing.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **Vite:** A fast build tool for modern web projects.
- **React Query:** For data fetching, caching, and state management.

### Backend

- **Node.js:** A JavaScript runtime for server-side development.
- **Express.js:** A fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB:** A NoSQL database for flexible data storage.
- **Mongoose:** An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **JWT (JSON Web Tokens):** For secure user authentication.
- **Cloudinary:** Cloud-based image and video management.
- **Stripe API:** For processing secure payments.

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

- Node.js installed on your system.
- MongoDB Atlas account (or local MongoDB instance).
- Cloudinary account.
- Stripe account.

### 1. Clone the Repository

```bash
git clone https://github.com/DhanushGit03/stayease-book-your-hotel.git
cd stayease-book-your-hotel
```

### 2. Backend Setup

Navigate to the `server` directory:

```bash
cd server
```

Create a `.env` file and add your environment variables (MongoDB connection string, JWT secret, Cloudinary credentials, Stripe API key, Frontend URL). Refer to the `.env.example` (if available) or the previous README for required variables.

```
MONGODB_CONNECTION_STRING=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret_key
FRONTEND_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
STRIPE_API_KEY=your_stripe_secret_key
```

Install dependencies and start the server:

```bash
npm install
npm start
```

### 3. Frontend Setup

Open a new terminal and navigate to the `client` directory:

```bash
cd ../client
```

Create a `.env` file and add your environment variables (Backend API URL, Stripe Public Key):

```
VITE_API_BASE_URL=http://localhost:7000
VITE_STRIPE_PUB_KEY=your_stripe_publishable_key
```

Install dependencies and start the frontend application:

```bash
npm install
npm run dev
```

The application should now be running and accessible in your browser, typically at `http://localhost:5173`.
