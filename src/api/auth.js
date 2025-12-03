import axios from "axios";

const API = "https://seedmarket.shop/api/v1";

// Send OTP
export const sendOtp = async (phone, role = "employer") => {
  return await axios.post(`${API}/auth/register`, {
    phone,
    role,
  });
};

// Verify OTP
export const verifyOtpAPI = async (phone, role = "employer", otp) => {
  return await axios.post(`${API}/auth/login`, {
    phone,
    role,
    otp,
  });
};

// Complete Registration (if profile is incomplete)
export const completeEmployerRegister = async (data, token) => {
  return await axios.post(`${API}/employer`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
