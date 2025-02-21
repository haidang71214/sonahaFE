import axios from "axios";

import { LOGIN_USER } from "../constant/constant";

export const BASE_URL = "http://localhost:8080";

export const axiosInstance = axios.create({
  baseURL: `${BASE_URL}`,
});

// Add a request interceptor to include the Bearer token in all requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(LOGIN_USER);

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Function to extend the token when expired
const extendToken = async () => {
  try {
    const { data } = await axiosInstance.post(
      `/auth/extend-token`,
      {},
      { withCredentials: true },
    );

    return data?.newAccessToken; // Return the new access token
  } catch (error) {
    console.error("Error extending token:", error);
    throw error;
  }
};

// Add a response interceptor to handle token renewal on 401 responses
axiosInstance.interceptors.response.use(
  (response) => response, // Pass successful responses through
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Avoid infinite retries
      try {
        const newAccessToken = await extendToken();

        if (newAccessToken) {
          localStorage.setItem(LOGIN_USER, newAccessToken); // Save new token
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return axiosInstance(originalRequest); // Retry the original request
        }
      } catch (err) {
        console.error("Token renewal failed:", err);
      }
    }

    return Promise.reject(error); // Reject other errors
  },
);

// Fetch generic data from the API
export const fetchFromAPI = async (url) => {
  try {
    const { data } = await axiosInstance.get(url);

    return data;
  } catch (error) {
    console.error("Error fetching from API:", error);
    throw error;
  }
};

// Fetch all banners
export const getAllBanner = async () => {
  try {
    const { data } = await axiosInstance.get("/Banner/getAllBanner");

    return data;
  } catch (error) {
    console.error("Error fetching banners:", error);
    throw error;
  }
};

// Login with email and password
export const loginAsyncKey = async (payload) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", payload, {
      withCredentials: true,
    });

    return data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
export const sendMailReset = async (payload) => {
  try {
    const { data } = await axiosInstance.post(`/auth/send_mail_reset_token`, {
      email: payload,
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};
export const resetPass = async (payload) => {
  try {
    const { data } = await axiosInstance.post(`/auth/reset_pass`, payload);

    return data;
  } catch (error) {
    throw error;
  }
};

// Login using Facebook
export const loginFacebook = async (payload) => {
  try {
    const { data } = await axiosInstance.post("/auth/loginFacebook", payload);

    return data;
  } catch (error) {
    console.error("Error logging in with Facebook:", error);
    throw error;
  }
};

// Register a new user
export const register = async (payload) => {
  try {
    const { data } = await axiosInstance.post("/auth/register", payload);

    return data;
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
};

// Fetch paginated properties
export const paging = async (page, limit) => {
  try {
    const { data } = await axiosInstance.get(`/proprities/getAllProprities`, {
      params: { page, limit },
    });

    return data;
  } catch (error) {
    console.error("Error fetching paginated data:", error);
    throw error;
  }
};

// Fetch property details by ID
export const fetchDetailProperties = async (id) => {
  try {
    const { data } = await axiosInstance.get(`/proprities/${id}`);

    return data;
  } catch (error) {
    console.error("Error fetching property details:", error);
    throw error;
  }
};

// Fetch authenticated user's details
export const fetchDetailMySelf = async () => {
  try {
    const { data } = await axiosInstance.get("/auth/detail", {
      withCredentials: true,
    });

    return data; // Dữ liệu trả về
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};
export const fetchSaveProperties = async () => {
  try {
    const { data } = await axiosInstance.get(`/save/getAllUserSave`, {
      withCredentials: true,
    });

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const fetchRegister = async (formData) => {
  try {
    const { data } = await axiosInstance.post(`/auth/register`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    console.error("Đăng ký thất bại:", error.response?.data || error.message);
    throw error;
  }
};
export const fetchPostComment = async (id, commentData) => {
  try {
    const { data } = await axiosInstance.post(
      `/comment/cmProperties/${id}`,
      commentData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return data;
  } catch (error) {
    console.error(
      "Lỗi khi thêm bình luận:",
      error.response?.data || error.message,
    );
    throw error;
  }
};
export const fetchGetComment = async (id) => {
  try {
    const { data } = await axiosInstance.get(`/comment/${id}`);

    return data;
  } catch (error) {
    throw error;
  }
};
export const fetchGetAllProperties = async () => {
  try {
    const { data } = await axiosInstance.get(`/proprities`);

    return data;
  } catch (error) {
    throw error;
  }
};
export const fetchUpdateUserDetailSelf = async (payload) => {
  try {
    const response = await axiosInstance.patch(
      `/user/updateUserByUser`,
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      },
    );

    return response; // Đảm bảo trả về đúng data từ API
  } catch (error) {
    console.error("Error in API:", error.response || error.message);
    throw error;
  }
};
export const fetchUserService = async () => {
  try {
    const data = await axiosInstance.get(`/user/get-all-users`, {
      withCredentials: true,
    });

    return data;
  } catch (error) {
    console.log("hehe", error);
    throw error;
  }
};
export const fetchNotification = async () => {
  try {
    const data = await axiosInstance.get(`/notification`);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const readNotification = async (id) => {
  try {
    const response = await axiosInstance.patch(`/notification/${id}`);

    return response;
  } catch (error) {
    throw error;
  }
};
// banner
export const CreateBanner = async (formData) => {
  try {
    const response = await axiosInstance.post("/Banner/newBanner", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Gửi dữ liệu dưới dạng multipart
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteBanner = async (id) => {
  try {
    const response = await axiosInstance.delete(`/Banner/deleteBanner/${id}`);

    return response;
  } catch (error) {
    throw error;
  }
};
export const fetchCreateProperties = async (formData) => {
  try {
    console.log(formData);
    const response = await axiosInstance.post(
      `/proprities/createProprityDto`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response;
  } catch (error) {
    throw error;
  }
};
export const fetchDeleteProperties = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/proprities/deleteProperties/${id}`,
    );

    return response;
  } catch (error) {
    throw error;
  }
};
export const fetchPhanTrangTheoType = async (typeName, page, limit) => {
  try {
    const response = await axiosInstance.get(
      `/filtersearch/FilterPhanTrangTheoType`,
      {
        params: {
          type: typeName,
          page: page,
          limit: limit,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchProvince = async () => {
  try {
    const response = await axiosInstance.get(`/province`);
    return response;
  } catch (error) {
    throw error;
  }
};
export const fetchDistricts = async (provinceId) => {
  return await axiosInstance.get(`/province/${provinceId}/districts`);
};
