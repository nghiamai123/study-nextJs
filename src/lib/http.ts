type customOptions = RequestInit & {
  baseUrl?: string;
//   headers?: string;
};

class HttpError extends Error {
  status: number;
  payload: [key: string];
  constructor({ status, payload }: { status: number; payload?: any }) {
    super("Please check your account and try again");
    this.status = status;
    this.payload = payload;
  }
}

const request = async <Response>(
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  url: string,
  options?: customOptions | undefined
 ) => {
  const body = options?.body ? JSON.stringify(options.body) : undefined;
  const baseHeaders = {
    "Content-Type": "application/json",
  };

  const baseUrl =
    options?.baseUrl === undefined
      ? process.env.NEXT_PUBLIC_URL
      : options?.baseUrl;

  const fullUrl = url.startsWith("/")
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;

  const response = await fetch(fullUrl, {
    method,
    headers: {
      ...baseHeaders,
      ...(options?.headers || {}),
    },
    body,
  });

  const payload: Response = await response.json();

  if (!response.ok) {
    throw new HttpError({ status: response.status});
  }

  return { status: response.status, payload};
};

const http = {
  get<Response>(
    url: string,
    options?: Omit<customOptions, "body"> | undefined
  ) {
    return request<Response>("GET", url, options);
  },
  post<Response>(
    url: string, body: any, 
    options?: customOptions | undefined
  ) {
    return request<Response>("POST", url, { ...options, body });
  },
  put<Response>(
    url: string, body: any, 
    options?: customOptions | undefined
  ) {
    return request<Response>("PUT", url, { ...options, body });
  },
  delete<Response>(
    url: string, 
    body: any, 
    options?: customOptions | undefined
  ) {
    return request<Response>("DELETE", url, { ...options, body});
  },
};

export default http;