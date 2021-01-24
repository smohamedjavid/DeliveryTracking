declare interface GetDeliveryDetailsRequest {
  id: number;
}

declare interface TrackingItem {
  Latitude: number;
  longitude: number;
  delivery_id: number;
  battery_level: number;
  timestamp: number;
}

declare interface UpdateLocationRequest {
  driver_id: number;
  tracking_data: TrackingItem[];
}
