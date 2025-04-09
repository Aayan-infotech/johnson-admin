import React, { createContext, useState } from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Navbar, SideBar } from "./scenes";
import { Outlet } from "react-router-dom";
import ToastNotification from "./Toast";
// In App.jsx or index.jsx
import 'react-quill/dist/quill.snow.css';


export const ToggledContext = createContext(null);

function App() {
  const [theme, colorMode] = useMode();
  const [toggled, setToggled] = useState(false);
  const values = { toggled, setToggled };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToggledContext.Provider value={values}>
          <ToastNotification />
          <Box
            sx={{
              display: "flex",
              height: "100vh",
              width: "100vw",
              overflowX: "hidden",
            }}
          >
            <SideBar className="sidebar-container" />
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                height: "100%",
                width: "100%",
                overflowX: "hidden",
              }}
            >
              <Navbar />
              <Box
                sx={{
                  overflowY: "auto",
                  flex: 1,
                  width: "100%",
                  overflowX: "hidden",
                }}
              >
                <Outlet />
              </Box>
            </Box>
          </Box>
        </ToggledContext.Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
