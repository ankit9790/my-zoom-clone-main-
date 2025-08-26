import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { BrowserRouter } from "react-router-dom";

// Entry point of the React application
// ReactDOM.render mounts the React app into the DOM element with id 'root'
// The app is wrapped with Redux Provider to provide the store to all components
// BrowserRouter enables client-side routing for the app
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
