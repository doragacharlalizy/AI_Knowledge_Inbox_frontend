// src/App.jsx
// FIXED - BrowserRouter wrapper added

import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { theme, GlobalStyles } from "./styles/GlobalStyles";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ContentList from "./pages/ContentList";
import CreateContent from "./pages/CreateContent";
import ContentDetail from "./pages/ContentDetail";
import Query from "./pages/Query";
import QueryLogs from "./pages/QueryLogs";


function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            <Route path="/" element={<Home />}>
              <Route path="dashboard" element={<Dashboard />} />

              <Route path="content" element={<ContentList />} />
              <Route path="content/create" element={<CreateContent />} />
              <Route path="content/:id" element={<ContentDetail />} />

              <Route path="query" element={<Query />} />
              <Route path="query-logs" element={<QueryLogs />} />
            </Route>

            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>

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