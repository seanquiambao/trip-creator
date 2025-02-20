type API = {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: object;
};

export const api = async ({ url, method, body }: API) => {
  try {
    const response = await fetch(url, {
      method: method,
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return data;
  } catch (err) {
    const error: { message: string; status: number } = {
      message: "Internal Server Error",
      status: 500,
    };
    throw error;
  }
};
