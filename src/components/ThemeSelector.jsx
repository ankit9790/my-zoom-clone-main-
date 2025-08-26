import React, { Suspense, useEffect, useState } from "react";

// Lazy load light and dark theme components for performance optimization
const LightTheme = React.lazy(() => import("./Themes/LightTheme"));
const DarkTheme = React.lazy(() => import("./Themes/DarkTheme"));

// ThemeSelector component wraps children with the selected theme
export default function ThemeSelector({ children }) {
  // State to hold current theme, default to light
  const [theme, setTheme] = useState("light");

  // On mount, read theme preference from localStorage and set it
  useEffect(() => {
    const theme = localStorage.getItem("zoom-theme");
    if (theme) {
      setTheme(theme);
    }
  }, []);

  return (
    <>
      {/* Suspense fallback while theme component is loading */}
      <Suspense fallback={<></>}>
        {/* Conditionally render dark or light theme based on state */}
        {theme === "dark" ? <DarkTheme /> : <LightTheme />}
      </Suspense>
      {/* Render child components inside the theme */}
      {children}
    </>
  );
}
