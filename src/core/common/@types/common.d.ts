interface FetchWithCorsParams<Body> {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: Body;
  headers?: Record<string, string>;
  params?: Record<string, string>;
}

interface CorsResponse<Resp> {
  contents: Resp;
  status: {
    url: string;
    content_type: string;
    http_code: number;
    response_time: number;
  };
}
