import React from "react";

export default function Step4Preview({ setStep }) {
  return (
    <div className="pj-card">
      <h2 className="pj-title">Step 4: Preview</h2>
      <p className="pj-subtitle">This is dummy content for step 4.</p>

      <div className="pj-footer">
        <button className="btn" onClick={() => setStep(3)}>
          Back
        </button>
        <button className="btn-primary" onClick={() => setStep(5)}>
          Next
        </button>
      </div>
    </div>
  );
}
