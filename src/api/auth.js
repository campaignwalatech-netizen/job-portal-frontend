import axios from "axios";

const API = "http://72.60.223.124:4000/api/v1";

// 1) Send OTP + check if user exists
export const sendOtp = (phone, role) => {
  return axios.post(`${API}/auth/register`, { phone, role });
};

// 2) Verify OTP and get token + isNewUser
export const verifyOtpAPI = (phone, role, otp) => {
  return axios.post(`${API}/auth/login`, { phone, role, otp });
};

// 3) Complete employer registration (backend expects GET with body)
export const completeEmployerRegister = (data, token) => {
  return axios.post(`${API}/employer`, {
    headers: { Authorization: `Bearer ${token}` },
    data,
  });
};
