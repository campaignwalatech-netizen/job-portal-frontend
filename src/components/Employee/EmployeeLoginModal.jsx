import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { sendOtp, verifyOtpAPI } from "../../api/auth";
import EmployeeOtpModal from "./EmployeeOtpModal";

export default function EmployeeLoginModal({ open = false, onClose = () => {} }) {
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState("phone"); 
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);

  const handleSendOtp = async () => {
    if (phone.trim().length !== 10) {
      alert("Enter a valid 10-digit mobile number");
      return;
    }
    setLoading(true);
    try {
      await sendOtp(phone, "employee");
      setStep("otp");
      setTimer(30);
    } catch (error) {
      alert(error.response?.data?.message || "Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (timer > 0) return;
    
    setLoading(true);
    try {
      await sendOtp(phone, "employee");
      setTimer(30);
      alert("OTP resent successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Error resending OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (otpCode) => {
    try {
      const res = await verifyOtpAPI(phone, "employee", otpCode);
      const token = res.data.token;
      const user = res.data.user;
      const isNew = !user.profileCompleted;

      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("phone", user.phone);

      onClose();
      
      if (isNew) {
        window.location.href = "/employee/register";
      } else {
        window.location.href = "/employee/dashboard";
      }
    } catch (error) {
      alert(error.response?.data?.message || "Invalid or expired OTP");
      throw error;
    }
  };

  const handleEditPhone = () => {
    setStep("phone");
  };

  return (
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1400,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <Box
          sx={{
            width: { xs: "92%", sm: 480 },
            bgcolor: "#fff",
            borderRadius: 3,
            boxShadow: "0 20px 60px rgba(3,18,64,0.16)",
            p: 4,
            textAlign: "center",
          }}
        >
          {step === "phone" && (
            <>
              <Typography sx={{ fontSize: 22, fontWeight: 700, mb: 1 }}>
                Enter Mobile Number
              </Typography>
              <Typography sx={{ color: "#6b7280", mb: 2 }}>
                We'll send an OTP to verify your number
              </Typography>

              <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
                <TextField value="+91" sx={{ width: "80px" }} disabled />
                <TextField
                  placeholder="Mobile Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  sx={{ flex: 1 }}
                  inputProps={{ maxLength: 10 }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSendOtp();
                    }
                  }}
                />
              </Box>

              <Button
                variant="contained"
                fullWidth
                onClick={handleSendOtp}
                disabled={loading}
                sx={{ 
                  textTransform: "none", 
                  py: 1.2, 
                  borderRadius: 1.5,
                  "&:disabled": {
                    backgroundColor: "#cccccc",
                  },
                }}
              >
                {loading ? "Sending..." : "Get OTP"}
              </Button>
            </>
          )}

          {step === "otp" && (
            <EmployeeOtpModal
              phone={phone}
              onClose={handleEditPhone}
              onVerified={handleVerifyOtp}
              onResend={handleResendOtp}
              timer={timer}
            />
          )}
        </Box>
      </Box>
    </Modal>
  );
}