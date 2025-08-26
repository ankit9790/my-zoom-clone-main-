import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/AuthSlice";
import { meetingsSlice } from "./slices/MeetingSlice";

// Configure the Redux store with auth and meetings slices
export const store = configureStore({
  reducer: {
    // Authentication related state and reducers
    auth: authSlice.reducer,
    // Meetings related state and reducers
    meetings: meetingsSlice.reducer,
  },
});
