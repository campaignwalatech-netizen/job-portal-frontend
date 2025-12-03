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

// Complete Employer Registration
export const completeEmployerRegister = async (data, token) => {
  return await axios.post(
    `${API}/employer`,
    {
      fullName: data.fullName,
      email: data.email,
      companyName: data.companyName,
      employeeNumber: data.employeeNumber,
      isConsultancy: data.isConsultancy ? "true" : "false",
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};
