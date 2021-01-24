interface DeliveryItem {
  id: number;
  address: string;
  latitude: number;
  longitude: number;
  customer_name: string;
}

declare type GetDeliveriesListResponse = DeliveryItem[];

declare interface GetDeliveryDetailsResponse {
  id: number;
  address: string;
  latitude: number;
  longitude: number;
  customer_name: string;
  requires_signature: boolean;
  special_instructions: string;
}

declare interface UpdateLocationResponse {
  status: string;
}
