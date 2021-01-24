import { BackEndRequest } from './functions';
import { NetworkQueue, ResponseHandler, ResponseHandlerOptions } from './utils';

export const BackendPost = async <T>(service: string, body?: object, options?: ResponseHandlerOptions<T>) => {
  const key = NetworkQueue.addAndContinue(service, body);
  if (!key) {
    return;
  }
  const response = await BackEndRequest.Post<T>(service, body);
  const data = ResponseHandler(response, options);
  NetworkQueue.remove(key);
  return data;
};
