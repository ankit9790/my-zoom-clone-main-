/**
 * Utility functions to generate breadcrumb navigation arrays for different pages.
 * Each function returns an array of breadcrumb objects with text and optional navigation handlers.
 */

export const getDashboardBreadCrumbs = (navigate) => [
  {
    text: "Dashboard", // Root breadcrumb for dashboard page
  },
];

export const getCreateMeetingBreadCrumbs = (navigate) => [
  {
    text: "Dashboard", // Link to dashboard
    href: "#",
    onClick: () => {
      navigate("/"); // Navigate to dashboard on click
    },
  },
  {
    text: "Create Meeting", // Current page breadcrumb
  },
];

export const getOneOnOneMeetingBreadCrumbs = (navigate) => [
  {
    text: "Dashboard", // Link to dashboard
    href: "#",
    onClick: () => {
      navigate("/"); // Navigate to dashboard on click
    },
  },
  {
    text: "Create Meeting", // Link to create meeting page
    href: "#",
    onClick: () => {
      navigate("/create"); // Navigate to create meeting on click
    },
  },
  {
    text: "Create 1 on 1 Meeting", // Current page breadcrumb
  },
];

export const getVideoConferenceBreadCrumbs = (navigate) => [
  {
    text: "Dashboard", // Link to dashboard
    href: "#",
    onClick: () => {
      navigate("/"); // Navigate to dashboard on click
    },
  },
  {
    text: "Create Meeting", // Link to create meeting page
    href: "#",
    onClick: () => {
      navigate("/create"); // Navigate to create meeting on click
    },
  },
  {
    text: "Create Video Conference", // Current page breadcrumb
  },
];

export const getMyMeetingsBreadCrumbs = (navigate) => [
  {
    text: "Dashboard", // Link to dashboard
    href: "#",
    onClick: () => {
      navigate("/"); // Navigate to dashboard on click
    },
  },
  {
    text: "My Meetings", // Current page breadcrumb
  },
];

export const getMeetingsBreadCrumbs = (navigate) => [
  {
    text: "Dashboard", // Link to dashboard
    href: "#",
    onClick: () => {
      navigate("/"); // Navigate to dashboard on click
    },
  },
  {
    text: "Meetings", // Current page breadcrumb
  },
];
