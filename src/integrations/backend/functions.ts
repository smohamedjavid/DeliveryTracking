import axios, { AxiosResponse } from 'axios';

export const AxiosInstance = axios.create({
  baseURL: global.ENV.BACKEND_URL_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  validateStatus: () => true,
  withCredentials: true,
});

export const getFinalRequestDetails = async (body?: object) => {
  const headers = {};
  const details = { body, headers };
  return details;
};

const Base = async <T>(request: Promise<AxiosResponse<T>>, service: string, body?: object) => {
  try {
    const response = await request;
    if (`${response.data}`.toLowerCase().includes('<!doctype html')) {
      return 'Sorry! The server is down!' as string;
    }
    return { data: response.data, request: { service, body } };
  } catch (error) {}
  return 'Network Request: An Error Occurred!' as string;
};

const Get = async <T>(service: string, body?: object) => {
  const details = await getFinalRequestDetails(body);
  const response = AxiosInstance.get<BackEndResponse<T>>(service, { data: details.body, headers: details.headers });
  return Base(response, service, body);
};

const Post = async <T>(service: string, body?: object) => {
  const details = await getFinalRequestDetails(body);
  const response = AxiosInstance.post<BackEndResponse<T>>(service, details.body, { headers: details.headers });
  return Base(response, service, body);
};

export const BackEndRequest = {
  Get,
  Post,
};
