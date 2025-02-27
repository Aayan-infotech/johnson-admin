import React, { Suspense, useState, createContext, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import OverlaySpinner from "./utils/Spinner";
import Dashboard from "./Dashboard";
import Home from "./components/Home";
// import Main from "./components/Main";


const AdminLogin = React.lazy(() => import("./Pages/Login"));
const ChangePassword = React.lazy(() => import("./Pages/ChangePassword"));
// const ManageUsers = React.lazy(() => import("./ProtectedPages/User/ManageUsers"));
// const Category = React.lazy(() => import("./ProtectedPages/Category/Category"));

export const ColorModeContext = createContext();

function App() {
  const [mode, setMode] = useState("light");
  const [open, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  // const location = useLocation(); // Now this will work

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true); 
    }
  }, []);

  const colorMode = {
    toggleColorMode: () => {
      setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    },
  };

  const theme = createTheme({
    palette: {
      mode: mode,
      primary: {
        main: mode === "light" ? "#1976d2" : "#90caf9",
      },
      background: {
        default: mode === "light" ? "#f5f5f5" : "#121212",
        paper: mode === "light" ? "#ffffff" : "#1e1e1e",
      },
    },
  });

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}> 
        <CssBaseline />
        <Suspense fallback={<OverlaySpinner />}>
        <Routes>
          <Route path="/" element={<AdminLogin setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/ChangePassword" element={<ChangePassword />} />
          <Route
            path="/"
            element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
          />
          {isAuthenticated && (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
            </>
          )}
        </Routes>
        </Suspense>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}


export default App;



