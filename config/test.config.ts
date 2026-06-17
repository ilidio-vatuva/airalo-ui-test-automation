export const TestConfig = {
  baseUrl: process.env.BASE_URL || "https://www.airalo.com",
  timeouts: {
    navigation: 30_000,
    element: 10_000,
    overlay: 5_000,
    typing: 80,
  },
} as const;
