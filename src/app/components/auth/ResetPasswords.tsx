import React, { useState } from "react";

interface ForgotPasswordProps {
  onResetSuccess: () => void;
  onSendOTP: (phoneNumber: string) => void;
  onCancel: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  onResetSuccess,
  onSendOTP,
  onCancel,
}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendOTP = () => {
    setLoading(true);
    onSendOTP(phoneNumber);
    // Assume OTP is sent successfully for demo purposes
    setOtpSent(true);
    setLoading(false);
  };

  const handleResetPassword = async () => {
    setLoading(true);
    // Implement password reset logic here
    // On successful reset: onResetSuccess();
    // On error: setError(errorMessage);
    setLoading(false);
  };

  return (
    <div>
      <h2>Reset Password</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleResetPassword}>
        <label>
          Phone Number:
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </label>
        {otpSent && (
          <>
            <label>
              OTP:
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </label>
            <label>
              New Password:
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </label>
          </>
        )}
        {!otpSent ? (
          <button type="button" onClick={handleSendOTP} disabled={loading}>
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        ) : (
          <button type="submit" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        )}
      </form>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default ForgotPassword;
