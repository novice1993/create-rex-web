export const headers = {
  "Content-Type": "application/json"
};

export const endpoint = import.meta.env.VITE_SERVER_URL;

export const loging = (method: "GET" | "POST" | "DELETE" | "PATCH", url: string) => {
  console.log(`[MSW Server] ${method} ${url}`);
};
