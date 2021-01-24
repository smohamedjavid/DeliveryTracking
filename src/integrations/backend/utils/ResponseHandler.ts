import { showAlertMessage } from './ShowAlertMessage';

export type ErrorHandler<T> = (response: BackEndResponse<T>) => T | undefined;

export interface ResponseErrorHandler<T> {
  [key: string]: ErrorHandler<T> | undefined;
}

export interface ResponseHandlerOptions<T> {
  handleError?: ResponseErrorHandler<T>;
  noAlert?: boolean;
}

const showAlert = <T>(message: string, options?: ResponseHandlerOptions<T>) => {
  if (options === undefined || options.noAlert !== true) {
    showAlertMessage(message);
  }
  return undefined;
};

export const ResponseHandler = <T>(response: BackEndResponse<T> | string, options?: ResponseHandlerOptions<T>) => {
  if (typeof response === 'string') {
    return showAlert(response, options);
  }
  if (response) {
    return response.data ? response.data : ({} as T);
  }
  return showAlert(`ERROR`, options);
};
