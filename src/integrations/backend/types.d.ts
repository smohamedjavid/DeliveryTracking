declare interface BackEndResponse<DataType, RequestDataType = object> {
  data?: DataType;
  request: RequestDataType<RequestDataType>;
}

declare interface BackEndRequest<DataType = object> {
  service: string;
  body: DataType;
}
