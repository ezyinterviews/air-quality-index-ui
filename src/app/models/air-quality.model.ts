export interface AirQualityData {
    country: string;
    state: string;
    city: string;
    station: string;
    latitude: string;
    longitude: string;
    last_update: string;
    pollutant_id: string;
    min_value: string;
    max_value: string;
    avg_value: string;
}

export interface PaginatedResponse<T> {
  records: T[];
  total: number;
  offset: number;
  limit: number;
  count: number;
}