import { useSelector } from 'react-redux';

export const useDelivery = () => {
  return useSelector<Selector, Selector>((state) => state).delivery;
};
