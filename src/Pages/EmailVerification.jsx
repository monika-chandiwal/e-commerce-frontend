import React, { useEffect } from "react";

export default function EmailVerification({ prop, onVerified }) {
  useEffect(() => {
    console.log("Verifying email for:", prop);

    // Simulate async verification
    setTimeout(() => {
      onVerified(true); // Notify parent
    }, 1000);
  }, [prop, onVerified]);

  return null; // No UI
}
