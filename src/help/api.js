import axios from "axios";

const server = import.meta.env.VITE_BACKEND_SERVER;

const api = axios.create({ baseURL: server, headers: { Accept: "application/json" } });

api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status !== 401 ||
            !originalRequest ||
            originalRequest._retry ||
            originalRequest.url?.includes("/auth/refresh-token")
        ) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {
            const refreshToken = localStorage.getItem("refreshToken");
            if (!refreshToken) throw new Error("Refresh token not found");

            const refreshResponse = await axios.post(`${server}/auth/refresh-token`, { refreshToken });
            const tokenData = refreshResponse.data;
            if (!tokenData.accessToken) throw new Error("Access token not found in refresh response");

            localStorage.setItem("accessToken", tokenData.accessToken);

            if (tokenData.refreshToken) localStorage.setItem("refreshToken", tokenData.refreshToken);
            if (tokenData.tokenType) localStorage.setItem("tokenType", tokenData.tokenType);
            if (tokenData.expiresIn) localStorage.setItem("expiresIn", tokenData.expiresIn);


            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers.Authorization = `Bearer ${tokenData.accessToken}`;

            return api(originalRequest);

        } catch (refreshError) {
            console.error("Refresh token failed:", refreshError.response?.data || refreshError.message);

            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("tokenType");
            localStorage.removeItem("expiresIn");
            localStorage.removeItem("user");

            window.location.href = "/login";

            return Promise.reject(refreshError);
        }
    }
);

export default api;