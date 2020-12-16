import {FAKE_API_URL} from "../../../../server/constants";

interface RequestConfig extends Omit<RequestInit, "body"> {
  token?: string;
  data?: unknown;
}

async function client<T extends unknown>(
  endpoint: string,
  {data, token, headers: customHeaders, ...customConfig}: RequestConfig = {},
): Promise<T> {
  const config: RequestInit = {
    method: data ? "POST" : "GET",
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      ...(token ? {Authorization: `Bearer ${token}`} : {}),
      ...(data ? {"Content-Type": "application/json"} : {}),
      ...customHeaders,
    },
    ...customConfig,
  };

  return window.fetch(`${FAKE_API_URL}${endpoint}`, config).then(async response => {
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
}

export {client};
