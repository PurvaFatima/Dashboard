# My Dashboard

A modern, responsive dashboard application built with React and Vite. This project features a clean, professional design with real-time data visualization capabilities.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Features](#features)
- [File Documentation](#file-documentation)
- [Installation](#installation)
- [Usage](#usage)
- [Customization](#customization)
- [Deployment](#deployment)

## Technologies Used

### Core Technologies
- **React 18+** - JavaScript library for building user interfaces
- **Vite** - Next generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Declarative charting library built on D3.js

### Development Tools
- **ESLint** - JavaScript linting utility
- **PropTypes** - Runtime type checking for React props
- **npm** - Package manager

## Project Structure

```
my-dashboard/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── Avatar.png
│   ├── hooks/
│   ├── layout/
│   │   ├── Card.jsx
│   │   ├── Chart.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── MainContent.jsx
│   │   └── Sidebar.jsx
│   ├── services/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── README.md
├── vite.config.js
└── eslint.config.js
```

## Features

1. **Responsive Design** - Works on mobile, tablet, and desktop devices
2. **Component-based Architecture** - Reusable, maintainable components
3. **Data Visualization** - Multiple chart types (bar, line, pie, scatter)
4. **Modern UI** - Clean, professional interface with Tailwind CSS
5. **Performance Optimized** - Fast loading with Vite
6. **Accessibility** - Proper semantic HTML and ARIA attributes

## File Documentation

### Root Files

#### `index.html`
- Main HTML template file
- Entry point for the application
- Contains root div where React app is mounted
- Includes viewport meta tag for responsive design

#### `package.json`
- Project metadata and dependencies
- Scripts for development, building, and linting
- Dependencies: React, React DOM, Tailwind CSS, Recharts
- Dev Dependencies: ESLint, Vite plugins

#### `vite.config.js`
- Vite configuration file
- Configures build settings and plugins
- Includes React plugin for JSX transformation

#### `eslint.config.js`
- ESLint configuration
- Code quality and formatting rules
- React-specific linting rules

#### `.gitignore`
- Specifies files and directories to ignore in Git
- Excludes node_modules, build files, and environment files

### src/ Directory

#### `main.jsx`
- Entry point for the React application
- Renders the App component within React StrictMode
- Mounts the application to the root DOM element

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

#### `App.jsx`
- Main application component
- Orchestrates the overall layout and data flow
- Contains sample data for metrics and charts
- Renders all layout components in proper structure

**Key Features:**
- Sidebar navigation
- Header with title and actions
- Metric cards grid showing key performance indicators
- Charts grid with different visualization types
- Footer with copyright information

**Sample Data Structure:**
- Metrics data with title, value, and change percentage
- Chart data for different visualization types
- Navigation items for sidebar

#### `App.css`
- Custom styles for the application
- Overrides for default styles
- Responsive design adjustments

#### `index.css`
- Global styles and Tailwind CSS imports
- Base styles for typography and elements
- Color scheme definitions
- Responsive design media queries

### src/assets/ Directory

#### `Avatar.png`
- Placeholder image for user avatars
- Used in UI components where user images are needed

### src/layout/ Directory

#### `Sidebar.jsx`
- Navigation sidebar component
- Fixed position on the left side of the screen
- Contains navigation links and branding
- Responsive design that adapts to different screen sizes

**Props:**
- `navigationItems`: Array of navigation items with label and href

**Features:**
- Dark theme design
- Hover effects on navigation items
- Footer with copyright information
- Responsive behavior with fixed positioning

#### `Header.jsx`
- Top header component with title and actions
- Flexible layout that adapts to screen size
- Contains primary and secondary action buttons

**Props:**
- `title`: Main header title
- `subtitle`: Secondary text below title
- `actions`: Array of action buttons with label, onClick, and variant

**Features:**
- Responsive flex layout
- Action button variants (primary, secondary, default)
- Proper spacing and typography

#### `Card.jsx`
- Reusable card component for content containers
- Consistent styling with shadows and rounded corners
- Supports title, content, and footer sections

**Props:**
- `title`: Card title (optional)
- `children`: Card content
- `footer`: Card footer content (optional)
- `className`: Additional CSS classes
- `onClick`: Click handler (makes card interactive)

**Features:**
- Hover effects with shadow transitions
- Consistent padding and spacing
- Optional title and footer sections
- Interactive state when onClick is provided

#### `MainContent.jsx`
- Main content area component
- Manages layout spacing and background
- Responsive margin adjustments for sidebar

**Props:**
- `children`: Content to display
- `className`: Additional CSS classes

**Features:**
- Background color and padding
- Responsive left margin to accommodate sidebar
- Smooth transition animations

#### `Chart.jsx`
- Generic chart component supporting multiple chart types
- Built on Recharts library
- Responsive design with consistent styling

**Props:**
- `type`: Chart type ('bar', 'line', 'pie', 'scatter')
- `data`: Chart data array
- `dataKeyX`: X-axis data key
- `dataKeyY`: Y-axis data key
- `title`: Chart title (optional)
- `height`: Chart height in pixels
- `className`: Additional CSS classes

**Supported Chart Types:**
1. **Bar Chart**: Vertical bar visualization
2. **Line Chart**: Line graph with data points
3. **Pie Chart**: Circular chart divided into slices
4. **Scatter Plot**: Data points on X-Y coordinates

**Features:**
- Consistent color palette
- Responsive container
- Custom tooltips and legends
- Proper axis labeling
- Interactive hover states

#### `Footer.jsx`
- Minimal footer component
- Fixed at the bottom of the page
- Contains copyright information

**Features:**
- Clean, minimal design
- Proper padding and text alignment
- Subtle border separator

### src/hooks/ Directory
- Currently empty, reserved for custom React hooks
- Can be used for state management and data fetching

### src/services/ Directory
- Currently empty, reserved for API services
- Can be used for data fetching and business logic

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd my-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

## Usage

### Development
- Run `npm run dev` to start the development server
- Open http://localhost:5173 in your browser
- Edit files in the `src/` directory to make changes
- The page will automatically reload on file changes

### Building
- Run `npm run build` to create a production build
- Output will be in the `dist/` directory
- Run `npm run preview` to preview the production build locally

### Linting
- Run `npm run lint` to check for code quality issues
- Run `npm run lint -- --fix` to automatically fix fixable issues

## Customization

### Styling
- Modify `src/index.css` for global styles
- Modify `src/App.css` for component-specific styles
- Use Tailwind CSS classes directly in components
- Customize color palette in `tailwind.config.js` (if present)

### Content
- Update navigation items in `App.jsx`
- Modify sample data in `App.jsx` for metrics and charts
- Customize component props in `App.jsx`

### Layout
- Adjust grid layouts in `App.jsx`
- Modify component styling in individual layout files
- Update responsive breakpoints as needed

### Charts
- Add new chart types by extending `Chart.jsx`
- Modify chart styling and configuration in `Chart.jsx`
- Update sample data in `App.jsx`

## Deployment

### Static Hosting
1. Build the project: `npm run build`
2. Deploy the `dist/` directory to any static hosting service:
   - Vercel
   - Netlify
   - GitHub Pages
   - Firebase Hosting
   - AWS S3

### Docker Deployment
1. Create a Dockerfile:
   ```dockerfile
   FROM node:16 as build
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build
   
   FROM nginx:alpine
   COPY --from=build /app/dist /usr/share/nginx/html
   ```

2. Build and run:
   ```bash
   docker build -t my-dashboard .
   docker run -p 8080:80 my-dashboard
   ```

## Browser Support

- Latest Chrome, Firefox, Safari, Edge
- Mobile browsers (iOS Safari, Chrome for Android)
- Modern browsers with ES6+ support

## Performance

- Optimized with Vite for fast development and build times
- Tree-shaking for smaller bundle sizes
- Code splitting for efficient loading
- Lazy loading for non-critical resources

## Accessibility

- Semantic HTML structure
- Proper heading hierarchy
- ARIA attributes where needed
- Keyboard navigation support
- Color contrast compliance

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Commit your changes
6. Push to the branch
7. Create a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue on the GitHub repository or contact the project maintainers.
