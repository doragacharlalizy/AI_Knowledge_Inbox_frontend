# Turium Frontend

A lightweight React + Vite frontend for managing and querying content chunks. This application provides a user-friendly interface to create and manage content, execute queries, view logs, and monitor basic statistics.
## ✨ Features

- **Content Management**: Create, view, and manage content with a detail view
- **Query Interface**: Execute queries against your content chunks
- **Logging & Monitoring**: Track query logs and basic application statistics
- **Responsive UI**: Clean, lightweight interface built with styled-components
- **State Management**: Efficient global state using Zustand
- **Type Safety**: Ready for TypeScript migration

## 🛠 Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Axios** - HTTP client for API requests
- **Zustand** - Lightweight state management
- **styled-components** - CSS-in-JS styling
- **react-router-dom** - Client-side routing


## 📦 Prerequisites

- **Node.js** >= 16 (recommended 18+)
- **npm** (or yarn/pnpm)
- Backend service running (default: `http://localhost:8000/api`)

## 🚀 Getting Started

### Clone the Repository

```bash
git clone <repo-url>
cd Turium_frontend
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Vite will print the dev server URL (typically `http://localhost:5173`). Open this in your browser.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
Turium_frontend/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   └── Card.jsx
│   ├── pages/             # Route-level page components
│   │   ├── ContentList.jsx
│   │   ├── ContentDetail.jsx
│   │   ├── CreateContent.jsx
│   │   ├── Query.jsx
│   │   └── QueryLogs.jsx
│   ├── store/             # Zustand store configuration
│   ├── styles/            # Global styles and theme
│   │   └── GlobalStyles.js
│   ├── api.js             # Axios client and API helpers
│   ├── main.jsx           # React entry point
│   └── App.jsx            # Root component
├── index.html             # HTML template
├── vite.config.js         # Vite configuration
├── eslint.config.js       # ESLint configuration
├── package.json           # Dependencies and scripts
└── README.md
```

## 🔌 API Configuration

The frontend communicates with a backend API. By default, requests are sent to:

```
http://localhost:8000/api
```

### Changing the Base API URL

#### Option 1: Direct Edit

Edit `src/api.js` and update `API_BASE_URL`:

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
```

#### Option 2: Environment Variable

Create a `.env` file in the project root:

```
VITE_API_BASE_URL=http://your-backend-url/api
```

Update `src/api.js` to use the environment variable:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
```

Restart the dev server after making changes:

```bash
npm run dev
```

## 📝 Available Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build optimized production bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |
| `npm run lint -- --fix` | Auto-fix ESLint issues |

## 💡 Common Tasks

### Setting a Custom Port

If port 5173 is already in use, specify a custom port:

```bash
npm run dev -- --port 3000
```

### Converting to TypeScript

To add TypeScript support:

1. Rename `.jsx` files to `.tsx` and `.js` to `.ts`
2. Create `tsconfig.json` using the React + Vite TypeScript template
3. Install type definitions: `npm install --save-dev @types/react @types/react-dom`
4. Update `vite.config.js` to include TypeScript support

### Fixing CORS Errors

Ensure your backend API has CORS configured to allow requests from `http://localhost:5173` (or your Vite dev server URL).

Example backend CORS configuration:
```
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

### Adding New Pages

1. Create a new component in `src/pages/`
2. Add the route to `src/App.jsx`
3. Update navigation in `src/components/Sidebar.jsx` if needed

## 🐛 Troubleshooting

### App Fails to Fetch Data

**Problem**: Error messages about failed API requests.

**Solution**: 
- Verify the backend is running at the configured API URL
- Check `src/api.js` for the correct `API_BASE_URL`
- Confirm CORS is enabled on the backend
- Use browser DevTools Network tab to inspect requests

### Port Already in Use

**Problem**: Vite can't bind to the default port.

**Solution**: 
- Vite will automatically choose another port and print it
- Or explicitly specify a port: `npm run dev -- --port 3000`

### ESLint Errors

**Problem**: `npm run lint` shows errors.

**Solution**:
```bash
npm run lint -- --fix
```

For persistent issues, review and adjust rules in `eslint.config.js`.

### Module Not Found Errors

**Problem**: Cannot find module errors when running dev server.

**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```
## 🔗 Related Repositories

- **Backend API**: [Turium Backend](https://github.com/doragacharlalizy/Turium_backend) - Django REST API service for content management and query processing
