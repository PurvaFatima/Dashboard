# React Analytics Dashboard

A modern, responsive dashboard built with **React**, **Vite**, **Tailwind CSS**, and **shadcn/ui**. This dashboard provides **authentication, navigation, customizable sidebar, and interactive charts** for displaying multiple financial and analytical metrics.

---

## ✨ Features

* **Authentication**: Secure login with Email/Password or Google using Firebase. Protected routes for authorized users.
* **Customizable Sidebar**:

  * Collapsible, offcanvas, and icon-only variants
  * Keyboard shortcut support (`Ctrl+B` / `Cmd+B`)
  * Mobile-friendly sheet modal
  * Supports groups, actions, badges, skeleton loading, and tooltips
* **Navigation**: React Router DOM-based routing with Dashboard, Blog, Settings, and Logout options.
* **Dashboard**:

  * Metric cards (Revenue, Active Users, Tasks, Conversion Rate)
  * Multiple charts (Bar, Line, Pie, Scatter, Sales)
  * Powered by custom hooks (`useMetricsData`, `useChartData`)
* **Responsive Design**: Fully mobile-friendly layout using Tailwind utilities.
* **Data Fetching**: Clean architecture with hooks and services for data retrieval.
* **Blog**: Example page for articles or announcements.
* **Settings**: Manage user preferences and account options.
* **Future Planned Features**:

  * Full API integration (single dataset powering all metrics and charts, similar to Power BI)
  * Advanced analytics (filters, date ranges, drill-downs)
  * Export options (CSV, PDF, Excel)
  * Notifications panel
  * Dark/Light mode toggle

---

## 🛠️ Technologies Used

* React 19
* Vite 7.1.3
* Tailwind CSS v4
* React Router DOM
* Firebase (Authentication)
* Zod & React Hook Form (Form validation)
* Lucide React (Icons)
* shadcn/ui (UI components)
* Recharts (Charts)
* Radix UI primitives

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v18+ recommended)
* npm or yarn

### Installation

```bash
git clone https://github.com/PurvaFatima/Dashboard.git
cd Dashboard
npm install
# or
yarn install
```

### Firebase Setup

* Create a Firebase project
* Enable Email/Password and Google authentication
* Add Firebase config in `src/firebase.js`

### Running the App

```bash
npm run dev
# or
yarn dev
```

Default: [http://localhost:5173](http://localhost:5173)

### Building for Production

```bash
npm run build
npm run preview
```

---

## 📂 Project Structure

```
src/
 ├── assets/         # Images, static assets
 ├── components/     # Reusable UI components (Cards, Sidebar, Header, Footer, Charts)
 ├── hooks/          # Custom React hooks (data fetching, metrics, charts)
 ├── layout/         # Layout components (MainContent, Sidebar, Header)
 ├── pages/          # Pages (Dashboard, Blog, Settings, Login)
 ├── services/       # API and data services
 ├── App.jsx         # Main app component
 ├── main.jsx        # Entry point
 └── index.css       # Global styles & Tailwind imports
```

Key Components:

* **Sidebar**: Context-based state, multiple variants, responsive
* **Header**: Title, subtitle, and action buttons
* **Cards**: Metric displays with hover effects
* **Charts**: Bar, Line, Pie, Scatter (powered by Recharts)
* **Footer**: Minimal copyright info

---

## 🎨 Customization

* **Styling**: Tailwind classes (`index.css`, `App.css`)
* **Charts**: Extend `Chart.jsx` with new chart types
* **Sidebar**: Adjust variants, props, and context (`useSidebar`)
* **Pages**: Add routes under `src/pages`
* **Theme**: Extend Tailwind config for custom colors

---

## 📦 Deployment

### Static Hosting

1. Build the project:

   ```bash
   npm run build
   ```
2. Deploy the `dist/` folder to:

   * Vercel
   * Netlify
   * GitHub Pages
   * Firebase Hosting
   * AWS S3

### Docker Deployment

```dockerfile
FROM node:18 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
```

```bash
docker build -t react-dashboard .
docker run -p 8080:80 react-dashboard
```

---

## 🌐 Browser Support

* Chrome, Firefox, Safari, Edge (latest)
* Mobile browsers (iOS Safari, Chrome for Android)

---

## ♿ Accessibility

* Semantic HTML
* Keyboard navigation support
* ARIA attributes
* High-contrast color scheme

---

## 📌 Roadmap

* ✅ Authentication (Firebase)
* ✅ Sidebar with variants
* ✅ Metrics & Charts
* ✅ Blog and Settings pages
* 🚧 API integration (single dataset powering charts)
* 🚧 Export functionality (CSV, PDF, Excel)
* 🚧 Dark/Light theme toggle
* 🚧 Notifications system

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Create a Pull Request

---

## 📜 License

This project is open source and licensed under the **MIT License**.

---

## 👤 Author

**Purva Fatima**
