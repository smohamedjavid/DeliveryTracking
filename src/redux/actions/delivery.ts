import { Alert } from 'react-native';

import { BACKEND_SERVICES, BackendGet, BackendPost } from '../../integrations';

export interface GetDeliveriesListProps {
  handleError?: (res: BackEndResponse<GetDeliveriesListResponse>) => undefined | GetDeliveriesListResponse;
  handleSuccess: (res: BackEndResponse<GetDeliveriesListResponse>) => void;
}

const getDeliveriesList = ({ handleError, handleSuccess }: GetDeliveriesListProps) => {
  return async () => {
    const service = BACKEND_SERVICES.DELIVERIES;
    const res = await BackendGet<GetDeliveriesListResponse>(service, undefined, {
      handleError: {
        ALL: handleError
          ? handleError
          : () => {
              Alert.alert(`ERROR`, `${service}`);
              return undefined;
            },
      },
    });

    if (res !== undefined) {
      handleSuccess(res);
    }
  };
};

export interface GetDeliveryDetailsProps {
  payload: GetDeliveryDetailsRequest;
  handleError?: (res: BackEndResponse<GetDeliveryDetailsResponse>) => undefined | GetDeliveryDetailsResponse;
  handleSuccess: (res: BackEndResponse<GetDeliveryDetailsResponse>) => void;
}

const getDeliveryDetails = ({ payload, handleError, handleSuccess }: GetDeliveryDetailsProps) => {
  return async () => {
    const service = BACKEND_SERVICES.DELIVERY_DETAILS + `/${payload.id}`;
    const res = await BackendGet<GetDeliveryDetailsResponse>(service, undefined, {
      handleError: {
        ALL: handleError
          ? handleError
          : () => {
              Alert.alert(`ERROR`, `${service}`);
              return undefined;
            },
      },
    });

    if (res !== undefined) {
      handleSuccess(res);
    }
  };
};

export interface UpdateLocationProps {
  payload: UpdateLocationRequest;
  handleError?: (res: BackEndResponse<UpdateLocationResponse>) => undefined | UpdateLocationResponse;
  handleSuccess: (res: BackEndResponse<UpdateLocationResponse>) => void;
}

const updateLocation = ({ payload, handleError, handleSuccess }: UpdateLocationProps) => {
  return async () => {
    const service = BACKEND_SERVICES.UPDATE_LOCATION;
    const res = await BackendPost<UpdateLocationResponse>(service, payload, {
      handleError: {
        ALL: handleError
          ? handleError
          : () => {
              Alert.alert(`ERROR`, `${service}`);
              return undefined;
            },
      },
    });

    if (res !== undefined) {
      handleSuccess(res);
    }
  };
};

export const DeliveryActions = {
  getDeliveriesList,
  getDeliveryDetails,
  updateLocation,
};
