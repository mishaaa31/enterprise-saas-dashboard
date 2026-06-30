# Enterprise SaaS Admin Dashboard

A premium, production-ready, dark-mode only enterprise admin dashboard showcasing advanced React engineering skills.

## Overview

This project was built to demonstrate proficiency in architecting and implementing complex React applications. It focuses heavily on advanced data manipulation, efficient global and server state management, and providing a highly refined, modern aesthetic (inspired by top-tier SaaS platforms like Vercel and Linear).

The core of the application features a robust Master Data Table that handles simulated server-side pagination, sorting, and global filtering, alongside multi-row selection and dynamic column visibility.

## Tech Stack & Architecture

- **React 19 + TypeScript + Vite**: Provides a fast, type-safe development environment and optimized production builds.
- **Tailwind CSS v4**: Utility-first CSS framework for rapid UI development and implementing the rigid, premium dark-mode design system.
- **TanStack Table (v8)**: A headless UI library used to build the highly complex and performant data table. It was chosen over pre-styled libraries (like MUI) to demonstrate deep implementation knowledge and total control over the DOM and styling.
- **Redux Toolkit**: Manages global UI state (sidebar toggling, table column preferences) and user authentication state. Essential for demonstrating enterprise-scale state handling.
- **TanStack Query (React Query)**: Manages asynchronous state, data fetching, caching, and loading states for the simulated API.
- **React Hook Form + Zod**: Handles form state and schema-based validation on the Login page with optimal performance and type safety.
- **Lucide React**: Crisp, modern icon set.
- **faker.js**: Generates the large, realistic mock dataset for the data table.

## Features

- **Authentication Flow**: Mock login page with validation. Secures the main dashboard route.
- **Advanced Data Table**:
  - Global searching and filtering.
  - Server-side sorting simulation.
  - Pagination with configurable page sizes.
  - Multi-row selection.
  - Toggling column visibility.
  - Loading skeleton states.
- **Premium Aesthetics**:
  - Consistent #111111 background and #1A1A1A surface layers.
  - Vibrant accent colors (#3B82F6) for interactive elements.
  - Modern typography (Inter font).
  - Micro-interactions and hover states.

## How to Run Locally

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd enterprise-saas-dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Access the application**:
   Open `http://localhost:5173` in your browser.

5. **Login Credentials**:
   - Email: `admin@example.com`
   - Password: `password`

## Deployment

This project is configured to be easily deployed to Vercel. 
Simply push to a GitHub repository and import the project in the Vercel dashboard.
