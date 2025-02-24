import { toast } from "react-hot-toast";

type API = {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: object;
};

export const api = async ({ url, method, body }: API) => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await fetch(url, {
      method: method,
      body: JSON.stringify(body),
    });

    const data = await response.json();
    toast.dismiss();
    toast.success("Successfully created!", { removeDelay: 500 });
    return data;
  } catch (err) {
    console.log(err);
    toast.dismiss(toastId);
    const error: { message: string; status: number } = {
      message: "Internal Server Error",
      status: 500,
    };
    throw error;
  }
};
