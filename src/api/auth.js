import axios from "axios";
const API = "https://naukrichaahiye.online/api/v1";
const normalizePhone = (phone) => {
  const digitsOnly = String(phone).replace(/\D/g, "");
  if (/^\d{10}$/.test(digitsOnly)) {
    return `+91${digitsOnly}`;
  }
  return phone;
};
// Send OTP
export const sendOtp = async (phone, role = "employer") => {
  return await axios.post(`${API}/auth/register`, {
    phone: normalizePhone(phone),
    role,
  });
};
// Verify OTP
export const verifyOtpAPI = async (phone, role = "employer", otp) => {
  const payload = {
    phone: normalizePhone(phone),
    role,
    otp,
  };
  console.log("Sending to /auth/login:", payload);
  
  return await axios.post(`${API}/auth/login`, payload);
};
// Get Employer Profile of logged-in user
export const getEmployerProfile = async (token) => {
  return await axios.get(`${API}/employer`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};
export const completeEmployerRegister = async (data, token) => {
  return await axios.post(
    `${API}/employer`,
    {
      fullName: data.fullName,
      email: data.email,
      companyName: data.companyName,
      employeeNumber: data.employeeNumber,
      isConsultancy: Boolean(data.isConsultancy),
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};
export const updateEmployer = async (data, token) => {
  return await axios.patch(
    `${API}/employer`,
    {
      fullName: data.fullName,
      email: data.email,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
};
// Update Employer Company Details
export const updateEmployerCompany = async (data, token) => {
  return await axios.patch(
    `${API}/employer/company`,
    {
      companyName: data.companyName,
      isConsultancy: data.isConsultancy ?? false,
      numOfEmployees: data.numOfEmployees,
      industry: data.industry,
      location: data.location,
      about: data.about,
      website: data.website,
      founded: data.founded,
      logoUrl: data.logoUrl,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
};
