# GitHub Repositories Explorer

A modern web application built with React, TypeScript, Material UI, and React Query that lets you search for GitHub users and explore their repositories. The app is designed with a modular approach and incorporates smooth animations using Framer Motion for an engaging user experience.

## Overview

GitHub Repositories Explorer is a responsive, dynamic, and interactive dashboard for exploring GitHub repositories. It leverages the GitHub API to fetch user data and repository details, while implementing modern design principles and best practices:

- **Dynamic Search & Pagination:** Search GitHub users and view repositories with seamless pagination.
- **Smooth Animations:** Utilizes Framer Motion to deliver engaging transitions and interactions.
- **Modern UI:** Built with Material UI, featuring a clean, minimalistic design enhanced by custom patterns and responsive typography.
- **Responsive Design:** Optimized for all devices from mobile to desktop.
- **API Integration with Token Support:** Easily integrate with GitHub API with optional Personal Access Token for higher rate limits.

## Features

- **Responsive Layout:** Adjusts seamlessly across mobile, tablet, and desktop.
- **Real-time Search:** Find GitHub users and instantly view their public repositories.
- **Animated Expand/Collapse:** Smooth transitions when expanding user details.
- **Custom Styled Cards:** Each repository is presented with modern, patterned cards for a unique look.
- **Error Handling:** Friendly error messages to guide the user if something goes wrong.


## Demo

Check out the live demo to see the app in action:  
Demo will be available soon.

## Getting Started

### Installation


1. **Install Dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

2. **Configure Environment Variables:**

   Create a `.env` file in the root directory and add your GitHub Personal Access Token (optional):

   ```env
   REACT_APP_GITHUB_TOKEN=your_github_token_here
   ```

   *Note:* This token is used to increase the GitHub API rate limit.

### Running the Application

Start the development server:

```bash
npm start
# or
yarn start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running Tests

This project uses Jest and React Testing Library. To run tests:

```bash
npm test
# or
yarn test
```

## Technologies Used

- **React** & **TypeScript** – For building robust, type-safe UI components.
- **Material UI (MUI)** – Provides a modern design system with responsive components.
- **React Query** – Manages data fetching and caching efficiently.
- **Framer Motion** – Adds smooth animations and transitions for a dynamic user experience.
- **Jest** & **React Testing Library** – For comprehensive testing of components and interactions.

## Credits & Inspiration

- **Design Inspiration:** Modern dashboards and UI systems that emphasize clarity, responsiveness, and smooth interactions.
- **API Data:** Powered by GitHub API.
- **Animation Assets:** Animations inspired by practical usage of Framer Motion and Material UI transitions.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
