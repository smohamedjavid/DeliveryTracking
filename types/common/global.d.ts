declare module NodeJS {
  interface Global {
    ENV: AppEnvironment;
    NETWORK_REQUESTS: AppNetworkRequests;
    ROUTES: AppRoutes;
  }
}
