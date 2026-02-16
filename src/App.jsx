// src/App.jsx
// FIXED - BrowserRouter wrapper added

import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Theme & Styles
import { theme, GlobalStyles } from "./styles/GlobalStyles";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ContentList from "./pages/ContentList";
import CreateContent from "./pages/CreateContent";
import ContentDetail from "./pages/ContentDetail";
import Query from "./pages/Query";
import QueryLogs from "./pages/QueryLogs";

// Pages
// import Home from "./pages/Home";
// import Dashboard from "./pages/Dashboard";
// import ContentList from "./pages/ContentList";
// import ContentDetail from "./pages/ContentDetail";
// import CreateContent from "./pages/CreateContent";
// import Query from "./pages/Query";
// import QueryLogs from "./pages/QueryLogs";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles>
        <BrowserRouter>
          <Routes>
            {/* Home Redirect */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* Main Layout Routes */}
            <Route path="/" element={<Home />}>
              {/* Dashboard */}
              <Route path="dashboard" element={<Dashboard />} />

              {/* Content Management */}
              <Route path="content" element={<ContentList />} />
              <Route path="content/create" element={<CreateContent />} />
              <Route path="content/:id" element={<ContentDetail />} />

              {/* RAG Query */}
              <Route path="query" element={<Query />} />
              <Route path="query-logs" element={<QueryLogs />} />
            </Route>

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>

        {/* Toast Notifications */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </GlobalStyles>
    </ThemeProvider>
  );
}

export default App;