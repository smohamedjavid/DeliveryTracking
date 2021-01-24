import { cloneDeep } from 'lodash';

import { DELIVERY_ACTION } from '../action-types';

const INITIAL: DeliveryReducer = {};

export const deliveryReducer = (state: DeliveryReducer | undefined, action: ReduxAction<DeliveryReducer>) => {
  const next = cloneDeep(state || INITIAL);
  switch (action.type) {
    case DELIVERY_ACTION.RESET:
      return INITIAL;
  }
  return next;
};
