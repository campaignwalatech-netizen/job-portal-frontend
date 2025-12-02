import React from "react";

export default function Step5SelectPlan({ setStep }) {
  return (
    <div className="pj-card">
      <h2 className="pj-title">Step 5: Select Plan</h2>
      <p className="pj-subtitle">This is dummy content for step 5.</p>

      <div className="pj-footer">
        <button className="btn" onClick={() => setStep(4)}>
          Back
        </button>
        <button className="btn-primary">
          Finish
        </button>
      </div>
    </div>
  );
}
