import React from "react";

export default function Step3InterviewDetails({ setStep }) {
  return (
    <div className="pj-card">
      <h2 className="pj-title">Step 3: Interview Details</h2>
      <p className="pj-subtitle">This is dummy content for step 3.</p>

      <div className="pj-footer">
        <button className="btn" onClick={() => setStep(2)}>
          Back
        </button>
        <button className="btn-primary" onClick={() => setStep(4)}>
          Next
        </button>
      </div>
    </div>
  );
}
