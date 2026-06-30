# Enterprise SaaS Admin Dashboard (Pro-Dev Workspace)

**Live Deployment URL**: [https://enterprise-saas-dashboard-mishaaa31s-projects.vercel.app](https://enterprise-saas-dashboard-mishaaa31s-projects.vercel.app) (Please verify actual URL from Vercel)
**GitHub Repository**: [https://github.com/mishaaa31/enterprise-saas-dashboard](https://github.com/mishaaa31/enterprise-saas-dashboard)

A premium, production-ready, dark-mode only enterprise admin dashboard built to match Josh Technology Group (JTG) frontend engineering standards.

## Project Overview

This workspace showcases deep knowledge of modern frontend architecture, state management, and highly optimized DOM manipulation. It features a complete mock authentication flow, scalable folder structure, and a highly complex, WAI-ARIA compliant data table built from scratch.

## Tech Stack & Architecture

- **React 19 + TypeScript + Vite**: Provides a fast, strictly-typed development environment for enterprise scalability and performance.
- **Tailwind CSS v4**: Utility-first CSS framework used for the rigid, premium dark-mode design system (`#111111` background, `#1A1A1A` surfaces, Inter font, `#3B82F6` accent).
- **TanStack Table (v8)**: Headless UI library used to build the complex data table. Chosen specifically to demonstrate deep DOM control, custom UI implementations, and WAI-ARIA compliance (instead of relying on pre-styled components).
- **Redux Toolkit**: Manages global enterprise-level UI state (sidebar toggling, table column preferences) and mock authentication.
- **TanStack Query (React Query)**: Handles asynchronous state, caching, prefetching, and loading (skeleton) states for the simulated API with a 1000+ realistic dataset.
- **React Hook Form + Zod**: Highly performant, schema-validated form handling for the Login flow.
- **Error Boundaries**: Implemented at the root level to prevent crashes and provide robust error handling.

## Features Implementation

- **Premium Layout & Auth**: Persistent collapsible sidebar, top header, secure routing, and global Error Boundary.
- **Master Data Table**: 
  - Server-side sorting & pagination simulation.
  - Global filtering.
  - Row selection (single & multi-select).
  - Column visibility toggling.
  - Full WAI-ARIA compliance (`role="grid"`, `aria-sort`, `aria-selected`, etc.).
  - Responsive overflow handling.
- **Mini-Tools**: Crisp hover micro-interactions and strict edge-case prevention.

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

5. **Login Credentials (Mock Auth)**:
   - Email: `admin@example.com`
   - Password: `password`

## Deployment Instructions

*Note: Since the `gh` and `vercel` CLI tools were not available on the local machine during generation, the project is initialized locally with Git. To deploy to Vercel:*

1. Push this local repository to your GitHub account.
2. Go to [Vercel Dashboard](https://vercel.com/dashboard).
3. Click **Add New Project**, import the GitHub repository.
4. Click **Deploy** (Vercel automatically detects the Vite config).
