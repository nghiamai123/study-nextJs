import http from "@/lib/http";

const ApiAuthRequest = {
  login: (body: { email: string; password: string }) =>
    http.post("/auth/login", body),

  register: (body: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => http.post("/auth/register", body),

  StoreSession: (body: { sessionToken: string }) =>
    http.post("/api/auth", body, { baseUrl: "" }),

  logout: (sessionToken: string ) =>
    http.post(
      "/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    ),
};

export default ApiAuthRequest;
