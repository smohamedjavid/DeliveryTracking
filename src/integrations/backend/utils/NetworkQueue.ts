const genInProgressKey = (service: string, body?: any) => {
  return JSON.stringify({ service, body });
};

export const NetworkQueue = {
  addAndContinue: (service: string, body?: any) => {
    const key = genInProgressKey(service, body);
    if (global.NETWORK_REQUESTS[key]) {
      return undefined;
    }
    global.NETWORK_REQUESTS[key] = true;
    return key;
  },
  remove: (key: string) => {
    global.NETWORK_REQUESTS[key] = false;
  },
};
