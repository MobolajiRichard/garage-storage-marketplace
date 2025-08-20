export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: "/auth/signup",
    CHECK_EMAIL: "/auth/check-email",
    LOGIN: "/auth/login",
    CHANGE_PASSWORD:"/auth/change-password"
  },
  USER: {
    ME: "/user/me",
    BASE: "/user",
  },
  FILE: {
    UPLOAD: "/file/upload",
  },
  SPACE: {
    CREATE: "/spaces",
    ME: "/spaces/me",
    REVIEW: "/spaces/:id/review",
    BOOK: "/spaces/:id/book",
  },
  BOOKINGS: {
    BASE: "/booking",
    ME: "/booking/me",
  },
  NOTIFICATIONS: {
    ME: "/notification/me",
  },
};
