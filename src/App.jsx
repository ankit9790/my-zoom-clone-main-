import {
  EuiGlobalToastList,
  EuiProvider,
  EuiThemeProvider,
} from "@elastic/eui";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAppSelector } from "./app/hooks";
import { setToasts } from "./app/slices/MeetingSlice";
import EnvTest from "./components/EnvTest";
import ThemeSelector from "./components/ThemeSelector";
import CreateMeeting from "./pages/CreateMeeting";
import Dashboard from "./pages/Dashboard";
import JoinMeeting from "./pages/JoinMeeting";
import Login from "./pages/Login";
import Meeting from "./pages/Meeting";
import MyMeetings from "./pages/MyMeetings";
import OneOnOneMeeting from "./pages/OneOnOneMeeting";
import VideoConference from "./pages/VideoConference";

// Component to protect routes that require authentication
function RequireAuth({ children }) {
  // Get user info from Redux store
  const user = useAppSelector((zoomApp) => zoomApp.auth.userInfo);
  const location = useLocation();

  // If user is not authenticated, redirect to login page
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the child components
  return children;
}

export default function App() {
  const dispatch = useDispatch();
  // Get dark theme flag from Redux store
  const isDarkTheme = useAppSelector((zoomApp) => zoomApp.auth.isDarkTheme);
  // State to track if initial effect has run
  const [isInitialEffect, setIsInitialEffect] = useState(true);
  // Get toast notifications from Redux store
  const toasts = useAppSelector((zoom) => zoom.meetings.toasts);

  // Function to remove a toast notification
  const removeToast = (removedToast) => {
    dispatch(
      setToasts(
        toasts.filter((toast) => toast.id !== removedToast.id)
      )
    );
  };

  // State to manage current theme mode
  const [theme, setTheme] = useState("light");

  // On component mount, load theme from localStorage or set default
  useEffect(() => {
    const theme = localStorage.getItem("zoom-theme");
    if (theme) {
      setTheme(theme);
    } else {
      localStorage.setItem("zoom-theme", "light");
    }
  }, []);

  // Reload page when theme changes, except on initial load
  useEffect(() => {
    if (isInitialEffect) setIsInitialEffect(false);
    else {
      window.location.reload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkTheme]);

  // Theme color overrides for Elastic UI components
  const overrides = {
    colors: {
      LIGHT: { primary: "#0b5cff" },
      DARK: { primary: "#0b5cff" },
    },
  };

  return (
    // ThemeSelector provides theme context to children
    <ThemeSelector>
      {/* EuiProvider applies the selected color mode */}
      <EuiProvider colorMode={theme}>
        {/* EuiThemeProvider applies theme overrides */}
        <EuiThemeProvider modify={overrides}>
          {/* Define application routes */}
          <Routes>
            {/* Public login route */}
            <Route path="/login" element={<Login />} />
            {/* Protected routes wrapped with RequireAuth */}
            <Route
              path="/"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route
              path="/create"
              element={
                <RequireAuth>
                  <CreateMeeting />
                </RequireAuth>
              }
            />
            <Route
              path="/create1on1"
              element={
                <RequireAuth>
                  <OneOnOneMeeting />
                </RequireAuth>
              }
            />
            <Route
              path="/videoconference"
              element={
                <RequireAuth>
                  <VideoConference />
                </RequireAuth>
              }
            />
            <Route
              path="/mymeetings"
              element={
                <RequireAuth>
                  <MyMeetings />
                </RequireAuth>
              }
            />
            <Route
              path="/join/:id"
              element={
                <RequireAuth>
                  <JoinMeeting />
                </RequireAuth>
              }
            />
            <Route
              path="/meetings"
              element={
                <RequireAuth>
                  <Meeting />
                </RequireAuth>
              }
            />
            {/* Test route for environment variables */}
            <Route
              path="/envtest"
              element={
                <RequireAuth>
                  <EnvTest />
                </RequireAuth>
              }
            />
            {/* Redirect unknown routes to login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
          {/* Toast notifications list */}
          <EuiGlobalToastList
            toasts={toasts}
            dismissToast={removeToast}
            toastLifeTimeMs={4000}
          />
        </EuiThemeProvider>
      </EuiProvider>
    </ThemeSelector>
  );
}
