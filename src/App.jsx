import React, { Suspense, useState, createContext, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import OverlaySpinner from "./utils/Spinner";
import Dashboard from "./Dashboard";

const AdminLogin = React.lazy(() => import("./Pages/Login"));
const ChangePassword = React.lazy(() => import("./Pages/ChangePassword"));
const ManageUsers = React.lazy(() => import("./ProtectedPages/ManageUsers"));

export const ColorModeContext = createContext();

function App() {
  const [mode, setMode] = useState("light");
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
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
        <BrowserRouter>
          <Suspense fallback={<OverlaySpinner />}>
            <Routes>
              <Route  path="/login" element={<AdminLogin setIsAuthenticated={setIsAuthenticated} />}/>
              <Route  path="/ChangePassword" element={<ChangePassword />}/>
              <Route
                path="/"
                element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
              >
                <Route
                  path="/manage-users"
                  element={<ManageUsers />}
                />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
