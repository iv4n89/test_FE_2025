import axios from 'axios';

export async function fetchWithCors<Body, Resp>({
  url,
  method,
  body,
  headers,
  params,
}: FetchWithCorsParams<Body>) {
  try {
    const finalUrl = `${import.meta.env.VITE_CORS_PROXY_URL}${encodeURIComponent(url)}`;
    const response = await axios.request<CorsResponse<Resp>>({
      method,
      url: finalUrl,
      params,
      data: body,
      headers,
    });

    if (response.status >= 200 && response.status < 300) {
      return response.data.contents;
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    console.error('%c[fetchWithCors] Error:', 'color: red;', error);
  }
}
